<template>
  <div class="about">
    <router-link to="/">Home</router-link>
    <h1>This is an about page</h1>
  </div>
</template>

<script>


export default {
  name: 'About',
  methods: {
    asyncData({ store }) {
      store.commit('INCREMENT');
    },
  }
};
</script>
