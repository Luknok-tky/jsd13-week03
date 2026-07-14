import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'สมัครสมาชิกไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl text-rose-gold">&#9830;</span>
          <h1 className="text-2xl font-light text-diamond-800 mt-4">สมัครสมาชิก</h1>
          <p className="text-sm text-diamond-400 mt-2">สร้างบัญชีเพื่อเริ่มช้อป</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-diamond-100 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-6">
              {error}
            </div>
          )}

          {[
            { label: 'ชื่อ-นามสกุล', name: 'name', type: 'text', required: true },
            { label: 'อีเมล', name: 'email', type: 'email', required: true },
            { label: 'รหัสผ่าน', name: 'password', type: 'password', required: true },
            { label: 'เบอร์โทร', name: 'phone', type: 'tel', required: false },
          ].map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-sm text-diamond-600 mb-2">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required={field.required}
                className="w-full border border-diamond-200 rounded-lg px-4 py-3 text-sm text-diamond-700 focus:outline-none focus:border-rose-gold"
              />
            </div>
          ))}

          <div className="mb-6">
            <label className="block text-sm text-diamond-600 mb-2">ที่อยู่</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full border border-diamond-200 rounded-lg px-4 py-3 text-sm text-diamond-700 focus:outline-none focus:border-rose-gold resize-none"
              placeholder="กรอกที่อยู่สำหรับจัดส่ง"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-diamond-800 text-white py-3 rounded-full text-sm font-medium hover:bg-diamond-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
          </button>

          <p className="text-center text-sm text-diamond-400 mt-6">
            มีบัญชีอยู่แล้ว?{' '}
            <Link to="/login" className="text-rose-gold hover:underline">เข้าสู่ระบบ</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
