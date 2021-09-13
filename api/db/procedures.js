
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

module.exports = {
  getUserByNickName,
  insertUser,
  
};
