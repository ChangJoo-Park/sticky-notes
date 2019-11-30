<template>
 <div class="flex w-screen h-screen">
    <aside class="w-48 border-r p-4 bg-gray-100" v-if="sidebarOpen">
      <ul class="pt-2">
        <router-link
          class="cursor-pointer font-bold mb-4"
          tag="li"
          :to="{ name: 'app-favorite' }"
        >
          Favorite
        </router-link>
        <router-link
          class="cursor-pointer"
          tag="li"
          v-for="board in boards" :key="board.id"
          :to="{ name: 'app-board', params: { id: board.id } }"
        >
          {{ board.name }}
        </router-link>
        <li>
          <form @submit.prevent="submit">
            <input type="text" v-model="newBoard">
          </form>
        </li>
      </ul>
    </aside>
    <div class="flex-1 overflow-hidden">
      <div class="flex px-4 py-2 w-full align-middle items-center">
        <button
          class="text-2xl font-bold"
          @click="sidebarOpen = !sidebarOpen"
        >
          =
        </button>
        <div class="flex-1 px-4 text-center text-2xl font-bold">
          TopNav
        </div>
        <div>
          Dropdown
        </div>
      </div>

      <main id="main" class="overflow-auto p-2">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { db } from '@/db'

export default {
  data () {
    return {
      sidebarOpen: true,
      boards: [],
      newBoard: ''
    }
  },
  firestore: {
    boards: db.collection('boards')
  },
  methods: {
    submit() {
      db.collection('boards').add({
        name: 'Fuengirola',
        slogan: 'Un sol de ciudad',
        // userRef: db.doc('users/' + firebase.auth().currentUser.uid)
      })
      this.newBoard = ''
    }
  }
}
</script>

<style>
#main {
  height: calc(100% - 70px);
}
</style>