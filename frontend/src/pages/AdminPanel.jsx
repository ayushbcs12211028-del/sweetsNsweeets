import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function AdminPanel() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/sweets", {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity)
    });
    alert("Sweet added successfully");
    setForm({ name: "", category: "", price: "", quantity: "" });
  };

  return (
    <>
      <Navbar isAdmin />

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-500">
            Add new sweets to the store inventory
          </p>
        </div>

        <div className="max-w-lg bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Add New Sweet
          </h2>

          <form onSubmit={submit} className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sweet Name
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition hover:cursor-pointer"
            >
              Add Sweet
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
