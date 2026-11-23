import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/Slices/authSlice";
import notify from "../../../Utils/notify";

export default function Navbar() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    notify("success", "Logged out successfully");
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/70 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/40 transition">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <span className="font-semibold tracking-tight text-zinc-100 text-lg">
            snip<span className="text-emerald-400">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {token ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 pl-3 pr-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {user?.username}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-medium px-3.5 py-1.5 rounded-md border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-950 hover:bg-rose-950/20 transition cursor-pointer"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="text-xs font-semibold px-4 py-2 rounded-md bg-emerald-400 hover:bg-emerald-300 text-zinc-950 transition cursor-pointer shadow-sm shadow-emerald-500/10"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
