<template>
<div>
  <Map/>
  <Instruments/>
</div>
</template>

<script>
import Map from './components/Map.vue';
import Instruments from './components/Instruments.vue';

export default {
  name: 'App',
  components: {
    Map, Instruments,
  },
};
</script>

<style>
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html, body {
  overflow: hidden;
}
* {
  box-sizing: border-box;
}
</style>
