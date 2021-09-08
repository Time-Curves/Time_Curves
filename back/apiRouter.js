
const routes = {
  '/map': { accessRequired: 0, executor: () => 'map', contentType: 'text/html' }
};


const getRoute = (routeStr, access) => {
  const route = routes[routeStr];
  if (!route) return null;
  if (access < route.access) return new Error('Not enough access level!');
  return route;
};


module.exports = {
  getRoute,
};


