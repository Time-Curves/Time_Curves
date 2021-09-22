<template>
<div class="container">
  <MapComponent ref="onCursorChange"/>
  <Instruments @cursor-change="onCursorChange"/>
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
  methods: {
    onCursorChange(cursor) {
      this.$refs.onCursorChange.onCursorChange(cursor);
    }
  }
};
</script>

<style>
html, body {
  margin: 0px;
}
</style>
