const mysql = require('mysql');
const connData = require('../../secret.js').dbConnData;


const conn = mysql.createConnection(connData);

conn.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const getConnection = () => {

};

(async () => {
  const res = await require('./procedures.js').getUserByName(conn, 'LTR');
  console.log(res);
})()

