<template>
    <div class="todolist_container">
        <div class="about mb-5" @click="handleCreateToDo">
            <span class="inline-block text-2xl">New to do</span>
        </div>
        <div class="main">
            <ul class="pl-1">
                <li v-for="(item, index) in state.toDoList" :key="index"
                    class="flex mt-2 mb-2 transition-all items-center border-b-2" :class="activeStyle(item)">
                    <input type="checkbox" class="inline-flex form-checkbox rounded text-blue-1000 text-2xl"
                        v-model="item.checked" @change="handleCheckToDo(item)" />
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
import { computed, onMounted, reactive } from 'vue'

import { getToDoListRequest, createToDoListRequest, updateToDoListRequest, toDoListDeleteRequest, checkToDoListRequest, todolistUpdateToRedisRequest, toDoListDeleteFromRedisRequest } from '@/api/toDoListApi'

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

const getToDoList = () => {
    getToDoListRequest().then((response: ToDo[]) => {
        console.log('=====getToDoList=====')
        console.log(response)
        const result: ToDo[] = []
        state.toDoList = response
    }).catch((error: any) => {
        console.log(error)
    })
}

const activeStyle = (item: ToDo) => {
    return item.isEditing ? 'border-b-gray-100' : 'border-b-gray-500/10'
}

const handleEditToDo = (item: ToDo) => {
    item.isEditing = !item.isEditing
    state.formData.content = item.content
}

const handleConfirmUpdateToDo = (item: ToDo) => {
    if (item.id) {
        updateToDoListRequest({
            id: item.id,
            content: item.content
        }).then((response: any) => {
            item.id = response.id
            item.content = response.content
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
            item.isEditing = false
        }).catch((error: any) => {
            console.log(error)
        })
    }
}


const handleConfirmUpdateToDoToRedis = (item: ToDo) => {
    if (item.contentName) {
        todolistUpdateToRedisRequest({
            id: item.id,
            content: item.content,
            contentName: item.contentName
        }).then((response: any) => {
            item.id = response.id
            item.content = response.content
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
        getToDoList()
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

const handleCheckToDo = (item: ToDo) => {
    console.log(item)
    updateToDoListRequest({
        id: item.id,
        checked: item.checked
    }).then((response: any) => {
        item.id = response.id
        item.checked = response.checked
        item.isEditing = false
    }).catch((error: any) => {
        console.log(error)
    })
}

onMounted(() => {
    getToDoList()
})

</script>

<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>