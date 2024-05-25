<template>
    <div class="todolist_container">
        <div class="about">
            <h1>New to do</h1>
        </div>
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
        <div class="main">
            <ul class="pl-1">
                <li class="flex items-center">
                    <input type="checkbox" class="inline-flex form-checkbox rounded text-blue-1000 text-2xl" />
                    <input type="text" class="inline-flex flex-1 ml-4 form-input p-0">
                    <div class="inline-block w-10">
                        <button class="inline-block iconfont icon-edit text-xl"></button>
                        <span class="inline-block iconfont icon-delete text-2xl"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script lang="tsx" setup>
import { reactive } from 'vue'

const state: any = reactive({
    toDoList: [{

    }]
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