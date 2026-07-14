const Order = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders
exports.createOrder = async (req, res, next) => {
  try {
    const { product: productId, selectedSize, selectedColor, quantity, shippingAddress } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'ไม่พบสินค้า' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: `สินค้าคงเหลือเพียง ${product.stock} ชิ้น` });
    }

    if (!product.options.colors.includes(selectedColor)) {
      return res.status(400).json({ message: 'สีที่เลือกไม่มีในตัวเลือก' });
    }

    if (!product.options.sizes.includes(selectedSize)) {
      return res.status(400).json({ message: 'ไซส์ที่เลือกไม่มีในตัวเลือก' });
    }

    const order = await Order.create({
      user: req.user._id,
      product: product._id,
      productName: product.name,
      selectedSize,
      selectedColor,
      quantity,
      totalPrice: product.price * quantity,
      shippingAddress,
    });

    product.stock -= quantity;
    await product.save();

    await order.populate(['user', 'product']);

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// GET /api/orders/my
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('product', 'name image price')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// GET /api/orders/:id
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(['user', 'product']);
    if (!order) {
      return res.status(404).json({ message: 'ไม่พบคำสั่งซื้อ' });
    }
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'ไม่มีสิทธิ์ดูคำสั่งซื้อนี้' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};
