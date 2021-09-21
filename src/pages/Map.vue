<template>
<div>
  <MapComponent/>
  <Instruments/>
</div>
</template>

<script>
import MapComponent from '../components/MapComponent.vue';
import Instruments from '../components/Instruments.vue';

export default {
  name: 'Map',
  components: {
    MapComponent,
    Instruments,
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
