import createApp from './app';
import { getComponentsOfComponent } from './utils/getComponentsOfComponent.js';

export default (context) => new Promise((resolve, reject) => {
  const { router, app, store } = createApp();

  // set server-side router's location
  router.replace(context.url).then(() => {
    const routerMatched = router.currentRoute.value.matched;

    // no matched routes, reject with 404
    if (!routerMatched.length) {
      reject(new Error('404'));
    }

    const matchedComponents = routerMatched
      .map((matched) => getComponentsOfComponent(matched))
      .flat();

    // call `asyncData()` on all matched route components
    Promise.all(matchedComponents.map((component) => {
      if (component.methods) {
        if (component.methods.asyncData) {
          return component.methods.asyncData({
            store,
            route: router.currentRoute
          });
        }
      }
    })).then(() => {
      console.log('initial global app state:', store.state);

      resolve({ app, router, store });
    }).catch((err) => reject(`failed to prefetch data: ${err}`));

  }).catch((err) => reject(err));
});

