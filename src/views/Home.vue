<template>
  <div class="home">
    <div>
      <router-link :to="{ name: 'app-favorite' }">
        App Main
      </router-link>&nbsp;
      <router-link :to="{ name: 'login' }">
        Login
      </router-link>&nbsp;
        <router-link :to="{ name: 'signup' }">
        SignUp
      </router-link>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
