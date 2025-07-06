const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  const accessKey = req.headers['x-access-key'];

  if (!token || !accessKey) {
    return res.status(403).json({ message: 'Token or Access Key missing' });
  }

  if (accessKey !== process.env.ACCESS_KEY) {
    return res.status(401).json({ message: 'Invalid Access Key' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid Token' });
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
