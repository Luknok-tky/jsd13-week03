import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../api/axios';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.address || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (items.length === 0 && !success) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      for (const item of items) {
        await orderAPI.create({
          product: item.product._id,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          quantity: item.quantity,
          shippingAddress: address,
        });
      }
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการสั่งซื้อ');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl text-green-500">&#10003;</span>
        </div>
        <h2 className="text-xl font-light text-diamond-800 mb-2">สั่งซื้อสำเร็จ!</h2>
        <p className="text-sm text-diamond-500 mb-6">ขอบคุณสำหรับคำสั่งซื้อ เราจะดำเนินการจัดส่งให้โดยเร็ว</p>
        <button
          onClick={() => navigate('/my-orders')}
          className="bg-diamond-800 text-white px-8 py-3 rounded-full text-sm hover:bg-diamond-700 transition-colors"
        >
          ดูคำสั่งซื้อของฉัน
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-light text-diamond-800 mb-8">สรุปคำสั่งซื้อ</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl border border-diamond-100 p-6 mb-6">
              <h2 className="text-sm font-medium text-diamond-700 mb-4">ที่อยู่จัดส่ง</h2>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
                className="w-full border border-diamond-200 rounded-lg px-4 py-3 text-sm text-diamond-700 focus:outline-none focus:border-rose-gold resize-none"
                placeholder="กรอกที่อยู่สำหรับจัดส่ง"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-4 mb-6">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-diamond-800 text-white py-3 rounded-full text-sm font-medium hover:bg-diamond-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'กำลังดำเนินการ...' : 'ยืนยันคำสั่งซื้อ'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl border border-diamond-100 p-6 h-fit">
          <h2 className="text-sm font-medium text-diamond-700 mb-4">สรุปสินค้า</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.key} className="flex justify-between text-sm">
                <span className="text-diamond-600 truncate mr-2">
                  {item.product.name} x{item.quantity}
                </span>
                <span className="text-diamond-800 font-medium whitespace-nowrap">
                  &#3647;{(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <hr className="border-diamond-100 mb-4" />
          <div className="flex justify-between">
            <span className="text-sm text-diamond-500">ยอดรวมทั้งหมด</span>
            <span className="text-lg font-semibold text-diamond-900">
              &#3647;{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
