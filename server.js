const https = require('https');
const path = require('path');
let fs = require('fs');
const { renderToString } = require('@vue/server-renderer');
const ServeStatic = require('./src/utils/serveStatic.js');
const DevServer = require('./setup-dev-server.js');
const insertInitialState = require('./src/utils/insertInitialState.js').insertInitialState;

const webpackManifest = require('./dist/server/ssr-manifest.json');
const appPath = path.join(__dirname, 'dist', 'server', webpackManifest['app.js']);
const template = fs.readFileSync(path.join(__dirname, '/dist/client/index.html'), 'utf-8')
  .toString();

const createApp = require(appPath).default;

const serverOptions = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};


const STATIC = ['/img', '/js', '/css', '/favicon.ico'];
const staticConfig = ServeStatic.genConfigForAll(STATIC, './dist/client', __dirname);
const handleStatic = ServeStatic.create(staticConfig, __dirname);

const devServerOptions = {
  templatePath: path.join(__dirname, '/dist/client/index.html'),
  pathToClientBundle: path.join(__dirname, '/dist/client'),
  compileToFs: !!process.env.FS,
  ignore: /\.hot-update\.js$/,
};

let devServerMiddleware = null;
if (process.env.HMR) {
  try {
    DevServer.setHooks(devServerOptions);
    devServerMiddleware = DevServer.getMiddleware();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

const serve = async (req, res) => {
  console.log('SSR req.url:', req.url);

  if (process.env.HMR) fs = res.locals.fs;

  if (handleStatic(req, res, fs)) return;

  const appParts = Object.create(null); // app parts: { app, router, store }
  let appContent = new String();

  try {
    Object.assign(appParts, await createApp(req));
  } catch (err) {
    console.log(err);
    res.setHeader('Content-Type', 'text/html');
    res.end('server error 500');
    return;
  }

  const { app, store } = appParts;

  let templateWithState;
  try {
    appContent = await renderToString(app);
    templateWithState = insertInitialState(store.state, template);
  } catch (err) {
    console.log(err);
    return;
  }

  const html = templateWithState.replace('<div id="app">', `<div id="app">${appContent}`);

  res.setHeader('Content-Type', 'text/html');
  res.end(html);
};

https.createServer(serverOptions, async (req, res) => {
  console.log('New REQ:', req.url);
  if (process.env.HMR) {
    devServerMiddleware(req, res, serve);
  } else {
    serve(req, res);
  }
}).listen(8080);

console.log('You can navigate to https://localhost:8080');
