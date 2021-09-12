<template>
  <div class="instrument"></div>
</template>

<script>
export default {
  name: 'Instrument',
};
</script>

<style scoped>
.instrument {
  margin: 3px;
  height: 50px;
  width: 50px;
  cursor: pointer;
  background: rgb(247, 244, 244);
  border: 1px solid gray;
}

.instrument:hover {
  border: 1px solid white;
}
</style>
