import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-diamond-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">&#9830;</span>
            <span className="text-lg font-semibold tracking-wide text-diamond-800">
              DiamondEternal
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/products" className="text-sm text-diamond-600 hover:text-rose-gold transition-colors">
              สินค้าทั้งหมด
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-sm text-diamond-600 hover:text-rose-gold transition-colors">
                จัดการร้าน
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative text-diamond-700 hover:text-rose-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 text-sm text-diamond-700 hover:text-rose-gold transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium text-sm">
                    {user.name?.charAt(0)}
                  </div>
                  <span className="hidden sm:inline">{user.name?.split(' ')[0]}</span>
                </button>
                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-diamond-100 py-2 z-50">
                      <Link to="/my-orders" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-diamond-700 hover:bg-diamond-50">
                        คำสั่งซื้อของฉัน
                      </Link>
                      <hr className="my-1 border-diamond-100" />
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                        ออกจากระบบ
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-sm bg-diamond-800 text-white px-4 py-2 rounded-full hover:bg-diamond-700 transition-colors">
                เข้าสู่ระบบ
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
