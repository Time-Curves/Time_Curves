const path = require('path');

/**
 * generate a config of static sources redirects: individually
 * @param {{ routeToFile: string }} config - redirects config object
 * @returns { Map.<string, string> } serve static config
 */
const genConfig = (config, _dir) => {
  const map = new Map();
  for (const route of Object.values(config)) {
    map.set(route, path.join(_dir, config.route));
  }
  return map;
};

/**
 * generate a config of static sources redirects: same for all
 * @param { string[] } routes - first part of req.url
 * @param { string } to - redirect to
 * @param { string } _dir - server working directory
 * @returns { Map.<string, string> } serve static config
 */
const genConfigForAll = (routes, to, _dir) => {
  const config = new Map();
  for (const route of routes) {
    config.set(route, path.join(_dir, to));
  }
  return config;
};

/**
 * creates static elements request handler with some config
 * @param { Map.<string, string> } staticConfig - serve static config gen by this module
 * @returns { Function } static elements request handler function
 */
const create = (staticConfig) => {
  const config = staticConfig;
  return (req, res, fs) => {
    const pathArr = req.url.split('/').slice(1);
    console.log(pathArr);
    const configPathPart = '/' + pathArr[0];
    if (config.has(configPathPart)) {
      const fullPath = path.join(config.get(configPathPart), req.url);
      fs.stat(fullPath, (err, stats) => {
        if (!err && stats.isFile()) fs.readFile(fullPath, (err, data) => {
          if (!err) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.writeHead(200);
            res.end(data);
          }
        });
      });
      return true;
    } else {
      return false;
    }
  };
};

module.exports = {
  genConfig,
  genConfigForAll,
  create,
};
