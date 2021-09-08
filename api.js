const https = require('https');
const path = require('path');
let fs = require('fs');
const getRoute = require('./back/apiRouter').getRoute;

const serverOptions = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

const execReq = async (req, res) => {
  //const accessLevel = await getUserAccess(req);
  const route = getRoute(req.url, /*accessLevel*/);
  const content = await route.executor(req);
  res.setHeader('Content-Type', route.contentType);
  res.end(content);
};

https.createServer(serverOptions, async (req, res) => {
  console.log('New REQ:', req.url);
  execReq(req, res);
}).listen(7070);

console.log('You can navigate to https://localhost:7070');
