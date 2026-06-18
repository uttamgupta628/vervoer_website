import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const downloadOptions = [
  {
    label: "Google Play",
    href: "https://play.google.com/store/apps/details?id=com.uttam.verover",
    icon: "\u25B6",
  },
  {
    label: "App Store",
    href: "#",
    icon: "\uF8FF",
  },
];

function DownloadDropdown({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (mobile) {
    return (
      <div ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left text-white font-semibold border-b border-amber-400 pb-2 flex justify-between items-center"
        >
          Download the App
          <span className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}>{"›"}</span>
        </button>
        {open && (
          <div className="mt-2 ml-3 flex flex-col gap-2">
            {downloadOptions.map((opt) => (
              <a
                key={opt.label}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { setOpen(false); if (onClose) onClose(); }}
                className="flex items-center gap-2 text-white font-medium text-sm py-1 hover:text-black transition-colors"
              >
                <span>{opt.icon}</span>
                {opt.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative font-semibold uppercase text-sm text-white hover:text-black transition-all duration-300 group flex items-center gap-1"
      >
        Download the App
        <span className={`transition-transform duration-200 text-xs ${open ? "rotate-180" : ""}`}>{"▾"}</span>
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-xl shadow-amber-100 border border-amber-100 overflow-hidden w-48 z-50">
          {downloadOptions.map((opt) => (
            <a
              key={opt.label}
              href={opt.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-150"
            >
              <span className="text-base">{opt.icon}</span>
              {opt.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

const navLinks = [
  { label: "Home",             href: "/",                 internal: true,  dropdown: false },
  { label: "Parking Services", href: "/parking-services", internal: true,  dropdown: false },
  { label: "Laundry Services", href: "/laundry-services", internal: true,  dropdown: false },
  { label: "Download the App", href: "#",                 internal: false, dropdown: true  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;
  const isContactActive = location.pathname === "/contact";

  return (
    <nav className="sticky top-0 z-50 py-6">
      <div className="max-w-6xl mx-auto px-4">

        {/* Desktop */}
        <div className="hidden md:flex items-center rounded-full border border-amber-500 bg-transparent shadow-[0_0_25px_rgba(251,191,36,0.25)]">

          {/* Logo */}
          <Link
            to="/"
            className="bg-white px-5 py-3 flex items-center gap-3 rounded-l-full shrink-0 group cursor-pointer overflow-hidden"
          >
            <img
              src={logo}
              alt="Vervoer Logo"
              className="h-12 w-auto transition-all duration-500 group-hover:scale-105"
            />
            <span className="font-extrabold text-2xl tracking-[0.15em] text-black uppercase">
              ervoer
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex-1 bg-amber-500 px-8 py-5 flex justify-center gap-10 items-center">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return <DownloadDropdown key={link.label} />;
              }
              if (link.internal) {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`relative font-semibold uppercase text-sm transition-all duration-300 group
                      ${isActive(link.href) ? "text-black" : "text-white hover:text-black"}`}
                  >
                    {link.label}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300
                        ${isActive(link.href) ? "w-full bg-black" : "w-0 group-hover:w-full"}`}
                    />
                  </Link>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-white font-semibold uppercase text-sm transition-all duration-300 hover:text-black group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
          </div>

          {/* Contact */}
          <Link
            to="/contact"
            className={`px-8 py-5 flex items-center gap-1 font-bold text-sm uppercase tracking-wider
              transition-all duration-300 hover:scale-105 group rounded-r-full
              ${isContactActive
                ? "bg-amber-500 text-black"
                : "bg-black text-white hover:bg-neutral-800"}`}
          >
            Contact
            <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            <ChevronRight size={14} className="-ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile bar */}
        <div className="md:hidden bg-black rounded-2xl border border-amber-500 px-4 py-3 flex items-center justify-between shadow-[0_0_20px_rgba(251,191,36,0.2)]">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Vervoer Logo" className="h-10 w-auto" />
            <span className="text-white font-bold text-lg uppercase">Vervoer</span>
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            menuOpen ? "max-h-[32rem] mt-2" : "max-h-0"
          }`}
        >
          <div className="bg-amber-500 rounded-2xl p-4 flex flex-col gap-4">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return <DownloadDropdown key={link.label} mobile onClose={() => setMenuOpen(false)} />;
              }
              if (link.internal) {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-semibold border-b border-amber-400 pb-2 transition-colors duration-200
                      ${isActive(link.href) ? "text-black" : "text-white"}`}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white font-semibold border-b border-amber-400 pb-2"
                >
                  {link.label}
                </a>
              );
            })}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={`py-2 rounded-xl text-center uppercase font-bold transition-colors duration-200
                ${isContactActive ? "bg-amber-400 text-black" : "bg-black text-white"}`}
            >
              Contact
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
}