import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl text-diamond-200 mb-6">&#9830;</div>
        <h2 className="text-xl font-light text-diamond-700 mb-2">ตะกร้าสินค้าว่างเปล่า</h2>
        <p className="text-sm text-diamond-400 mb-6">ไปเลือกสินค้าที่ถูกใจกันเถอะ</p>
        <Link
          to="/products"
          className="inline-block bg-diamond-800 text-white px-8 py-3 rounded-full text-sm hover:bg-diamond-700 transition-colors"
        >
          เลือกชมสินค้า
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-light text-diamond-800 mb-8">ตะกร้าสินค้า</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.key} className="flex gap-4 p-4 bg-white rounded-xl border border-diamond-100">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-diamond-50 to-primary-50 overflow-hidden flex-shrink-0">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center justify-center h-full text-2xl text-diamond-200">&#9830;</div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-diamond-800 truncate">{item.product.name}</h3>
              <p className="text-xs text-diamond-400 mt-1">
                {item.selectedColor}
                {item.selectedSize !== 0 && ` &middot; ไซส์ ${item.selectedSize}`}
              </p>
              <p className="text-sm font-semibold text-diamond-900 mt-1">
                &#3647;{(item.product.price * item.quantity).toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => removeItem(item.key)}
                className="text-diamond-300 hover:text-red-400 transition-colors text-sm"
              >
                &times;
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.key, item.quantity - 1)}
                  className="w-7 h-7 rounded-full border border-diamond-200 text-diamond-500 text-sm flex items-center justify-center hover:border-rose-gold"
                >
                  -
                </button>
                <span className="text-sm font-medium text-diamond-700 w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.key, item.quantity + 1)}
                  className="w-7 h-7 rounded-full border border-diamond-200 text-diamond-500 text-sm flex items-center justify-center hover:border-rose-gold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-diamond-100 p-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-diamond-500">ราคารวม</span>
          <span className="text-xl font-semibold text-diamond-900">
            &#3647;{totalPrice.toLocaleString()}
          </span>
        </div>
        <Link
          to="/checkout"
          className="block w-full mt-4 bg-diamond-800 text-white py-3 rounded-full text-sm text-center font-medium hover:bg-diamond-700 transition-colors"
        >
          ดำเนินการสั่งซื้อ
        </Link>
      </div>
    </div>
  );
}
