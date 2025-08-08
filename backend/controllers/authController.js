const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByUsername, createUser } = require('../models/userModel');

async function signup(req, res) {
  const { username, password, email, fullName, role } = req.body;

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) return res.status(409).json({ error: 'Username already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({ username, passwordHash, email, fullName, role });

    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid username or password' });

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { signup, login };
