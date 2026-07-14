import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'แดชบอร์ด', icon: '&#9632;' },
  { to: '/admin/products', label: 'สินค้า', icon: '&#9830;' },
  { to: '/admin/orders', label: 'ออเดอร์', icon: '&#128230;' },
  { to: '/admin/users', label: 'ลูกค้า', icon: '&#128101;' },
];

export default function AdminLayout({ children }) {
  const location = useLocation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-diamond-100 p-4 sticky top-24">
            <p className="text-xs text-diamond-400 uppercase tracking-wider mb-3 px-3">จัดการร้าน</p>
            <nav className="space-y-1">
              {links.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'bg-diamond-800 text-white'
                        : 'text-diamond-600 hover:bg-diamond-50'
                    }`}
                  >
                    <span className="text-base" dangerouslySetInnerHTML={{ __html: link.icon }} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
