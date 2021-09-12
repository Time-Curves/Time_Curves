<template>
  <canvas id="map">Hello</canvas>
</template>

<script>
export default {
  name: Map,
  mounted() {
    const canvas = document.getElementById('map');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const map = new Image();
    map.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Map_of_Ukraine_political_simple_blank.png/1280px-Map_of_Ukraine_political_simple_blank.png';
    map.onload = () => ctx.drawImage(map, 0, 0);
    console.log(ctx);
  }
};
</script>

<style scoped>
</style>
