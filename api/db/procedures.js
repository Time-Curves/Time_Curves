
const getUserByName = (conn, name) => {
  const q = `CALL GetUserByName(?)`;
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
  getUserByName,
};
