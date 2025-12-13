import { useState } from "react";
import api from "../api/api";

export default function SweetEditModal({ sweet, onClose, onUpdated }) {
  const [form, setForm] = useState({
    name: sweet.name,
    category: sweet.category,
    price: sweet.price,
    quantity: sweet.quantity,
    description: sweet.description || ""
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/sweets/${sweet._id}`, {
        name: form.name.trim(),
        category: form.category.trim(),
        price: Number(form.price),
        quantity: Number(form.quantity),
        description: form.description
      });

      onUpdated(); 
      onClose();  
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Update Sweet
          </h2>
          <p className="text-sm text-gray-500">
            Modify sweet details and save changes
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sweet Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              min="0"
              className="px-3 py-2 border rounded-lg"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
            <input
              type="number"
              min="0"
              className="px-3 py-2 border rounded-lg"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Update Sweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
