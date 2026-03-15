"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Plus, Edit, Trash2, Package, Search, Filter, TrendingUp, Users, DollarSign } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2">Digicy Admin</h1>
          <p className="text-gray-500">Kelola produk dan statistik Digicy Store lo di sini bray.</p>
        </div>
        <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-blue-100">
          <Plus size={20} />
          Tambah Produk
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
           <div className="w-12 h-12 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-6">
              <Package size={24} />
           </div>
           <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Products</p>
           <h3 className="text-3xl font-black">{products.length}</h3>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
           <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6">
              <DollarSign size={24} />
           </div>
           <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Sales</p>
           <h3 className="text-3xl font-black">Rp 12,500,000</h3>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
           <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-6">
              <Users size={24} />
           </div>
           <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Active Customers</p>
           <h3 className="text-3xl font-black">1,242</h3>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">Produk Terdaftar</h2>
          <div className="flex gap-4">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Cari produk..." className="pl-12 pr-6 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all w-64 border border-gray-50" />
             </div>
          </div>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-50 rounded-2xl"></div>)}
          </div>
        ) : products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  <th className="pb-6">Produk</th>
                  <th className="pb-6">Harga</th>
                  <th className="pb-6">Status</th>
                  <th className="pb-6 pr-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden shrink-0">
                          {product.image && <img src={product.image} alt={product.name} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <p className="font-bold text-lg">{product.name}</p>
                          <p className="text-sm text-gray-400 truncate max-w-xs">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6">
                      <span className="font-black">Rp {product.price.toLocaleString()}</span>
                    </td>
                    <td className="py-6">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">Active</span>
                    </td>
                    <td className="py-6 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-3 bg-gray-100 rounded-xl hover:bg-black hover:text-white transition-all">
                          <Edit size={18} />
                        </button>
                        <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-bold text-gray-400">Belum ada produk untuk dikelola.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
