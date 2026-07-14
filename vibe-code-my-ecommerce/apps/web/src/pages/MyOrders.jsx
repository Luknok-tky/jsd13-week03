import { useState, useEffect } from 'react';
import { orderAPI } from '../api/axios';

const statusColors = {
  'รอดำเนินการ': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'กำลังเตรียมสินค้า': 'bg-blue-50 text-blue-700 border-blue-200',
  'จัดส่งแล้ว': 'bg-purple-50 text-purple-700 border-purple-200',
  'จัดส่งสำเร็จ': 'bg-green-50 text-green-700 border-green-200',
  'ยกเลิก': 'bg-red-50 text-red-700 border-red-200',
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getMyOrders()
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-light text-diamond-800 mb-8">คำสั่งซื้อของฉัน</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl text-diamond-200 mb-4">&#9830;</div>
          <p className="text-diamond-400">ยังไม่มีคำสั่งซื้อ</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl border border-diamond-100 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-diamond-800">{order.productName}</p>
                  <p className="text-xs text-diamond-400 mt-1">
                    {order.selectedColor} &middot; ไซส์ {order.selectedSize} &middot; จำนวน {order.quantity}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full border ${statusColors[order.status] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-diamond-400">
                  {new Date(order.createdAt).toLocaleDateString('th-TH')}
                </span>
                <span className="font-semibold text-diamond-900">
                  &#3647;{order.totalPrice.toLocaleString()}
                </span>
              </div>
              {order.trackingNumber && (
                <p className="text-xs text-diamond-500 mt-2">
                  เลขพัสดุ: <span className="font-medium">{order.trackingNumber}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
