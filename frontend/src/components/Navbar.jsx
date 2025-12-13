import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ isAdmin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLink =
    "relative text-sm font-medium px-2 py-1 transition-colors duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <div
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer select-none text-xl font-bold text-gray-900"
        >
          Sweets<span className="text-indigo-600">N</span>Sweets
        </div>

        <div className="flex items-center gap-6">
          
          <Link
            to="/dashboard"
            className={`${navLink} ${
              isActive("/dashboard")
                ? "text-indigo-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Dashboard
            {isActive("/dashboard") && (
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-indigo-600 rounded-full" />
            )}
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-all ${
                isActive("/admin")
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              Admin
            </Link>
          )}

          <button
            onClick={logout}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
