
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

module.exports = {
  getUserByNickName,
};
