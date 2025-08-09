const db = require('../db');

async function getUserDetails(req, res) {
  const userId = req.user.userId; // from authenticate middleware

  try {
    const result = await db.query(
      'SELECT id, username, email, full_name, role, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get user details error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getUserDetails };
