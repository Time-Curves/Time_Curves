const https = require('https');
const path = require('path');
let fs = require('fs');

https.createServer(serverOptions, async (req, res) => {
  console.log('New REQ:', req.url);
  if (process.env.HMR) {
    devServerMiddleware(req, res, serve);
  } else {
    serve(req, res);
  }
}).listen(7070);

console.log('You can navigate to https://localhost:7070');
