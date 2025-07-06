const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const accessKey = process.env.ACCESS_KEY; 

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [existing] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.execute(
      'INSERT INTO users (name, email, password, role, access_key) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashed, role, accessKey]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
