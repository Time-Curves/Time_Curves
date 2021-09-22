<template>
<div class="map-component-container container" @change-cursor="onCursorChange">
  <canvas id="map" @mousedown="onMouseDown" />
</div>
</template>

<script>
import CanvasController from '../frontJs/canvasController/canvasController';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'MapComponent',
  mounted() {
    const cc = new CanvasController('https://protruskavets.org.ua/protrusk/wp-content/uploads/2011/08/u1.jpg');
    this.setCC(cc);
  },
  methods: {
    onMouseDown(e) {
      this.cc.executeActive(e.clientX, e.clientY);
    },
    onCursorChange(cursor) {
      console.log(cursor);
      this.$el.style.cursor = cursor;
    },
    ...mapActions(['setCC', 'executeFunction']),
  },
  computed: mapGetters(['cc']),
};
</script>

<style scoped>
#map {
  cursor: crosshair;
  float: left;
}
</style>
