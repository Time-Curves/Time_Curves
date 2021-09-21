const https = require('https');
const path = require('path');
let fs = require('fs');
const getRoute = require('./api/apiRouter').getRoute;
const DBC = require('./api/db/dbc.js').default;

const serverOptions = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

const dbc = new DBC();

const sendError = async (response, err) => {
  response.setHeader('Content-Type', 'text/html');
  response.end(err.toString());
}

const execReq = async (req, res) => {
  const userData = await dbc.getUserByNickName('LTR');
  const accessLevel = userData ? userData.accessLevel : 0;
  const routeReq = getRoute(req.url, accessLevel);
  if (routeReq.err) {
    sendError(res, routeReq.err);
    return;
  }
  const route = routeReq.route;
  const content = await route.executor(req);
  ///
  console.log('success api call:', content);
  ///
  res.setHeader('Content-Type', route.contentType);
  res.end(content);
};


(async () => {
  const err = await dbc.connect();
  if (err) return console.log('Cat\' run api, error connecting DB: \n', err);
  https.createServer(serverOptions, async (req, res) => {
    console.log('New API REQ:', req.url);
    execReq(req, res);
  }).listen(7070);
})()

console.log('You can navigate to https://localhost:7070');
