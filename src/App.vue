<template>
  <div id="nav" class="container">
    <router-view/>
  </div>
</template>

<script>
import someMixin from './mixins/someMixin.js';
export default {
  name: 'App',
  mixins: [someMixin], //global mixins
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
html, body {
  margin: 0px;
  height: 100%;
}

#nav {
  height: 100%;
  display: block;
}
</style>
