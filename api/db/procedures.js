
const _setProcQMarks = (n) => {
  if (n <= 0) throw new Error('Invalid function argument!');
  return (n === 1) ? `?` : `?` + ', ?'.repeat(args.length - 1);
};

const _call = (conn, procName, ...args) => {
  const q = `CALL GetUserByNickName(${_setProcQMarks(args.length)})`;
};


const getUserByNickName = (conn, name) => {
  const q = `CALL GetUserByNickName(?)`;
  return new Promise((resolve, reject) => {
    conn.query(q, [name], (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res);
    });
  });
};

const insertUser = (conn, nickName, firstName, secondName, email, accessLevel, age, sex) => {
  const q = `CALL InsertUser(?, ?, ?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    conn.query(q, [nickName, firstName, secondName, email, accessLevel, age, sex], (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res);
    });
  });
};

const replaceAt = (str, index, replacement) => {
  return str.substr(0, index) + replacement + str.substr(index + replacement.length);
};

const updateTable = (conn, tableName, whereIdField, someId, updateObj) => {
  let setRow = '';
  for (const field in updateObj) setRow += `${field} = ${updateObj[field]},\n`;
  const lastComaId = setRow.lastIndexOf(',');
  setRow = replaceAt(setRow, lastComaId, ' ');
  someId = typeof someId === 'number' ? someId : `\'${someId}\'`;
  const q = `
    UPDATE ${tableName}
    SET
      ${setRow}
    WHERE
      ${whereIdField} = ${someId};
  `;
  return new Promise((resolve, reject) => {
    conn.query(q, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res);
    });
  });
};

const deleteRowsFromTable = (conn, tableName, whereIdField, someId) => {
  someId = typeof someId === 'number' ? someId : `\'${someId}\'`;
  const q = `DELETE FROM ${tableName} WHERE ${whereIdField} = ${someId};`;
  return new Promise((resolve, reject) => {
    conn.query(q, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res);
    });
  });
};

module.exports = {
  getUserByNickName,
  insertUser,
  updateTable,
  deleteRowsFromTable,

};
