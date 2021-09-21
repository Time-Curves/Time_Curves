<template>
  <div class="home">
    <router-link to="/about">About</router-link>
    <br>
    <router-link to="/map">Map</router-link>
    <p>hello world</p>
    <p>Counter: {{ getCounter }}</p>
    <p><button @click="increment">+</button></p>
    <HelloWorld msg="This is the Home Page"/>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  methods: {
    ...mapActions(['increment']),
  },
  computed: mapGetters(['getCounter']),
};
</script>
