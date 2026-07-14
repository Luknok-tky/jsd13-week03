import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    productAPI.getById(id)
      .then((res) => {
        setProduct(res.data);
        setSelectedColor(res.data.options?.colors?.[0] || '');
        setSelectedSize(res.data.options?.sizes?.[0] || 0);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addItem(product, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-diamond-400">
        ไม่พบสินค้า
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button onClick={() => navigate(-1)} className="text-sm text-diamond-500 hover:text-rose-gold mb-6 inline-flex items-center gap-1">
        &larr; กลับ
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-diamond-50 to-primary-50 border border-diamond-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden items-center justify-center h-full text-8xl text-diamond-200">&#9830;</div>
        </div>

        <div className="flex flex-col">
          <p className="text-xs text-rose-gold tracking-[0.2em] uppercase mb-2">{product.category}</p>
          <h1 className="text-2xl md:text-3xl font-light text-diamond-800 mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-diamond-900 mb-6">
            &#3647;{product.price.toLocaleString()}
          </p>

          {product.diamondDetail && (
            <div className="bg-diamond-50 rounded-xl p-4 mb-6 border border-diamond-100">
              <p className="text-xs text-diamond-400 uppercase tracking-wider mb-2">รายละเอียดเพชร</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-diamond-400">น้ำหนัก</p>
                  <p className="text-sm font-medium text-diamond-700">{product.diamondDetail.carat}</p>
                </div>
                <div>
                  <p className="text-xs text-diamond-400">สี</p>
                  <p className="text-sm font-medium text-diamond-700">{product.diamondDetail.color}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <p className="text-sm text-diamond-600 mb-3">สีตัวเรือน</p>
            <div className="flex gap-3">
              {product.options?.colors?.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${
                    selectedColor === color
                      ? 'border-rose-gold bg-rose-gold text-white'
                      : 'border-diamond-200 text-diamond-600 hover:border-rose-gold'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {product.options?.sizes?.length > 0 && product.options.sizes[0] !== 0 && (
            <div className="mb-6">
              <p className="text-sm text-diamond-600 mb-3">ไซส์</p>
              <div className="flex gap-3">
                {product.options.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full text-sm border transition-all flex items-center justify-center ${
                      selectedSize === size
                        ? 'border-rose-gold bg-rose-gold text-white'
                        : 'border-diamond-200 text-diamond-600 hover:border-rose-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <p className="text-sm text-diamond-600">
              สต็อก: <span className="font-medium text-diamond-800">{product.stock} ชิ้น</span>
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-full text-sm font-medium transition-all ${
              added
                ? 'bg-green-500 text-white'
                : product.stock === 0
                  ? 'bg-diamond-200 text-diamond-400 cursor-not-allowed'
                  : 'bg-diamond-800 text-white hover:bg-diamond-700 hover:shadow-lg'
            }`}
          >
            {added ? 'เพิ่มลงตะกร้าแล้ว!' : product.stock === 0 ? 'สินค้าหมด' : 'เพิ่มลงตะกร้า'}
          </button>
        </div>
      </div>
    </div>
  );
}
