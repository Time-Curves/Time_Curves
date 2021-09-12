const Procedures = require('./procedures.js');
const Connection = require('./dbConnection.js');

//data base controller
class DBC {
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

  getUserByNickName = (name) => new Promise(async (resolve, reject) => {
    try {
      const data = await Procedures.getUserByNickName(this._conn, name);
      const rows = data[0];
      const res = rows[0];
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });

}

module.exports.default = DBC;

//example
const dbc = new DBC();
(async () => {
  let res;
  
  try {
    const error = await dbc.connect();
    if (error) return console.log('const error:', error);
    res = await dbc.getUserByNickName('LTR');
  } catch (err) {
    console.log('catch error:', err)
  }
  console.log(res);
})()


