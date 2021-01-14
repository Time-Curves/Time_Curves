'use strict';

const http = require('http');
const FileManager = require('./scr/node-js/fileManager').FileManager;
const fileManager = new FileManager();

//types of request extensions
const mime = {
  'html': 'text/html',
  'js': 'application/javascript',
  'css': 'text/css',
  'png': 'image/png',
  'ico': 'image/x-icon',
  '/date': 'text/plain',
};

//function for handling requests
async function handleRequest(req, res) {
  const url = req.url;
  let name = url;
  const method = req.method;
  let extention = url.split('.')[1];
  if (method === 'GET') {
    if (url === '/') {
      extention = 'html';
      name = '/index.html';
    }
    const typeAns = mime[extention];
    let data = await fileManager.readFile('.' + name);
    if (!data) {
      //handle if no page
      const pageNotFound = await fileManager.readFile('./scr/html/pageNotFound.html');
      console.log('no such file => ' + name);
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write(pageNotFound);
    } else if (typeof data === 'number') {
      console.log('error occured => ' + name);
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    } else {
      res.writeHead(200, { 'Content-Type': `${typeAns}; charset=utf-8` });
      res.write(data);
    }
    res.end();
  } else if (method === 'POST') {
    console.log('POST');
  }
}
  
//creating server
const server = http.createServer();

server.listen(process.env.PORT || 8000, () => {
  console.log('Server running on port 8000...');
});

server.on('request', handleRequest);

//handling rejections in promises
process.on('unhandledRejection', error => {
  console.log('rejection: ', error);
});

process.on('rejectionHandled', promise => {
  console.log('rejection handled: ' + promise);
});
