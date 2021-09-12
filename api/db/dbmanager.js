const Procedures = require('./procedures.js');
const Connection = require('./dbConnection.js');

class DBM {
  constructor(options) {
    this.options = options;
  }

  connect = (cb) => new Promise((resolve, reject) => {
    Connection.getConnection().then((res) => {
      if (res.err) return resolve(res.err);
      this._conn = res.conn;
      if (cb) cb();
      resolve();
    });
  });

  getUserByName = (name) => new Promise((resolve, reject) => {
    try {
      resolve(Procedures.getUserByName(this._conn, name));
    } catch (err) {
      reject(err);
    }
  });

}

module.exports = {
  DBM,
};

//example
const dbm = new DBM();
(async () => {
  let res;
  
  try {
    const error = await dbm.connect();
    if (error) return console.log('const error:', error);
    res = await dbm.getUserByName('LTR');
  } catch (err) {
    console.log('catch error:', err)
  }
  console.log(res);
})()


