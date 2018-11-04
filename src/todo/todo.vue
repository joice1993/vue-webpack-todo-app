<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下去要做什么？"
            @keyup.enter="addTodo"
        >
    </section>
</template>

<script>
    export default {
        name: "todo",
        methods: {
            addTodo() {}
        }
    }
</script>

<style scoped>

</style>