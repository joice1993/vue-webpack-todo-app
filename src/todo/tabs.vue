<template>
    <div class="helper">
        <span class="left">{{unFinishedTodoLength}} items left</span>
        <span class="tabs">
            <span
                v-for="state in states"
                :key="state"
                :class="[state, filter === state ? 'actived' : '']"
                @click="toggleFilter(state)"
            >
                {{state}}
            </span>
        </span>
        <span class="clear" @click="clearAllCompleted">Clear completed</span>
    </div>
</template>

<script>
    export default {
        name: "tabs",
        //props接收父组件传过来的值
        props: {
            filter: {
                type: String,
                required: true,
            },
            todos: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                states: ['all','active','completed']
            }
        },
        computed: {
            unFinishedTodoLength() {
                //filter过滤筛选数组中没有完成的
                return this.todos.filter(todo => !todo.completed).length
            }
        },
        methods: {
            clearAllCompleted() {
                this.$emit('clearAllCompleted')
            },
            toggleFilter(state) {
                this.$emit('toggle',state);//把选择toggle的类型state传给父组件
            },
        }
    }
</script>

<style lang="stylus" scoped>
    .helper {
        font-weight 100
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #ffffff
        font-size 14px
        font-smoothing: antialiased;
    }
    .left, .clear, .tabs {
        padding 0 10px
        box-sizing border-box
    }
    .left, .clear {
        width 150px
    }
    .left {
        text-align left
    }
    .clear {
        text-align: right
        cursor pointer
    }
    .tabs {
        width 200px
        display flex
        justify-content space-around
        * {
            display inline-block
            padding 0 10px
            cursor pointer
            border 1px solid rgba(175, 47, 47, 0)
            &.actived {
                border-color rgba(175, 47, 47, 0.4)
                border-radius 5px
            }
        }
    }
</style>