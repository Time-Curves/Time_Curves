import createApp from './app';

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

console.log('__INITIAL_STATE__:', window.__INITIAL_STATE__);

// this assumes App.vue template root element has `id="app"`
router.isReady().then(() => {
  app.mount('#app', true);
});
