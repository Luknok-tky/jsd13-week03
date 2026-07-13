const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    selectedSize: {
      type: Number,
      required: true,
    },
    selectedColor: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: [true, 'กรุณาระบุที่อยู่จัดส่ง'],
    },
    status: {
      type: String,
      enum: ['รอดำเนินการ', 'กำลังเตรียมสินค้า', 'จัดส่งแล้ว', 'จัดส่งสำเร็จ', 'ยกเลิก'],
      default: 'รอดำเนินการ',
    },
    trackingNumber: {
      type: String,
      default: '',
    },
    paymentSlip: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
