import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../api/axios';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getStats()
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-light text-diamond-800 mb-8">แดชบอร์ด</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'ลูกค้าทั้งหมด', value: stats?.totalUsers || 0, icon: '&#128100;', color: 'from-blue-50 to-blue-100' },
          { label: 'สินค้าทั้งหมด', value: stats?.totalProducts || 0, icon: '&#9830;', color: 'from-primary-50 to-primary-100' },
          { label: 'คำสั่งซื้อทั้งหมด', value: stats?.totalOrders || 0, icon: '&#128230;', color: 'from-green-50 to-green-100' },
          { label: 'รายได้รวม', value: `฿${(stats?.totalRevenue || 0).toLocaleString()}`, icon: '&#128176;', color: 'from-amber-50 to-amber-100' },
        ].map((item, i) => (
          <div key={i} className={`bg-gradient-to-br ${item.color} rounded-xl p-5 border border-white/50`}>
            <div className="text-2xl mb-2" dangerouslySetInnerHTML={{ __html: item.icon }} />
            <p className="text-2xl font-semibold text-diamond-800">{item.value}</p>
            <p className="text-xs text-diamond-500 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/admin/products" className="bg-white rounded-xl border border-diamond-100 p-6 hover:shadow-md transition-shadow text-center">
          <div className="text-3xl mb-3">&#128722;</div>
          <h3 className="font-medium text-diamond-800">จัดการสินค้า</h3>
          <p className="text-xs text-diamond-400 mt-1">เพิ่ม แก้ไข ลบสินค้า</p>
        </Link>
        <Link to="/admin/orders" className="bg-white rounded-xl border border-diamond-100 p-6 hover:shadow-md transition-shadow text-center">
          <div className="text-3xl mb-3">&#128203;</div>
          <h3 className="font-medium text-diamond-800">จัดการออเดอร์</h3>
          <p className="text-xs text-diamond-400 mt-1">อัปเดตสถานะและเลขพัสดุ</p>
        </Link>
        <Link to="/admin/users" className="bg-white rounded-xl border border-diamond-100 p-6 hover:shadow-md transition-shadow text-center">
          <div className="text-3xl mb-3">&#128101;</div>
          <h3 className="font-medium text-diamond-800">ดูลูกค้า</h3>
          <p className="text-xs text-diamond-400 mt-1">รายชื่อลูกค้าทั้งหมด</p>
        </Link>
      </div>
    </div>
  );
}
