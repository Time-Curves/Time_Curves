<template>
<div class="instruments" @mousedown="onMouseDown">
  <Instrument v-for="instrument in allInstruments" :key="instrument.id" 
  :id="instrument.id" title="instrument.title" @click-child="onChildClick"
  v-bind:style="{backgroundImage: 'url('+require('@/assets/'+instrument.icon)+')'}"/>
</div>
</template>

<script>
import Instrument from './Instrument.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Instruments',
  components: {
    Instrument
  },
  data() {
    return { x1: 10, y1: 10, dx: 0, dy: 0 };
  },
  computed: {
    ...mapGetters(['allInstruments']),
    ...mapGetters(['cc']),
  },
  methods: {
    onMouseDown(e) {
      this.dx = e.clientX - this.x1;
      this.dy = e.clientY - this.y1;
      document.onmousemove = this.onMouseMove;
      document.onmouseup = this.onMouseUp;
    },
    onMouseUp() {
      document.onmousemove = null;
      document.onmouseup = null;
      this.$el.style.cursor = 'grab';
    },
    onMouseMove(e) {
      this.x1 = e.clientX - this.dx;
      this.y1 = e.clientY - this.dy;
      this.$el.style.left = this.x1 + 'px';
      this.$el.style.top = this.y1 + 'px';
      this.$el.style.cursor = 'grabbing';
    },
    onChildClick(id) {
      this.cc.setActive(id);
      //const cc = this.cc();
      //instruments[id].func(cc, x, y);
    }
  }
};
</script>

<style scoped>
.instruments {
  height: auto;
  width: 60px;
  position: absolute;
  left: 10px;
  top: 10px;
  border: 1px solid gray;
  padding: 25px 1px 1px 1px;
  background: rgb(255, 228, 228);
  cursor: grab;
  color: white;
}
</style>
