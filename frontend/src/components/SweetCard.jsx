import { useState } from "react";
import SweetEditModal from "./SweetEditModal";

export default function SweetCard({ sweet, onBuy, onDelete, onUpdated, isAdmin }) {
  const [editing, setEditing] = useState(false);
  const [buying, setBuying] = useState(false);

  const outOfStock = sweet.quantity === 0;

  const handleBuy = async () => {
    try {
      setBuying(true);
      await onBuy(sweet._id);
    } finally {
      setBuying(false);
    }
  };

  return (
    <>
      <div className="group bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
        
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {sweet.name}
          </h3>
          <p className="text-sm text-gray-500">
            {sweet.category}
          </p>
        </div>

        <div className="mb-2">
          <span className="text-xl font-bold text-gray-900">
            ₹{sweet.price}
          </span>
        </div>

        <div className="mb-4">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              outOfStock
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {outOfStock ? "Out of Stock" : `${sweet.quantity} in stock`}
          </span>
        </div>

        <div className="mt-auto flex gap-2">
          <button
            type="button"   
            disabled={outOfStock || buying}
            onClick={handleBuy}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              outOfStock
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : buying
                ? "bg-indigo-400 text-white cursor-wait"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {buying ? "Processing..." : "Purchase"}
          </button>

          {isAdmin && (
            <>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="px-3 py-2 text-sm font-medium rounded-lg text-indigo-600 border border-indigo-200 hover:bg-indigo-50 transition hover:cursor-pointer"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(sweet._id)}
                className="px-3 py-2 text-sm font-medium rounded-lg text-red-600 border border-red-200 hover:bg-red-50 transition hover:cursor-pointer"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {editing && (
        <SweetEditModal
          sweet={sweet}
          onClose={() => setEditing(false)}
          onUpdated={onUpdated}
        />
      )}
    </>
  );
}
