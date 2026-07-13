import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { productAPI } from '../api/axios';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    productAPI.getAll().then((res) => setFeatured(res.data.slice(0, 3)));
  }, []);

  return (
    <div>
      <section className="relative bg-gradient-to-br from-diamond-50 via-white to-primary-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-rose-gold text-sm tracking-[0.3em] uppercase mb-4">Lab-Grown Diamond</p>
            <h1 className="text-4xl md:text-6xl font-light text-diamond-900 leading-tight mb-6">
              ประกายที่คู่ควร
              <span className="block text-3xl md:text-5xl mt-2">กับทุกวันของคุณ</span>
            </h1>
            <p className="text-diamond-500 text-lg mb-8 leading-relaxed">
              เพชรสังเคราะห์คุณภาพระดับโลก สวยงามเหมือนเพชรแท้ แต่ราคาจับต้องได้
              <br className="hidden sm:block" />
              สไตล์มินิมอล ทนทาน 适合ใส่ได้ทุกวัน
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-diamond-800 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-diamond-700 transition-all hover:shadow-lg"
              >
                เลือกชมสินค้า
              </Link>
              <Link
                to="/products"
                className="border border-diamond-300 text-diamond-700 px-8 py-3 rounded-full text-sm font-medium hover:border-rose-gold hover:text-rose-gold transition-all"
              >
                ดูแคตตาล็อก
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-rose-gold text-sm tracking-[0.2em] uppercase mb-2">Our Promise</p>
            <h2 className="text-2xl md:text-3xl font-light text-diamond-800">ทำไมต้อง DiamondEternal</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '&#9830;',
                title: 'คุณภาพระดับโลก',
                desc: 'เพชรสังเคราะห์ที่ผ่านการรับรองคุณภาพ ประกายเทียบเท่าเพชรแท้',
              },
              {
                icon: '&#9825;',
                title: 'ราคาจับต้องได้',
                desc: 'สวยได้ในราคาที่คุ้มค่า ถูกกว่าเพชรแท้ 70-80%',
              },
              {
                icon: '&#9734;',
                title: 'เป็นมิตรต่อโลก',
                desc: 'ผลิตด้วยเทคโนโลยีทันสมัย ไม่ทำลายสิ่งแวดล้อม 100%',
              },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-white border border-diamond-100 hover:shadow-md transition-shadow">
                <div className="text-4xl text-rose-gold mb-4" dangerouslySetInnerHTML={{ __html: item.icon }} />
                <h3 className="text-lg font-medium text-diamond-800 mb-2">{item.title}</h3>
                <p className="text-sm text-diamond-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-rose-gold text-sm tracking-[0.2em] uppercase mb-2">Featured</p>
              <h2 className="text-2xl md:text-3xl font-light text-diamond-800">สินค้ายอดนิยม</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="group rounded-2xl overflow-hidden border border-diamond-100 bg-diamond-50 hover:shadow-lg transition-all"
                >
                  <div className="aspect-square bg-gradient-to-br from-diamond-100 to-primary-50 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden items-center justify-center text-6xl text-diamond-300">&#9830;</div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-rose-gold tracking-wider uppercase mb-1">{product.category}</p>
                    <h3 className="font-medium text-diamond-800 mb-2">{product.name}</h3>
                    <p className="text-lg font-semibold text-diamond-900">
                      &#3647;{product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/products"
                className="inline-block border border-diamond-300 text-diamond-700 px-8 py-3 rounded-full text-sm font-medium hover:border-rose-gold hover:text-rose-gold transition-all"
              >
                ดูสินค้าทั้งหมด
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
