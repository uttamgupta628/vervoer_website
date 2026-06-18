import  { useEffect, useRef, useState } from "react";
import {
  Shield,
  Calendar,
  CreditCard,
  Navigation,
  Star,
  ChevronRight,
  CheckCircle,
  Car,
  Zap,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import pakring from "../assets/parking.png";

// ─── Animation Styles ────────────────────────────────────────────────────────

const styles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-60px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(60px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(245,158,11,0.45); }
    70%  { box-shadow: 0 0 0 14px rgba(245,158,11,0); }
    100% { box-shadow: 0 0 0 0 rgba(245,158,11,0); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .anim-fade-up     { animation: fadeUp 0.7s ease forwards; }
  .anim-fade-in     { animation: fadeIn 0.7s ease forwards; }
  .anim-slide-right { animation: slideRight 0.7s ease forwards; }
  .anim-slide-left  { animation: slideLeft 0.7s ease forwards; }
  .anim-scale-in    { animation: scaleIn 0.6s ease forwards; }
  .anim-float       { animation: float 3.5s ease-in-out infinite; }
  .anim-pulse       { animation: pulse-ring 2.2s ease-out infinite; }
  .hidden-init      { opacity: 0; }
`;

// ─── useInView Hook ───────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: <Shield size={28} />,
    title: "Secure Parking",
    desc: "24/7 monitored facilities keeping your fleet and vehicles completely safe.",
  },
  {
    icon: <Calendar size={28} />,
    title: "Easy Reservations",
    desc: "Book your spot instantly through our integrated digital platform.",
  },
  {
    icon: <CreditCard size={28} />,
    title: "Seamless Payments",
    desc: "Multiple secure payment options with instant confirmation receipts.",
  },
  {
    icon: <Navigation size={28} />,
    title: "Smart Navigation",
    desc: "Real-time directions guide you directly to your reserved spot.",
  },
];

const stats = [
  { value: "500+", label: "Parking Locations" },
  { value: "50K+", label: "Happy Drivers" },
  { value: "99%",  label: "Uptime Guarantee" },
  { value: "24/7", label: "Live Support" },
];

const benefits = [
  "Real-time availability updates",
  "Flexible hourly & monthly plans",
  "EV charging station support",
  "Business fleet management",
  "Dedicated customer support",
  "Instant booking confirmation",
];

// const plans = [
//   {
//     name: "Hourly",
//     price: "$2",
//     period: "/hr",
//     desc: "Perfect for short visits.",
//     features: ["Any available spot", "Pay as you go", "E-receipt"],
//     highlighted: false,
//   },
//   {
//     name: "Monthly",
//     price: "$49",
//     period: "/mo",
//     desc: "Best for daily commuters.",
//     features: ["Reserved spot", "Priority access", "24/7 support", "Free cancellation"],
//     highlighted: true,
//     badge: "Best Value",
//   },
//   {
//     name: "Business",
//     price: "Custom",
//     desc: "For fleets & enterprises.",
//     features: ["Fleet dashboard", "Bulk booking", "Custom reports", "Dedicated manager"],
//     highlighted: false,
//   },
// ];

// ─── Service Card ─────────────────────────────────────────────────────────────

const ServiceCard = ({ s, delay = 0 }: { s: typeof services[0]; delay?: number }) => {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`hidden-init ${inView ? "anim-fade-up" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`bg-white rounded-3xl p-8 flex flex-col items-center text-center
        border-2 transition-all duration-400 cursor-default
        ${hovered
          ? "border-amber-400 shadow-2xl shadow-amber-100 -translate-y-3"
          : "border-gray-100 shadow-md"}`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
          ${hovered ? "bg-amber-500 text-white scale-110 anim-pulse" : "bg-amber-100 text-amber-500"}`}>
          {s.icon}
        </div>
        <h3 className={`mt-5 font-bold text-xl transition-colors duration-300 ${hovered ? "text-amber-600" : "text-gray-900"}`}>
          {s.title}
        </h3>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">{s.desc}</p>
        <button className={`mt-5 flex items-center gap-1 text-sm font-semibold transition-all duration-300
          ${hovered ? "text-amber-500 gap-2" : "text-gray-400"}`}>
          Learn more <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ParkingServices() {
  const heroRef    = useInView(0.1);
  const aboutRef   = useInView();
  const statsRef   = useInView();
  const benefitRef = useInView();
  const ctaRef     = useInView();

  return (
    <div className="font-sans text-gray-900 bg-white antialiased">
      <style>{styles}</style>

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="pt-10 pb-0 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <div
            ref={heroRef.ref}
            className="relative rounded-3xl bg-amber-500 overflow-hidden min-h-[320px] sm:min-h-[360px] flex items-center"
          >
            {/* Left text */}
            <div className={`relative z-10 p-8 sm:p-12 max-w-md hidden-init ${heroRef.inView ? "anim-slide-right" : ""}`}>
              <p className="text-xs font-bold tracking-[0.25em]  uppercase text-black">
                The Vervoer Parking Team
              </p>
              <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-black leading-tight">
                We make it easy.
              </h1>
              <p className="mt-4 text-black text-sm leading-relaxed max-w-xs">
                Teamwork makes the dream work. At Vervoer Parking,
                we're here to help your parking experience be as smooth
                and seamless as possible.
              </p>
              <div className="mt-6 flex gap-3 flex-wrap">
                <button className="px-6 py-3 bg-white text-amber-600 font-bold rounded-2xl
                  hover:scale-105 hover:shadow-lg transition-all duration-200 text-sm">
                  Get Started
                </button>
                <button className="px-6 py-3 border-2 border-white/50 text-white font-semibold rounded-2xl
                  hover:bg-white/10 hover:scale-105 transition-all duration-200 text-sm flex items-center gap-2">
                  Learn More <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Right image */}
            <div
              className={`absolute right-0 top-0 bottom-0 w-1/2 hidden sm:block hidden-init ${heroRef.inView ? "anim-slide-left" : ""}`}
              style={{ animationDelay: "200ms" }}
            >
              {/* Gradient overlay blending image into amber */}
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-500 via-amber-500/40 to-transparent" />
              <img
                src={pakring}
                alt="Parking facility"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative circles */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -top-6 right-1/3 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── About / Partnering ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div
            ref={aboutRef.ref}
            className={`hidden-init ${aboutRef.inView ? "anim-fade-up" : ""}`}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Partnering Parking Services
            </h2>
            <p className="mt-5 text-gray-500 leading-relaxed text-base sm:text-lg">
              Partnering Parking Services provides reliable parking management solutions
              with real-time availability, easy reservations, secure payments, and dedicated
              support. Designed to improve convenience, efficiency, and seamless mobility
              for individuals, businesses, and communities.
            </p>
            <div className="mt-6 flex justify-center gap-3 flex-wrap">
              <span className="px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-sm font-semibold border border-amber-200">
                🏙 Urban Parking
              </span>
              <span className="px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-sm font-semibold border border-amber-200">
                ⚡ EV Charging
              </span>
              <span className="px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-sm font-semibold border border-amber-200">
                🏢 Business Fleets
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Grid ──────────────────────────────────────────────── */}
      <section className="py-10 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Banner ───────────────────────────────────────────────── */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-7xl mx-auto px-5">
          <div
            ref={statsRef.ref}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{ animationDelay: `${i * 100}ms` }}
                className={`text-center hidden-init ${statsRef.inView ? "anim-fade-up" : ""}`}
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-white">{s.value}</div>
                <div className="mt-1 text-white/75 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose + Image ─────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div
            ref={benefitRef.ref}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left: Image */}
            <div className={`hidden-init ${benefitRef.inView ? "anim-slide-right" : ""}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src={pakring}
                  alt="Vervoer parking facility"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Floating badge */}
                <div className="absolute bottom-5 left-5 bg-white rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white">
                    <Star size={18} className="fill-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Top Rated Service</div>
                    <div className="text-xs text-gray-500">4.9 / 5.0 · 12,000+ reviews</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Benefits */}
            <div
              className={`hidden-init ${benefitRef.inView ? "anim-slide-left" : ""}`}
              style={{ animationDelay: "150ms" }}
            >
              <p className="text-xs font-bold tracking-[0.25em] text-amber-500 uppercase">
                Why Choose Vervoer?
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                Parking that works{" "}
                <span style={{
                  background: "linear-gradient(90deg,#f59e0b,#ef4444,#f59e0b)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 3s linear infinite",
                }}>
                  for you
                </span>
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed">
                We combine cutting-edge technology with a human touch to deliver
                a parking experience you can rely on — every single time.
              </p>

              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((b, i) => (
                  <li
                    key={b}
                    style={{ animationDelay: `${200 + i * 80}ms` }}
                    className={`flex items-center gap-3 hidden-init ${benefitRef.inView ? "anim-fade-up" : ""}`}
                  >
                    <CheckCircle size={20} className="text-amber-500 shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{b}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-8 px-7 py-3.5 bg-amber-500 text-white font-bold rounded-2xl
                hover:bg-amber-600 hover:scale-105 hover:shadow-lg hover:shadow-amber-200
                transition-all duration-200 flex items-center gap-2">
                Explore All Features <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      

      {/* ── CTA Banner ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <div
            ref={ctaRef.ref}
            className={`relative rounded-3xl bg-amber-500 p-10 sm:p-16 text-center overflow-hidden
              hidden-init ${ctaRef.inView ? "anim-scale-in" : ""}`}
          >
            {/* Decorative blobs */}
            <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />

            <div className="relative z-10">
              <p className="text-black text-xs font-bold tracking-[0.25em] uppercase">
                Ready to Park Smarter?
              </p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-black leading-tight">
                Find your spot in seconds.
              </h2>
              <p className="mt-4 text-black max-w-xl mx-auto">
                Join over 50,000 drivers who trust Vervoer for stress-free parking every day.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-amber-600 font-bold rounded-2xl
                  hover:scale-105 hover:shadow-xl transition-all duration-200 flex items-center gap-2 justify-center">
                  <Car size={20} /> Book a Spot Now
                </button>
                <button className="px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-2xl
                  hover:bg-white/10 hover:scale-105 transition-all duration-200 flex items-center gap-2 justify-center">
                  <Zap size={20} /> Download the App
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}