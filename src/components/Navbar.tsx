import React from "react";
import { navItems } from "../data";

const LOGO_DATA_URL = "/images/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5" style={{ background: "rgba(255,251,242,0.9)", backdropFilter: "blur(8px)" }}>
      <div className="mx-auto flex max-w-screen-md items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2">
          {LOGO_DATA_URL && LOGO_DATA_URL !== "PASTE_DATA_URL_HERE" ? (
            <img src={LOGO_DATA_URL} alt="Logo" className="h-8 w-8 rounded-xl object-contain" />
          ) : (
            <div aria-hidden className="h-8 w-8 rounded-xl" style={{ background: "linear-gradient(135deg,#ab4e68,#c4a287)" }} />
          )}
          <span className="font-semibold tracking-tight">Artea Wright</span>
        </a>
        <nav className="hidden sm:flex items-center gap-5">
          {navItems.map((n) => (
            <a key={n.label} href={n.href} className="text-sm rounded focus:outline-none focus-visible:ring-2" style={{ color: "#7e1946", ['--tw-ring-color']: '#ab4e68' }}>
              {n.label}
            </a>
          ))}
          <a href="#contact" className="rounded-xl px-3 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2" style={{ backgroundColor: '#ab4e68' }}>
            Book Me
          </a>
          <a href="#download-resume" className="rounded-xl px-3 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2" style={{ backgroundColor: '#2b0818' }}>
            Hire Me
          </a>
        </nav>
        <button aria-label="Open navigation menu" className="sm:hidden rounded-xl p-2 hover:bg-gray-100 focus:outline-none focus-visible:ring-2" onClick={() => setMenuOpen((v) => !v)}>
          <span className="inline-block h-5 w-5">{menuOpen ? "✖️" : "☰"}</span>
        </button>
      </div>
      {menuOpen && (
        <div className="sm:hidden border-t border-black/5" style={{ backgroundColor: '#fffbf2' }}>
          <div className="mx-auto max-w-screen-md px-4 py-3 space-y-2">
            {navItems.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-2 py-2 text-sm hover:bg-gray-50" style={{ color: '#7e1946' }}>
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white" style={{ backgroundColor: '#ab4e68' }}>
              🎤 Book Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

