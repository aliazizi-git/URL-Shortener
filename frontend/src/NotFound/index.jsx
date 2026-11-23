import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-500 mb-6">
        <span>HTTP 404</span>
      </div>
      <h1 className="text-6xl sm:text-8xl font-black text-zinc-100 tracking-tighter">
        4<span className="text-emerald-400">0</span>4
      </h1>
      <h2 className="text-xl font-semibold text-zinc-300 mt-3">Route not found</h2>
      <p className="text-zinc-500 text-xs sm:text-sm mt-2 max-w-sm font-mono">
        The destination you are attempting to reach does not exist or was purged from our records.
      </p>
      <Link
        to="/"
        className="mt-8 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-mono rounded-lg transition"
      >
        ← return home
      </Link>
    </div>
  );
}
