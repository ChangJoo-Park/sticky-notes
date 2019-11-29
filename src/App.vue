<template>
  <div id="app" class="w-full h-full">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

* {
  box-sizing: border-box;
}
</style>
