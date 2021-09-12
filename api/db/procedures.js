
const getUserByName = async (conn, name) => {
  const q = `CALL GetUserByName(?)`;
  return await new Promise((resolve, reject) => {
    conn.query(q, [name], (err, res) => {
      if (err) {
        reject(err)
      }
      console.log(res);
      resolve(res);
    });
  });
};

module.exports = {
  getUserByName,
};
