import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const navLinks = [
  { label: "Home",             href: "/",                 internal: true  },
  { label: "Parking Services", href: "/parking-services", internal: true  },
  { label: "Laundry Services", href: "/laundry-services", internal: true  },
  { label: "Download the App", href: "#download",         internal: false },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;
  const isContactActive = location.pathname === "/contact";

  return (
    <nav className="sticky top-0 z-50 py-6">
      <div className="max-w-6xl mx-auto px-4">

        {/* ── Desktop ──────────────────────────────────────────────────── */}
        <div className="hidden md:flex items-center overflow-hidden rounded-full border border-amber-500 bg-transparent shadow-[0_0_25px_rgba(251,191,36,0.25)]">

          {/* Logo */}
          <Link
            to="/"
            className="bg-white px-5 py-3 flex items-center gap-3 rounded-l-full shrink-0 group cursor-pointer"
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
          <div className="flex-1 bg-amber-500 px-8 py-5 flex justify-center gap-10">
            {navLinks.map((link) =>
              link.internal ? (
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
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-white font-semibold uppercase text-sm transition-all duration-300 hover:text-black group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              )
            )}
          </div>

          {/* Contact — now a proper Link */}
          <Link
            to="/contact"
            className={`px-8 py-5 flex items-center gap-1 font-bold text-sm uppercase tracking-wider
              transition-all duration-300 hover:scale-105 group
              ${isContactActive
                ? "bg-amber-500 text-black"
                : "bg-black text-white hover:bg-neutral-800"}`}
          >
            Contact
            <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            <ChevronRight size={14} className="-ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── Mobile bar ───────────────────────────────────────────────── */}
        <div className="md:hidden bg-black rounded-2xl border border-amber-500 px-4 py-3 flex items-center justify-between shadow-[0_0_20px_rgba(251,191,36,0.2)]">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Vervoer Logo" className="h-10 w-auto" />
            <span className="text-white font-bold text-lg uppercase">Vervoer</span>
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ── Mobile menu ──────────────────────────────────────────────── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            menuOpen ? "max-h-[28rem] mt-2" : "max-h-0"
          }`}
        >
          <div className="bg-amber-500 rounded-2xl p-4 flex flex-col gap-4">
            {navLinks.map((link) =>
              link.internal ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-semibold border-b border-amber-400 pb-2 transition-colors duration-200
                    ${isActive(link.href) ? "text-black" : "text-white"}`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white font-semibold border-b border-amber-400 pb-2"
                >
                  {link.label}
                </a>
              )
            )}
            {/* Contact link in mobile menu */}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={`py-2 rounded-xl text-center uppercase font-bold transition-colors duration-200
                ${isContactActive
                  ? "bg-amber-400 text-black"
                  : "bg-black text-white"}`}
            >
              Contact
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
}