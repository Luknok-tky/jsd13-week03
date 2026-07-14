const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: 'ข้อมูลไม่ถูกต้อง', errors: messages });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'รูปแบบ ID ไม่ถูกต้อง' });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ message: `${field} นี้มีอยู่ในระบบแล้ว` });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์',
  });
};

module.exports = errorHandler;
