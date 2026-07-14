import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productAPI } from '../api/axios';

const categories = ['ทั้งหมด', 'แหวน', 'ต่างหู', 'สร้อยข้อมือ', 'สร้อยคอ'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'ทั้งหมด';

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory !== 'ทั้งหมด') {
      params.category = activeCategory;
    }
    productAPI.getAll(params)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleCategoryChange = (cat) => {
    if (cat === 'ทั้งหมด') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <p className="text-rose-gold text-sm tracking-[0.2em] uppercase mb-2">Collection</p>
        <h1 className="text-3xl font-light text-diamond-800">สินค้าทั้งหมด</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-5 py-2 rounded-full text-sm transition-all ${
              activeCategory === cat
                ? 'bg-diamond-800 text-white'
                : 'bg-white text-diamond-600 border border-diamond-200 hover:border-rose-gold hover:text-rose-gold'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-diamond-400">
          <p className="text-4xl mb-4">&#9830;</p>
          <p>ยังไม่มีสินค้าในหมวดหมู่นี้</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="group rounded-2xl overflow-hidden border border-diamond-100 bg-white hover:shadow-lg transition-all"
            >
              <div className="aspect-square bg-gradient-to-br from-diamond-50 to-primary-50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden items-center justify-center h-full text-6xl text-diamond-200">&#9830;</div>
              </div>
              <div className="p-5">
                <p className="text-xs text-rose-gold tracking-wider uppercase mb-1">{product.category}</p>
                <h3 className="font-medium text-diamond-800 text-sm mb-1 line-clamp-1">{product.name}</h3>
                {product.diamondDetail && (
                  <p className="text-xs text-diamond-400 mb-2">
                    {product.diamondDetail.carat} &middot; {product.diamondDetail.color}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-diamond-900">
                    &#3647;{product.price.toLocaleString()}
                  </p>
                  {product.stock > 0 ? (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      มีสินค้า
                    </span>
                  ) : (
                    <span className="text-xs text-red-400 bg-red-50 px-2 py-1 rounded-full">
                      สินค้าหมด
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
