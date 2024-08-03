const pool = require("./pool");

async function placeholderFunction() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

module.exports = {
  placeholderFunction,
};
