import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/axios';

const statuses = ['รอดำเนินการ', 'กำลังเตรียมสินค้า', 'จัดส่งแล้ว', 'จัดส่งสำเร็จ', 'ยกเลิก'];

const statusColors = {
  'รอดำเนินการ': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'กำลังเตรียมสินค้า': 'bg-blue-50 text-blue-700 border-blue-200',
  'จัดส่งแล้ว': 'bg-purple-50 text-purple-700 border-purple-200',
  'จัดส่งสำเร็จ': 'bg-green-50 text-green-700 border-green-200',
  'ยกเลิก': 'bg-red-50 text-red-700 border-red-200',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ status: '', trackingNumber: '' });

  const loadOrders = () => {
    setLoading(true);
    const params = filter ? { status: filter } : {};
    adminAPI.getOrders(params)
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadOrders(); }, [filter]);

  const handleEdit = (order) => {
    setEditingId(order._id);
    setEditForm({ status: order.status, trackingNumber: order.trackingNumber || '' });
  };

  const handleUpdate = async (id) => {
    try {
      await adminAPI.updateOrderStatus(id, editForm);
      setEditingId(null);
      loadOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'อัปเดตไม่สำเร็จ');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-light text-diamond-800 mb-8">จัดการออเดอร์</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('')}
          className={`px-4 py-1.5 rounded-full text-xs transition-all ${!filter ? 'bg-diamond-800 text-white' : 'bg-white text-diamond-600 border border-diamond-200'}`}
        >
          ทั้งหมด
        </button>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs transition-all ${filter === s ? 'bg-diamond-800 text-white' : 'bg-white text-diamond-600 border border-diamond-200'}`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 text-diamond-400">
          <p className="text-3xl mb-2">&#9830;</p>
          <p>ไม่มีออเดอร์ในหมวดนี้</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl border border-diamond-100 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <p className="text-sm font-medium text-diamond-800">{order.productName}</p>
                  <p className="text-xs text-diamond-400 mt-1">
                    ลูกค้า: {order.user?.name} ({order.user?.email})
                  </p>
                  <p className="text-xs text-diamond-400">
                    {order.selectedColor} &middot; ไซส์ {order.selectedSize} &middot; จำนวน {order.quantity} &middot; &#3647;{order.totalPrice.toLocaleString()}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full border self-start ${statusColors[order.status] || ''}`}>
                  {order.status}
                </span>
              </div>

              <p className="text-xs text-diamond-400 mb-3">
                ที่อยู่: {order.shippingAddress}
              </p>

              {editingId === order._id ? (
                <div className="bg-diamond-50 rounded-lg p-4 mt-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-diamond-500 mb-1">สถานะ</label>
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                        className="w-full border border-diamond-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-gold"
                      >
                        {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-diamond-500 mb-1">เลขพัสดุ</label>
                      <input
                        value={editForm.trackingNumber}
                        onChange={(e) => setEditForm({ ...editForm, trackingNumber: e.target.value })}
                        placeholder="กรอกเลขพัสดุ"
                        className="w-full border border-diamond-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-gold"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(order._id)} className="bg-diamond-800 text-white px-4 py-1.5 rounded-full text-xs hover:bg-diamond-700">
                      บันทึก
                    </button>
                    <button onClick={() => setEditingId(null)} className="text-diamond-500 text-xs hover:text-diamond-700">
                      ยกเลิก
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => handleEdit(order)} className="text-xs text-rose-gold hover:underline">
                  อัปเดตสถานะ
                </button>
              )}

              {order.trackingNumber && editingId !== order._id && (
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
