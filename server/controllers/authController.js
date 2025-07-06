const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

  if (rows.length === 0) return res.status(401).json({ message: 'User not found' });

  const user = rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, accessKey: user.access_key, role: user.role, name: user.name });
};
