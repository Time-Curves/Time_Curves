<template>
  <div class="instrument" @mousedown="onClick"></div>
</template>

<script>
export default {
  name: 'Instrument',
  props: ['id', 'title'],
  methods: {
    onClick() {
      this.$emit('click-child', this.id);
    }
  }
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
