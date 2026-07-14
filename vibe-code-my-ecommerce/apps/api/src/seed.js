require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared existing data');

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@diamond.com',
      password: 'admin123',
      role: 'admin',
      phone: '099-999-9999',
      address: 'สำนักงานใหญ่',
    });

    const users = await User.insertMany([
      {
        name: 'นส. พลอยไพลิน ใจดี',
        email: 'ploy.lin@university.ac.th',
        password: 'password123',
        role: 'customer',
        phone: '081-234-5678',
        address: 'หอพักนักศึกษาห้อง 402, 123 ถ.ฉลองกรุง, เขตลาดกระบัง, กรุงเทพฯ 10520',
      },
      {
        name: 'คุณ ณัฐวุฒิ เกียรติขจร',
        email: 'nutthawut.k@company.com',
        password: 'password123',
        role: 'customer',
        phone: '089-876-5432',
        address: 'คอนโดสราญรมย์ ชั้น 12, 45/9 ถ.สุขุมวิท 21, เขตวัฒนา, กรุงเทพฯ 10110',
      },
      {
        name: 'นาง วรรณพร เลิศวิจิตร',
        email: 'wannaporn.le@gmail.com',
        password: 'password123',
        role: 'customer',
        phone: '084-555-9999',
        address: 'บ้านเลขที่ 88/8 หมู่บ้านแกรนด์พาร์ค, ถ.ราชพฤกษ์, อ.บางกรวย, นนทบุรี 11130',
      },
    ]);
    console.log(`Created ${users.length} users + 1 admin`);

    const products = await Product.insertMany([
      {
        name: 'Minimalist Petite Band Ring',
        category: 'แหวน',
        price: 2490,
        image: 'https://example.com/images/petite-band.jpg',
        diamondDetail: {
          carat: '0.15 กะรัต',
          color: 'น้ำ 100 (D Color)',
        },
        options: {
          colors: ['สีทองขาว', 'สีโรสโกลด์'],
          sizes: [48, 50, 52],
        },
        stock: 15,
      },
      {
        name: 'Classic Solitaire Stud Earrings',
        category: 'ต่างหู',
        price: 4990,
        image: 'https://example.com/images/classic-studs.jpg',
        diamondDetail: {
          carat: '0.50 กะรัต x 2 ข้าง',
          color: 'น้ำ 99 (E Color)',
        },
        options: {
          colors: ['สีทองขาว', 'สีทอง'],
          sizes: [0],
        },
        stock: 8,
      },
    ]);
    console.log(`Created ${products.length} products`);

    const order = await Order.create({
      user: users[0]._id,
      product: products[0]._id,
      productName: products[0].name,
      selectedSize: 50,
      selectedColor: 'สีโรสโกลด์',
      quantity: 1,
      totalPrice: 2490,
      shippingAddress: `${users[0].name} - ${users[0].address}`,
      status: 'จัดส่งแล้ว',
      trackingNumber: 'TH123456789EX',
    });
    console.log('Created 1 sample order');

    console.log('\n--- Seed Complete ---');
    console.log('Admin:    admin@diamond.com / admin123');
    console.log('Customer: ploy.lin@university.ac.th / password123');
    console.log('---------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
