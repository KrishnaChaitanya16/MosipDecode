const db = require('../db');

async function findUserByUsername(username) {
  const res = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  return res.rows[0];
}

async function createUser({ username, passwordHash, email, fullName, role }) {
  const res = await db.query(
    `INSERT INTO users (username, password_hash, email, full_name, role)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [username, passwordHash, email, fullName, role]
  );
  return res.rows[0];
}

module.exports = { findUserByUsername, createUser };
