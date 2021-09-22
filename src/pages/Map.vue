<template>
<div class="map-page-container">
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
.map-page-container {
  width: 100%;
  height: 100%;
}

</style>
