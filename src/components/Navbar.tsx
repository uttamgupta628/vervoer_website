import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e">
    <path d="M3 20.5v-17l18 8.5-18 8.5z" />
  </svg>
);

const AppleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#3b82f6">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const downloadOptions = [
  {
    label: "Google Play",
    sub: "Android",
    href: "https://play.google.com/store/apps/details?id=com.uttam.verover",
    bg: "bg-green-50",
    Icon: PlayIcon,
  },
  {
    label: "App Store",
    sub: "iOS",
    href: "#",
    bg: "bg-blue-50",
    Icon: AppleIcon,
  },
];

function DownloadDropdown({
  mobile = false,
  onClose,
}: {
  mobile?: boolean;
  onClose?: () => void;
}) {
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
          className="w-full text-left text-white font-semibold border-b border-amber-400/50 pb-3 flex justify-between items-center text-sm uppercase tracking-widest"
        >
          Download
          <ChevronRight
            size={14}
            className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          />
        </button>
        {open && (
          <div className="mt-2 ml-3 flex flex-col gap-1">
            {downloadOptions.map((opt) => (
              <a
                key={opt.label}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setOpen(false);
                  onClose?.();
                }}
                className="flex items-center gap-3 text-white/90 text-sm py-2 hover:text-white transition-colors"
              >
                <div className={`w-7 h-7 rounded-lg ${opt.bg} flex items-center justify-center`}>
                  <opt.Icon />
                </div>
                <div>
                  <div className="font-semibold text-xs">{opt.label}</div>
                  <div className="text-white/50 text-[10px]">{opt.sub}</div>
                </div>
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
        className="relative font-semibold uppercase text-sm tracking-widest text-white hover:text-white/80
          transition-all duration-300 group flex items-center gap-1.5"
      >
        Download
        <ChevronRight
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
        <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-white rounded-full transition-all duration-300 group-hover:w-full" />
      </button>

      {open && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white rounded-2xl
            shadow-xl shadow-amber-100/60 border border-amber-100 overflow-hidden w-52 z-[999]"
        >
          {downloadOptions.map((opt, i) => (
            <a
              key={opt.label}
              href={opt.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-800
                hover:bg-amber-50 transition-colors duration-150
                ${i < downloadOptions.length - 1 ? "border-b border-amber-50" : ""}`}
            >
              <div className={`w-8 h-8 rounded-lg ${opt.bg} flex items-center justify-center shrink-0`}>
                <opt.Icon />
              </div>
              <div>
                <div className="text-gray-900 text-sm">{opt.label}</div>
                <div className="text-gray-400 text-[11px] font-normal">{opt.sub}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

const navLinks = [
  { label: "Home",     href: "/",                 internal: true,  dropdown: false },
  { label: "Parking",  href: "/parking-services", internal: true,  dropdown: false },
  { label: "Laundry",  href: "/laundry-services", internal: true,  dropdown: false },
  { label: "Download", href: "#",                 internal: false, dropdown: true  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;
  const isContactActive = location.pathname === "/contact";

  return (
    <nav
      className={`sticky top-0 z-50 py-5 transition-all duration-300
        ${scrolled
          ? "bg-[#0d0d1a]/90 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
          : "bg-transparent"}`}
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* ── Desktop ── */}
        <div
          className="hidden md:flex items-stretch rounded-full border border-amber-500
            shadow-[0_0_0_1px_rgba(245,158,11,0.1),0_8px_32px_rgba(245,158,11,0.15)]"
        >
          {/* Logo */}
          <Link
            to="/"
            className="bg-white px-5 py-3 flex items-center gap-3 shrink-0 group
              hover:bg-amber-50 transition-colors duration-300 rounded-l-full overflow-hidden"
          >
            <img
              src={logo}
              alt="Vervoer"
              className="h-11 w-auto transition-transform duration-500 group-hover:scale-105"
            />
            <span className="font-bold text-xl tracking-[0.18em] text-black uppercase">
              ervoer
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex-1 bg-amber-500 px-8 flex items-center justify-center gap-9">
            {navLinks.map((link) => {
              if (link.dropdown) return <DownloadDropdown key={link.label} />;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`relative font-semibold uppercase text-sm tracking-widest
                    transition-all duration-200 group
                    ${isActive(link.href) ? "text-white" : "text-white/80 hover:text-white"}`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-[1.5px] bg-white rounded-full
                      transition-all duration-300
                      ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Contact */}
          <Link
            to="/contact"
            className={`flex items-center gap-2 px-7 font-bold text-sm uppercase tracking-widest
              transition-all duration-300 group shrink-0 rounded-r-full overflow-hidden
              ${isContactActive
                ? "bg-amber-500 text-black"
                : "bg-black text-white hover:bg-neutral-800"}`}
          >
            Contact
            <ChevronRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ── Mobile bar ── */}
        <div
          className="md:hidden bg-black rounded-2xl border border-amber-500 px-4 py-3
            flex items-center justify-between
            shadow-[0_0_20px_rgba(245,158,11,0.18)]"
        >
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Vervoer" className="h-9 w-auto" />
            <span className="text-white font-bold text-base uppercase tracking-widest">Vervoer</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full
                transition-colors duration-200
                ${isContactActive ? "bg-amber-400 text-black" : "bg-amber-500 text-black"}`}
            >
              Contact
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-1"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? "max-h-[28rem] mt-2 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="bg-amber-500 rounded-2xl p-5 flex flex-col gap-4">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <DownloadDropdown
                    key={link.label}
                    mobile
                    onClose={() => setMenuOpen(false)}
                  />
                );
              }
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-semibold text-sm uppercase tracking-widest
                    border-b border-amber-400/50 pb-3 transition-colors duration-200
                    ${isActive(link.href) ? "text-black" : "text-white"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </nav>
  );
}