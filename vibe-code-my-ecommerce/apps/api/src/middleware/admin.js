const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'ไม่มีสิทธิ์เข้าถึง (Admin only)' });
};

module.exports = { adminOnly };
