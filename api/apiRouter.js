
const routes = {
  '/map': { accessRequired: 1, executor: () => 'map', contentType: 'text/html' }
};


const getRoute = (routeStr, userAccessLevel) => {
  const route = routes[routeStr];
  if (!route) return { route: null, err: new Error('Wrong call') };
  if (route.accessRequired > userAccessLevel) return { route: null, err: new Error('Not enough access level!') };
  return { route, err: null };
};


module.exports = {
  getRoute,
};


