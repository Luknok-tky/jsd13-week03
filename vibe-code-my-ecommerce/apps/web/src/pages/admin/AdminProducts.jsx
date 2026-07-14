import { useState, useEffect } from 'react';
import { adminAPI, productAPI } from '../../api/axios';

const emptyProduct = {
  name: '',
  category: 'แหวน',
  price: '',
  image: '',
  diamondDetail: { carat: '', color: '' },
  options: { colors: [''], sizes: [''] },
  stock: '',
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProduct);

  const loadProducts = () => {
    setLoading(true);
    productAPI.getAll().then((res) => setProducts(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { loadProducts(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('diamondDetail.')) {
      const key = name.split('.')[1];
      setForm((f) => ({ ...f, diamondDetail: { ...f.diamondDetail, [key]: value } }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleColorsChange = (idx, value) => {
    const colors = [...form.options.colors];
    colors[idx] = value;
    setForm((f) => ({ ...f, options: { ...f.options, colors } }));
  };

  const handleSizesChange = (idx, value) => {
    const sizes = [...form.options.sizes];
    sizes[idx] = value;
    setForm((f) => ({ ...f, options: { ...f.options, sizes } }));
  };

  const addColorField = () => setForm((f) => ({ ...f, options: { ...f.options, colors: [...f.options.colors, ''] } }));
  const addSizeField = () => setForm((f) => ({ ...f, options: { ...f.options, sizes: [...f.options.sizes, ''] } }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      options: {
        colors: form.options.colors.filter(Boolean),
        sizes: form.options.sizes.filter(Boolean).map(Number),
      },
    };

    try {
      if (editingId) {
        await adminAPI.updateProduct(editingId, data);
      } else {
        await adminAPI.createProduct(data);
      }
      setShowForm(false);
      setEditingId(null);
      setForm(emptyProduct);
      loadProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'เกิดข้อผิดพลาด');
    }
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      category: p.category,
      price: p.price,
      image: p.image,
      diamondDetail: p.diamondDetail || { carat: '', color: '' },
      options: {
        colors: p.options?.colors?.length ? p.options.colors : [''],
        sizes: p.options?.sizes?.length ? p.options.sizes.map(String) : [''],
      },
      stock: p.stock,
    });
    setEditingId(p._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('ต้องการลบสินค้านี้?')) return;
    try {
      await adminAPI.deleteProduct(id);
      loadProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'ลบไม่สำเร็จ');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light text-diamond-800">จัดการสินค้า</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyProduct); }}
          className="bg-diamond-800 text-white px-5 py-2 rounded-full text-sm hover:bg-diamond-700 transition-colors"
        >
          {showForm ? 'ยกเลิก' : '+ เพิ่มสินค้า'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-diamond-100 p-6 mb-8">
          <h2 className="text-sm font-medium text-diamond-700 mb-4">{editingId ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-diamond-500 mb-1">ชื่อสินค้า</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full border border-diamond-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-gold" />
            </div>
            <div>
              <label className="block text-xs text-diamond-500 mb-1">หมวดหมู่</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full border border-diamond-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-gold">
                {['แหวน', 'ต่างหู', 'สร้อยข้อมือ', 'สร้อยคอ'].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-diamond-500 mb-1">ราคา (บาท)</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} required className="w-full border border-diamond-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-gold" />
            </div>
            <div>
              <label className="block text-xs text-diamond-500 mb-1">สต็อก</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} required className="w-full border border-diamond-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-gold" />
            </div>
            <div>
              <label className="block text-xs text-diamond-500 mb-1">น้ำหนักเพชร</label>
              <input name="diamondDetail.carat" value={form.diamondDetail.carat} onChange={handleChange} className="w-full border border-diamond-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-gold" />
            </div>
            <div>
              <label className="block text-xs text-diamond-500 mb-1">สีเพชร</label>
              <input name="diamondDetail.color" value={form.diamondDetail.color} onChange={handleChange} className="w-full border border-diamond-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-gold" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-diamond-500 mb-1">URL รูปภาพ</label>
              <input name="image" value={form.image} onChange={handleChange} className="w-full border border-diamond-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-gold" />
            </div>
            <div>
              <label className="block text-xs text-diamond-500 mb-1">สีตัวเรือน (คั่นด้วย comma)</label>
              {form.options.colors.map((c, i) => (
                <input key={i} value={c} onChange={(e) => handleColorsChange(i, e.target.value)} placeholder="เช่น สีทองขาว" className="w-full border border-diamond-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-rose-gold" />
              ))}
              <button type="button" onClick={addColorField} className="text-xs text-rose-gold hover:underline">+ เพิ่มสี</button>
            </div>
            <div>
              <label className="block text-xs text-diamond-500 mb-1">ไซส์ (ตัวเลข)</label>
              {form.options.sizes.map((s, i) => (
                <input key={i} value={s} onChange={(e) => handleSizesChange(i, e.target.value)} placeholder="เช่น 48" className="w-full border border-diamond-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-rose-gold" />
              ))}
              <button type="button" onClick={addSizeField} className="text-xs text-rose-gold hover:underline">+ เพิ่มไซส์</button>
            </div>
          </div>
          <button type="submit" className="mt-4 bg-diamond-800 text-white px-6 py-2 rounded-full text-sm hover:bg-diamond-700 transition-colors">
            {editingId ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-diamond-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-diamond-100 bg-diamond-50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-diamond-500">สินค้า</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-diamond-500">หมวดหมู่</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-diamond-500">ราคา</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-diamond-500">สต็อก</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-diamond-500">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b border-diamond-50 hover:bg-diamond-50/50">
                    <td className="px-4 py-3 font-medium text-diamond-800">{p.name}</td>
                    <td className="px-4 py-3 text-diamond-500">{p.category}</td>
                    <td className="px-4 py-3 text-right text-diamond-700">&#3647;{p.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${p.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button onClick={() => handleEdit(p)} className="text-rose-gold hover:underline text-xs">แก้ไข</button>
                      <button onClick={() => handleDelete(p._id)} className="text-red-400 hover:underline text-xs">ลบ</button>
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
