import React, { useState } from "react";
import notify from "../../../Utils/notify";
import api from "../../Services/api";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const trimmed = originalUrl.trim();
      const formattedUrl =
        trimmed.startsWith("http://") || trimmed.startsWith("https://")
          ? trimmed
          : `https://${trimmed}`;

      const payload = { originalUrl: formattedUrl };
      if (shortCode && shortCode.trim()) {
        payload.shortCode = shortCode.trim();
      }

      const res = await api.post("url-shortener", payload);
      setResult(res.data.data.url);
      notify("success", "URL shortened successfully!");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to shorten URL";
      notify("error", message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    notify("success", "Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>instant redirection engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-100 leading-tight">
          Short links. <span className="text-zinc-500">Zero friction.</span>
        </h1>
        <p className="mt-4 text-zinc-400 text-sm sm:text-base max-w-md">
          Generate clean, memorable aliases for long URLs with live click analytics and instant edge routing.
        </p>

        <form onSubmit={handleSubmit} className="w-full mt-10">
          <div className="p-2 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-2xl backdrop-blur-sm flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center px-3.5 py-1.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 focus-within:border-zinc-700 transition">
              <span className="text-zinc-500 text-xs font-mono select-none mr-2">https://</span>
              <input
                type="text"
                required
                onChange={(e) => setOriginalUrl(e.target.value)}
                value={originalUrl}
                placeholder="example.com/very/long/destination/url"
                className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none font-mono"
              />
            </div>

            <div className="sm:w-44 flex items-center px-3.5 py-1.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 focus-within:border-zinc-700 transition">
              <span className="text-zinc-600 text-xs font-mono select-none mr-1">/</span>
              <input
                type="text"
                onChange={(e) => setShortCode(e.target.value)}
                value={shortCode}
                placeholder="custom-slug"
                className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-zinc-950 text-sm font-semibold tracking-tight transition cursor-pointer shrink-0"
            >
              {loading ? "Shortening..." : "Shorten"}
            </button>
          </div>
        </form>

        {result && (
          <div className="w-full mt-6 p-4 rounded-xl bg-zinc-900/80 border border-emerald-500/30 flex items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 overflow-hidden text-left">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-sm font-mono text-emerald-300 truncate select-all">{result}</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-medium text-zinc-200 transition shrink-0 cursor-pointer"
            >
              {copied ? "Copied ✓" : "Copy Link"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
