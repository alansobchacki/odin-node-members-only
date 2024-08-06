const pool = require("./pool");

// all user-related queries
async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

async function addNewUser(
  firstName,
  lastName,
  userName,
  password,
  email,
  membership
) {
  const membershipQuery = await pool.query(
    "SELECT id FROM membership WHERE status = $1",
    [membership]
  );

  const membershipId = membershipQuery.rows[0].id;

  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password, email, membership_id) VALUES ($1, $2, $3, $4, $5, $6)",
    [firstName, lastName, userName, password, email, membershipId]
  );
}

async function changeUserMembership(userName, membership = "member") {
  const membershipQuery = await pool.query(
    "SELECT id FROM membership WHERE status = $1",
    [membership]
  );

  const membershipId = membershipQuery.rows[0].id;

  await pool.query("UPDATE users SET membership_id = $1 WHERE username = $2", [
    membershipId,
    userName,
  ]);
}

// all message related queries
async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function addNewMessage(userName, message) {
  const userQuery = await pool.query(
    "SELECT id FROM users WHERE username = $1",
    [userName]
  );

  if (userQuery.rows.length === 0) {
    throw new Error(`User "${userName}" not found.`);
  }

  const userId = userQuery.rows[0].id;

  await pool.query("INSERT INTO messages (user_id, content) VALUES ($1, $2)", [
    userId,
    message,
  ]);
}

async function deleteMessage(messageId) {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
}

module.exports = {
  getAllUsers,
  addNewUser,
  changeUserMembership,
  getAllMessages,
  addNewMessage,
  deleteMessage,
};
