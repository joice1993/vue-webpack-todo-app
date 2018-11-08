<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下去要做什么？"
            @keyup.enter="addTodo"
        >
        <item
           :todo="todo"
           v-for="todo in filteredTodos"
           :key="todo.id"
           @del="deleteTodo"
        /><!--@可以监听到子组件传过来的触发事件-->
        <tabs
           :filter="filter"
           :todos="todos"
           @toggle="toggleFilter"
           @clearAllCompleted="clearAllCompleted"
        />
    </section>
</template>

<script>
    import Item from './item.vue'
    import Tabs from './tabs.vue'
    let id = 0;
    export default {
        name: "todo",
        data() {
           return {
               todos: [],
               filter: 'all'
           }
        },
        components: {
            Item,
            Tabs,
        },
        computed: {
            //过滤todos的状态
            filteredTodos() {
                if (this.filter === 'all'){
                    return this.todos
                }
                const completed = this.filter === 'completed';//如果this.filter横等于'completed'的话，常量completed就等于true，否则false
                return this.todos.filter(todo => completed === todo.completed)
            }
        },
        methods: {
            addTodo(e) {
                // unshift方法可向数组的开头添加一个或更多元素，并返回新的长度
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false //是否完成，默认没有完成
                })
                e.target.value = ''
            },
            deleteTodo(id) {
                //splice() 方法向数组中删除项目，然后返回被删除的项目
                this.todos.splice(this.todos.findIndex(todo => todo.id === id),1)
            },
            toggleFilter(state) {
                this.filter = state
            },
            clearAllCompleted() {
                //清楚所有完成的事项：给todos过滤筛选返回一个新的todos（返回所有未完成的事项）
                this.todos = this.todos.filter(todo => !todo.completed)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .real-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }
    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 36px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
</style>