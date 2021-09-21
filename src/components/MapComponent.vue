<template>
  <canvas id="map" @mousedown="onMouseDown"/>
</template>

<script>
import CanvasController from '../frontJs/canvasController/canvasController';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'MapComponent',
  mounted() {
    const cc = new CanvasController('https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Map_of_Ukraine_political_simple_blank.png/1280px-Map_of_Ukraine_political_simple_blank.png');
    this.setCC(cc);
  },
  methods: {
    onMouseDown(e) {
      this.cc.setDot(e.clientX, e.clientY);
    },
    ...mapActions(['setCC']),
  },
  computed: mapGetters(['cc']),
};
</script>

<style scoped>
#map {
  cursor: crosshair;
}
</style>
