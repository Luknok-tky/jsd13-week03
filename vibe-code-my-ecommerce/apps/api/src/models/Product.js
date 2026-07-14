const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'กรุณาระบุชื่อสินค้า'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'กรุณาระบุหมวดหมู่สินค้า'],
      enum: ['แหวน', 'ต่างหู', 'สร้อยข้อมือ', 'สร้อยคอ'],
    },
    price: {
      type: Number,
      required: [true, 'กรุณาระบุราคาสินค้า'],
      min: 0,
    },
    image: {
      type: String,
      default: '',
    },
    diamondDetail: {
      carat: { type: String, default: '' },
      color: { type: String, default: '' },
    },
    options: {
      colors: [{ type: String }],
      sizes: [{ type: Number }],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
