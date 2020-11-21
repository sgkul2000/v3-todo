<template>
  <div id="todoMain">
    <h3>V3-Todo</h3>
    <div id="topbar">
      <input
        @keydown.enter="addTodo"
        type="text"
        placeholder="Add new item"
        v-model="inputText"
      >
      <div
        id="addBtn"
        @click="addTodo"
      ><img
          src="../assets/plus.svg"
          alt="Add icon"
          style="width: 20px;"
        ></div>
    </div>
    <div id="list">
        <transition-group
          name="list"
          tag="ul"
        >
          <li
            v-for="(todo, index) in todos"
            :key="index"
            class="item"
            :class="{completed: todo.done}"
          >
            <div
              class="itemLeft"
              @click="toggleDone(index)"
            >
              <div class="itemDone">
                <img
                  v-if="todo.done === true"
                  src="../assets/circle.svg"
                  alt="Completed icon"
                  style="width: 15px;"
                >
                <img
                  v-else
                  src="../assets/circle-outline.svg"
                  alt="Pending icon"
                  style="width: 15px;"
                >
              </div>
              <div class="itemContent">
                {{todo.title}}
              </div>
            </div>
            <div
              class="itemRight"
              @click="deleteTodo(index)"
            >
              <div class="itemDelete"><img
                  src="../assets/delete.svg"
                  alt="delete icon"
                  style="width:15px;"
                ></div>
            </div>
          </li>
        </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import Todo from '../models/todo'
export default defineComponent({
  name: 'Main',
  setup () {
    const store = useStore()
    const inputText = ref('')

    function addTodo () {
      store.commit('appendTodo', {
        title: inputText.value,
        done: false
      } as Todo)
      inputText.value = ''
    }

    function toggleDone (index: number) {
      store.commit('toggleDone', index)
    }

    function deleteTodo (index: number) {
      store.commit('deleteTodo', index)
    }
    return {
      todos: computed(() => store.getters.getTodos),
      inputText,
      addTodo,
      toggleDone,
      deleteTodo
    }
  }
})
</script>

<style scoped>
#topbar{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

}
#topbar > input{
  border: none;
  border-radius: 6px;
  background-color: rgba(231, 231, 231, 0.883);
  padding: 5px 15px;
  outline: none;
  width: 200px;
}
#topbar > input::placeholder{
  text-align: center;
}

#addBtn{
  padding: 1rem;
}

ul{
  padding: 0 3rem;
  max-width: 600px;
  margin: 0 auto;
}

ul > li{
  cursor: pointer;
  margin: 1rem 0;
}

.itemDone, .itemDelete{
  display: inline-block;
  padding: 10px;
}
.item{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.itemLeft{
  display: flex;
  align-items: center;
  justify-content: center;
}
.completed{
  text-decoration: line-through;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
