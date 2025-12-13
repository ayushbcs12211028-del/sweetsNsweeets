import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import SweetCard from "../components/SweetCard";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const isAdmin = localStorage.getItem("role") === "admin";

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/sweets/search", {
        params: { name: search }
      });
      setSweets(res.data.sweets);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, [search]);

  const purchaseSweet = async (id) => {
    await api.post(`/sweets/${id}/purchase`, { quantity: 1 });
    fetchSweets();
  };

  const deleteSweet = async (id) => {
    if (!window.confirm("Delete this sweet?")) return;
    await api.delete(`/sweets/${id}`);
    fetchSweets();
  };

  return (
    <>
      <Navbar isAdmin={isAdmin} />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Available Sweets
            </h1>
            <p className="text-sm text-gray-500">
              Browse and purchase your favorite sweets
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <input
              className="w-full px-4 py-2 rounded-lg border"
              placeholder="Search sweets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Loading sweets...
          </div>
        ) : sweets.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No sweets found 🍬
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                onBuy={purchaseSweet}
                onDelete={deleteSweet}
                onUpdated={fetchSweets} 
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
