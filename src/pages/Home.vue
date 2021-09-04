<template>
  <div class="home">
    <router-link to="/about">About</router-link>
    <p>hello world</p>
    <p>Counter: {{ $store.state.counter }}</p>
    <p><button @click="$store.commit('INCREMENT')">+</button></p>
    <HelloWorld msg="This i s the Home Page"/>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  methods: {
    asyncData({ store }) {
      store.commit('INCREMENT');
    },
  }
};
</script>
