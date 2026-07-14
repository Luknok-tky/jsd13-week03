import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/axios';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getUsers()
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-light text-diamond-800 mb-8">รายชื่อลูกค้า</h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-16 text-diamond-400">
          <p className="text-3xl mb-2">&#9830;</p>
          <p>ยังไม่มีลูกค้า</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-diamond-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-diamond-100 bg-diamond-50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-diamond-500">ชื่อ</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-diamond-500">อีเมล</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-diamond-500">เบอร์โทร</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-diamond-500">ที่อยู่</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-diamond-500">วันที่สมัคร</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-diamond-50 hover:bg-diamond-50/50">
                    <td className="px-4 py-3 font-medium text-diamond-800">{user.name}</td>
                    <td className="px-4 py-3 text-diamond-500">{user.email}</td>
                    <td className="px-4 py-3 text-diamond-500">{user.phone || '-'}</td>
                    <td className="px-4 py-3 text-diamond-500 max-w-xs truncate">{user.address || '-'}</td>
                    <td className="px-4 py-3 text-diamond-400 text-xs">
                      {new Date(user.createdAt).toLocaleDateString('th-TH')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
