const db = require('../config/db');
const bcrypt = require('bcryptjs');

const createAdminUser = async () => {
  const name = 'Admin User';
  const email = 'admin@curdly.com';
  const plainPassword = 'admin123'; // This will be encrypted
  const accessKey = 'secure_access_key'; // same as in .env
  const role = 'admin';

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  try {
    await db.execute(
      'INSERT INTO users (name, email, password, role, access_key) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, accessKey]
    );
    console.log('Admin user created successfully');
    process.exit();
  } catch (err) {
    console.error('Error inserting admin user:', err.message);
    process.exit(1);
  }
};

createAdminUser();
