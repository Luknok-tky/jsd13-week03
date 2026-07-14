import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl text-rose-gold">&#9830;</span>
          <h1 className="text-2xl font-light text-diamond-800 mt-4">เข้าสู่ระบบ</h1>
          <p className="text-sm text-diamond-400 mt-2">ยินดีต้อนรับกลับมา</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-diamond-100 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-6">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm text-diamond-600 mb-2">อีเมล</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-diamond-200 rounded-lg px-4 py-3 text-sm text-diamond-700 focus:outline-none focus:border-rose-gold"
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-diamond-600 mb-2">รหัสผ่าน</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-diamond-200 rounded-lg px-4 py-3 text-sm text-diamond-700 focus:outline-none focus:border-rose-gold"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-diamond-800 text-white py-3 rounded-full text-sm font-medium hover:bg-diamond-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>

          <p className="text-center text-sm text-diamond-400 mt-6">
            ยังไม่มีบัญชี?{' '}
            <Link to="/register" className="text-rose-gold hover:underline">สมัครสมาชิก</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
