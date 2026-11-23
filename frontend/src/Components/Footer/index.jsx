import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
          <span>systems operational</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-600">
          <span>{new Date().getFullYear()} © snip</span>
          <span>·</span>
          <span className="text-zinc-500">crafted by Ali</span>
        </div>
      </div>
    </footer>
  );
}
