const Procedures = require('./procedures.js');
const Connection = require('./dbConnection.js');

//data base controller
class DBC {
  constructor(options) {
    this.options = options;
    this.schema = {
      name: null,
      tables: {},
    };
  }

  connect = (cb) => new Promise((resolve, reject) => {
    Connection.getConnection().then((res) => {
      if (res.err) return resolve(res.err);
      this._conn = res.conn;
      if (cb) cb();
      resolve();
    });
  });

  getDbSchema = () => new Promise(async (resolve, reject) => {
    try {
      const data = await Procedures.getDbSchema(this._conn);
      const tableNames = [];
      for (const row of data) tableNames.push(row['table_name']);
      const promises = [];
      for (const tName of tableNames) {
        promises.push(Procedures.descTable(this._conn, tName));
      }
      Promise.all(promises).then((data) => {
        console.log(data);
        if (data.length === 0) throw new Error('Empty Tables!');
        for (let i = 0; i < tableNames.length; i++) {
          const tableFields = data[i];
          this.schema.tables[tableNames[i]] = {};
          for (const fieldRow of tableFields) {
            this.schema.tables[tableNames[i]][fieldRow.Field] = fieldRow.Type;
          }
        }
        resolve(true);
      });
    } catch (err) {
      reject(err);
    }
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

  insertUser = (nickName, firstName, secondName, email, accessLevel, age, sex) => new Promise(async (resolve, reject) => {
    try {
      await Procedures.insertUser(this._conn, nickName, firstName, secondName, email, accessLevel, age, sex);
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });

  updateUserByNickName = (name, updateObj) => Procedures.updateTable(this._conn, 'Users', 'nickName', name, updateObj);

  deleteFromUsersByNickName = (name) => Procedures.deleteRowsFromTable(this._conn, 'Users', 'nickName', name);

  insertUser = (...args) => {
    if (args.length === 1) return Procedures.insertIntoTable(this._conn, 'Users', args);
    return Procedures.insertIntoTable(this._conn, 'Users', insertObj);
  }

}

module.exports.default = DBC;

//example
const dbc = new DBC();
(async () => {
  let res;
  
  try {
    const error = await dbc.connect();
    if (error) return console.log('const error:', error);
    //res = await dbc.insertUser('LTR', 'myFirstName', 'mySecondName', 'myEmail', '1', 2, 'w');
    res = await dbc.getDbSchema();
  } catch (err) {
    console.log('catch error:', err)
  }
  console.log(res);
})()


