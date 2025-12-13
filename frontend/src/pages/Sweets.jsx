export default function SweetCard({ sweet, onBuy, onDelete, isAdmin }) {
  const outOfStock = sweet.quantity === 0;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {sweet.name}
        </h3>

        <p className="text-sm text-gray-500 mt-0.5">
          {sweet.category}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ₹{sweet.price}
          </span>

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
      </div>

      {/* Actions */}
      <div className="mt-auto flex gap-2">
        <button
          disabled={outOfStock}
          onClick={() => onBuy(sweet._id)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            outOfStock
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Purchase
        </button>

        {isAdmin && (
          <button
            onClick={() => onDelete(sweet._id)}
            className="px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
