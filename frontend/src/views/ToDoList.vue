<template>
    <div class="todolist_container">
        <div class="about">
            <h1>This is an about page</h1>
        </div>
        <div class="main">
            <ul>
                <li>

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