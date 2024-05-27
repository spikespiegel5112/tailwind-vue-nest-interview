<template>
    <div class="todolist_container">
        <div class="about mb-5" @click="handleCreateToDo">
            <span class="inline-block text-2xl">New to do</span>
        </div>
        <div class="main">
            <ul class="pl-1">
                <li v-for="(item, index) in state.toDoList" :key="index"
                    class="flex mt-2 mb-2 transition-all items-center border-b-2" :class="activeStyle(item)">
                    <input type="checkbox" class="inline-flex form-checkbox rounded text-blue-1000 text-2xl" />
                    <input v-if="item.isEditing" type="textarea"
                        class="inline-flex flex-1 h-10 ml-4 p-0 bg-black leading-7  bg-transparent focus:border-transparent focus:outline-none"
                        v-model="item.content">
                    <span v-else class="inline-flex flex-1 h-10 ml-4 p-0 h-8 leading-10">
                        {{ item.content }}
                    </span>
                    <div v-if="item.isEditing" class="inline-block w-15">
                        <span class="inline-block ml-6 iconfont icon-save text-xl text-green-500"
                            @click="handleConfirmEditToDo(item)"></span>
                        <span class="inline-block ml-6 iconfont icon-delete text-2xl text-red-500"
                            @click="handleDeleteToDo"></span>
                    </div>
                    <div v-else class="inline-block w-15">
                        <span class="inline-block ml-6 iconfont icon-edit text-xl" @click="handleEditToDo(item)"></span>
                        <span class="inline-block ml-6 iconfont icon-delete text-2xl text-red-500"
                            @click="handleDeleteToDo"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script lang="tsx" setup>
import { computed, reactive } from 'vue'

interface ToDo {
    content: string,
    isEditing: boolean,
    isChecked: boolean
}

const state: any = reactive({
    toDoList: [{
        content: 'sssssssssssssss',
        isEditing: false,
        isChecked: false
    }, {
        content: 'sssssssssssssss',
        isEditing: false,
        isChecked: false
    }] as ToDo[]
})

const activeStyle = (item: ToDo) => {
    return item.isEditing ? 'border-b-gray-100' : 'border-b-gray-500/10'
}

const handleEditToDo = (item: ToDo) => {
    item.isEditing = !item.isEditing
}

const handleConfirmEditToDo = (item: ToDo) => {
    item.isEditing = false
}

const handleDeleteToDo = () => {

}

const handleCreateToDo = () => {
    state.toDoList.push({
        content: '',
        isEditing: true,
        isChecked: false
    })
}
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