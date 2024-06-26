<template>
    <div class="todolist_container">
        <div class="about mb-5" @click="handleCreateToDo">
            <span class="inline-block text-2xl">New to do</span>
        </div>
        <div class="about mb-5" @click="handleSynchronizeToDatabase">
            <span class="inline-block text-2xl">Synchronize</span>
        </div>

        <div class="main">
            <ul class="pl-1">
                <li v-for="(item, index) in state.toDoList" :key="index"
                    class="flex mt-2 mb-2 transition-all items-center border-b-2" :class="activeStyle(item)">
                    <input type="checkbox" class="inline-flex form-checkbox rounded text-blue-1000 text-2xl"
                        :disabled="!item.contentName" v-model="item.checked" @change="handleCheckToDo(item)" />
                    <input v-if="item.isEditing" type="textarea"
                        class="inline-flex flex-1 h-10 ml-4 p-0 bg-black leading-7  bg-transparent focus:border-transparent focus:outline-none"
                        v-model="item.content">
                    <span v-else class="inline-flex flex-1 h-10 ml-4 p-0 h-8 leading-10">
                        {{ item.content }}
                    </span>
                    <div v-if="item.isEditing" class="inline-block w-15">
                        <span class="inline-block ml-6 iconfont icon-save text-xl text-green-500"
                            @click="handleConfirmUpdateToDoToRedis(item)"></span>
                        <span class="inline-block ml-6 iconfont icon-delete text-2xl text-red-500"
                            @click="handleDeleteToDo(item)"></span>
                    </div>
                    <div v-else class="inline-block w-15">
                        <span class="inline-block ml-6 iconfont icon-edit text-xl" @click="handleEditToDo(item)"></span>
                        <span class="inline-block ml-6 iconfont icon-delete text-2xl text-red-500"
                            @click="handleDeleteToDo(item)"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script lang="tsx" setup>
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue'

import { getToDoListRequest, createToDoListRequest, updateToDoListRequest, synchronizeDataRequest, toDoListGetFromRedisRequest, todolistUpdateToRedisRequest, toDoListDeleteFromRedisRequest, synchronizeDataToRedisRequest } from '@/api/toDoListApi'
import { debug } from 'console';

interface ToDo {
    id: number,
    contentName: string,
    content: string,
    isEditing: boolean,
    checked: boolean
}

const state: any = reactive({
    toDoList: [] as ToDo[],
    formData: {
        content: ''
    }
})

const getToDoListFromRedis = () => {
    toDoListGetFromRedisRequest().then((response: ToDo[]) => {
        console.log('=====getToDoList=====')
        console.log(response)
        const result: ToDo[] = []
        state.toDoList = response
    }).catch((error: any) => {
        console.log(error)
    })
}

const getToDoListPromise = () => {
    return new Promise((resolve, reject) => {
        getToDoListRequest().then((response: ToDo[]) => {
            console.log('=====getToDoList=====')
            console.log(response)
            resolve(response)
        }).catch((error: any) => {
            console.log(error)
            reject(error)
        })
    })

}

const handleGetToDoList = async () => {
    state.toDoList = await getToDoListPromise()
    return state.toDoList
}

const activeStyle = (item: ToDo) => {
    return item.isEditing ? 'border-b-gray-100' : 'border-b-gray-500/10'
}

const handleEditToDo = (item: ToDo) => {
    item.isEditing = !item.isEditing
    state.formData.content = item.content
}

const handleCheckToDo = (item: ToDo) => {
    console.log(item)
    todolistUpdateToRedisRequest({
        contentName: item.contentName,
        checked: item.checked,
        content: item.content,
    }).then((response: any) => {
        item.contentName = response.contentName
        item.checked = response.checked
    }).catch((error: any) => {
        console.log(error)
    })
}

const handleConfirmUpdateToDoToRedis = (item: ToDo) => {
    if (item.contentName) {
        todolistUpdateToRedisRequest({
            checked: item.checked,
            content: item.content,
            contentName: item.contentName
        }).then((response: any) => {
            item.id = response.id
            item.content = response.content
            item.contentName = response.contentName
            item.isEditing = false
        }).catch((error: any) => {
            console.log(error)
        })
    } else {
        createToDoListRequest({
            content: item.content
        }).then((response: any) => {
            item.id = response.id
            item.content = response.content
            item.contentName = response.contentName
            item.isEditing = false
        }).catch((error: any) => {
            console.log(error)
        })
    }
}

const handleDeleteToDo = (item: ToDo) => {
    toDoListDeleteFromRedisRequest({
        contentName: item.contentName
    }).then(() => [
        getToDoListFromRedis()
    ]).catch((error: any) => {
    })

}

const handleCreateToDo = () => {
    state.formData.content = ''
    state.toDoList.push({
        content: '',
        isEditing: true,
        checked: false
    })

}

const handleSynchronizeToDatabase = () => {
    synchronizeDataRequest().then((response: any) => {
        console.log(response)
    }).catch((error: any) => {
        console.log(error)
    })
}

const handleSynchronizeToRedis = async () => {
    await handleGetToDoList()
    synchronizeDataToRedisRequest(state.toDoList).then((response: any) => {
        console.log(response)
    }).catch((error: any) => {
        console.log(error)
    })
}

onMounted(async () => {
    handleSynchronizeToRedis()
})

onBeforeUnmount(() => {

})

</script>

<style>
@media (min-width: 1024px) {
    .todolist_container {
        width: 100%;
    }

    .todolist_container {
        margin: 0 auto;
        width: 30rem;
    }
}
</style>