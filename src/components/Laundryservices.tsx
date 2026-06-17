import{ useEffect, useRef, useState } from "react";
import {
  Truck,
  Star,
  Clock,
  Calendar,
  ChevronRight,
  CheckCircle,
  Shirt,
  Sparkles,
  Phone,
  MapPin,
  Zap,
  Shield,
  Heart,
  Package,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// ─── Animation Styles ─────────────────────────────────────────────────────────

const styles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
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
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33%       { transform: translateY(-10px) rotate(1deg); }
    66%       { transform: translateY(-5px) rotate(-1deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(245,158,11,0.45); }
    70%  { box-shadow: 0 0 0 14px rgba(245,158,11,0); }
    100% { box-shadow: 0 0 0 0 rgba(245,158,11,0); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes bounce-x {
    0%, 100% { transform: translateX(0); }
    50%       { transform: translateX(6px); }
  }
  .anim-fade-up     { animation: fadeUp 0.7s ease forwards; }
  .anim-slide-right { animation: slideRight 0.7s ease forwards; }
  .anim-slide-left  { animation: slideLeft 0.7s ease forwards; }
  .anim-scale-in    { animation: scaleIn 0.6s ease forwards; }
  .anim-float       { animation: float 4s ease-in-out infinite; }
  .anim-pulse       { animation: pulse-ring 2.2s ease-out infinite; }
  .anim-spin-slow   { animation: spin-slow 8s linear infinite; }
  .anim-bounce-x    { animation: bounce-x 1.2s ease-in-out infinite; }
  .hidden-init      { opacity: 0; }
`;

// ─── useInView ────────────────────────────────────────────────────────────────

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
    icon: <Truck size={28} />,
    title: "Pickup & Delivery",
    desc: "Convenient door-to-door laundry pickup and delivery service, saving you valuable time and effort.",
    color: "from-blue-50 to-blue-100",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100 group-hover:bg-blue-500",
  },
  {
    icon: <Shirt size={28} />,
    title: "Premium Garment Care",
    desc: "Book your spot instantly through our integrated digital platform for expert garment treatment.",
    color: "from-purple-50 to-purple-100",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-100 group-hover:bg-purple-500",
  },
  {
    icon: <Clock size={28} />,
    title: "Fast Turnaround",
    desc: "Same-day and express laundry options available to fit your busy schedule.",
    color: "from-amber-50 to-amber-100",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100 group-hover:bg-amber-500",
  },
  {
    icon: <Calendar size={28} />,
    title: "Easy Scheduling",
    desc: "Book, manage, and track your laundry service directly through our mobile app.",
    color: "from-green-50 to-green-100",
    iconColor: "text-green-500",
    iconBg: "bg-green-100 group-hover:bg-green-500",
  },
  {
    icon: <Shield size={28} />,
    title: "Safe & Hygienic",
    desc: "All garments handled with care using eco-friendly and hygienic cleaning solutions.",
    color: "from-rose-50 to-rose-100",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-100 group-hover:bg-rose-500",
  },
  {
    icon: <Package size={28} />,
    title: "Neat Packaging",
    desc: "Clothes returned freshly folded, ironed, and neatly packaged for easy storage.",
    color: "from-teal-50 to-teal-100",
    iconColor: "text-teal-500",
    iconBg: "bg-teal-100 group-hover:bg-teal-500",
  },
];

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "48hr", label: "Max Turnaround" },
  { value: "100%", label: "Eco-Friendly" },
  { value: "24/7", label: "Support" },
];

const benefits = [
  "Free pickup & delivery on first order",
  "Eco-friendly detergents & processes",
  "Real-time order tracking",
  "Same-day express service",
  "Dedicated garment specialists",
  "Satisfaction guarantee",
];

const process = [
  { icon: <Phone size={20} />,   step: "01", title: "Book",    desc: "Schedule via app or call" },
  { icon: <Truck size={20} />,   step: "02", title: "Pickup",  desc: "We collect from your door" },
  { icon: <Sparkles size={20} />,step: "03", title: "Clean",   desc: "Expert care & treatment" },
  { icon: <Heart size={20} />,   step: "04", title: "Deliver", desc: "Fresh clothes returned" },
];

// const plans = [
//   {
//     name: "Basic Wash",
//     price: "$12",
//     period: "/kg",
//     desc: "Everyday laundry essentials.",
//     features: ["Wash & fold", "48hr turnaround", "Standard packaging"],
//     highlighted: false,
//   },
//   {
//     name: "Premium",
//     price: "$24",
//     period: "/kg",
//     desc: "Full-service garment care.",
//     features: ["Wash, iron & fold", "24hr turnaround", "Premium packaging", "Free pickup & delivery"],
//     highlighted: true,
//     badge: "Most Popular",
//   },
//   {
//     name: "Express",
//     price: "$38",
//     period: "/kg",
//     desc: "Same-day urgent service.",
//     features: ["Same-day return", "Priority handling", "Premium packaging", "Dedicated agent"],
//     highlighted: false,
//   },
// ];

// ─── Service Card ──────────────────────────────────────────────────────────────

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
      <div className={`group bg-white rounded-3xl p-8 flex flex-col items-center text-center
        border-2 transition-all duration-400 cursor-default h-full
        ${hovered ? "border-amber-400 shadow-2xl shadow-amber-100 -translate-y-3" : "border-gray-100 shadow-md"}`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center
          transition-all duration-300 text-white
          ${hovered ? `${s.iconBg} scale-110 anim-pulse` : `${s.iconBg} ${s.iconColor}`}`}
        >
          {s.icon}
        </div>
        <h3 className={`mt-5 font-bold text-xl transition-colors duration-300
          ${hovered ? "text-amber-600" : "text-gray-900"}`}>
          {s.title}
        </h3>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">{s.desc}</p>
        <button className={`mt-5 flex items-center gap-1 text-sm font-semibold transition-all duration-300
          ${hovered ? "text-amber-500 gap-2" : "text-gray-300"}`}>
          Learn more <ChevronRight size={16} className={hovered ? "anim-bounce-x" : ""} />
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LaundryServices() {
  const heroRef    = useInView(0.1);
  const aboutRef   = useInView();
  const statsRef   = useInView();
  const processRef = useInView();
  const benefitRef = useInView();
  const ctaRef     = useInView();

  return (
    <div className="font-sans text-gray-900 bg-white antialiased">
      <style>{styles}</style>

      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="pt-10 pb-0 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <div
            ref={heroRef.ref}
            className="relative rounded-3xl bg-amber-500 overflow-hidden min-h-[320px] sm:min-h-[380px] flex items-center"
          >
            {/* Decorative circles */}
            <div className="absolute -bottom-14 -left-14 w-52 h-52 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute top-4 left-1/3 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -top-8 right-1/4 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />

            {/* Left text */}
            <div className={`relative z-10 p-8 sm:p-12 max-w-lg hidden-init ${heroRef.inView ? "anim-slide-right" : ""}`}>
              <p className="text-xs font-bold tracking-[0.25em] text-white/70 uppercase">
                The Vervoer Laundry Team
              </p>
              <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                We make Laundry easy.
              </h1>
              <p className="mt-4 text-white/80 text-sm leading-relaxed max-w-xs">
                From pickup to delivery, our professional laundry service
                takes care of your clothes so you can focus on what matters
                most. Fast, reliable, and hassle-free.
              </p>
              <div className="mt-6 flex gap-3 flex-wrap">
                <button className="px-6 py-3 bg-white text-amber-600 font-bold rounded-2xl
                  hover:scale-105 hover:shadow-lg transition-all duration-200 text-sm">
                  Book Now
                </button>
                <button className="px-6 py-3 border-2 border-white/50 text-white font-semibold rounded-2xl
                  hover:bg-white/10 hover:scale-105 transition-all duration-200 text-sm flex items-center gap-2">
                  Learn More <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Right image */}
            <div
              className={`absolute right-0 top-0 bottom-0 w-1/2 hidden sm:block hidden-init
                ${heroRef.inView ? "anim-slide-left" : ""}`}
              style={{ animationDelay: "200ms" }}
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-amber-500 via-amber-500/50 to-transparent" />
              <img
                src="/src/assets/dry.png"
                alt="Laundry service"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badge */}
            <div
              className={`absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-3
                bg-white rounded-2xl px-4 py-3 shadow-xl hidden-init
                ${heroRef.inView ? "anim-fade-up" : ""}`}
              style={{ animationDelay: "500ms" }}
            >
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white">
                <Star size={18} className="fill-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">Top Rated</div>
                <div className="text-xs text-gray-500">4.9 · 8,000+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div ref={aboutRef.ref} className={`hidden-init ${aboutRef.inView ? "anim-fade-up" : ""}`}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Professional Laundry Services
            </h2>
            <p className="mt-5 text-gray-500 leading-relaxed text-base sm:text-lg">
              Streamlined laundry solutions designed to save you time while delivering
              fresh, clean, and perfectly cared-for garments. We handle everything
              so you can focus on what matters most.
            </p>
            <div className="mt-6 flex justify-center gap-3 flex-wrap">
              <span className="px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-sm font-semibold border border-amber-200">
                👕 Garment Care
              </span>
              <span className="px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-sm font-semibold border border-amber-200">
                🚚 Door-to-Door
              </span>
              <span className="px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-sm font-semibold border border-amber-200">
                🌿 Eco-Friendly
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────────────────────── */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Banner ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-7xl mx-auto px-5">
          <div ref={statsRef.ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
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

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#FFF8EE]">
        <div className="max-w-7xl mx-auto px-5">
          <div
            ref={processRef.ref}
            className={`text-center hidden-init ${processRef.inView ? "anim-fade-up" : ""}`}
          >
            <p className="text-xs font-bold tracking-[0.25em] text-amber-500 uppercase">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
              Clean clothes in 4 simple steps
            </h2>
          </div>

          <div className="mt-16 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-amber-300 z-0" />

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
              {process.map((p, i) => (
                <div
                  key={p.title}
                  style={{ animationDelay: `${i * 120}ms` }}
                  className={`flex flex-col items-center text-center gap-3
                    hidden-init ${processRef.inView ? "anim-fade-up" : ""}`}
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-amber-400
                      flex items-center justify-center text-amber-500 shadow-lg
                      hover:bg-amber-500 hover:text-white hover:scale-110
                      transition-all duration-300 cursor-default">
                      {p.icon}
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-500
                      text-white text-xs font-bold flex items-center justify-center shadow">
                      {p.step}
                    </span>
                  </div>
                  <p className="font-bold text-gray-900">{p.title}</p>
                  <p className="text-xs text-gray-500 max-w-[100px]">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose + Image ────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div ref={benefitRef.ref} className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Image */}
            <div className={`hidden-init ${benefitRef.inView ? "anim-slide-right" : ""}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="/src/assets/dry.png"
                  alt="Laundry service"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Floating stat card */}
                <div className="absolute bottom-5 left-5 bg-white rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white">
                    <Zap size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Same-Day Service</div>
                    <div className="text-xs text-gray-500">Order before 10am</div>
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
                Why Choose Vervoer Laundry?
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                Laundry that works{" "}
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
                We combine cutting-edge cleaning technology with a personal touch
                to deliver garment care you can trust — every single time.
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
                Explore Services <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      {/* <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div
            ref={planRef.ref}
            className={`text-center hidden-init ${planRef.inView ? "anim-fade-up" : ""}`}
          >
            <p className="text-xs font-bold tracking-[0.25em] text-amber-500 uppercase">Pricing</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              No surprises. Pick the plan that fits your laundry needs.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {plans.map((p, i) => (
              <div
                key={p.name}
                style={{ animationDelay: `${i * 120}ms` }}
                className={`relative rounded-3xl p-8 flex flex-col gap-6
                  hover:-translate-y-3 transition-all duration-300
                  hidden-init ${planRef.inView ? "anim-scale-in" : ""}
                  ${p.highlighted
                    ? "bg-amber-500 text-white shadow-2xl shadow-amber-200"
                    : "bg-gray-50 shadow-md hover:shadow-xl border border-gray-100"}`}
              >
                {p.badge && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white
                    px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {p.badge}
                  </span>
                )}
                <div>
                  <h3 className={`text-lg font-semibold ${p.highlighted ? "text-white" : "text-gray-600"}`}>
                    {p.name}
                  </h3>
                  <div className="mt-3 flex items-end gap-1">
                    <span className="text-5xl font-extrabold">{p.price}</span>
                    {p.period && <span className="pb-2 text-lg">{p.period}</span>}
                  </div>
                  <p className={`mt-2 text-sm ${p.highlighted ? "text-white/80" : "text-gray-500"}`}>
                    {p.desc}
                  </p>
                </div>
                <ul className="space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <CheckCircle size={16} className={p.highlighted ? "text-white" : "text-amber-500"} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105
                  ${p.highlighted
                    ? "bg-white text-amber-600 hover:bg-gray-100 shadow-md"
                    : "bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-100"}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <div
            ref={ctaRef.ref}
            className={`relative rounded-3xl bg-amber-500 p-10 sm:p-16 overflow-hidden
              hidden-init ${ctaRef.inView ? "anim-scale-in" : ""}`}
          >
            <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96
              rounded-full bg-white/5 pointer-events-none anim-spin-slow" />

            <div className="relative z-10 text-center">
              <p className="text-white/70 text-xs font-bold tracking-[0.25em] uppercase">
                Ready for Fresh Clothes?
              </p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Book your first pickup today.
              </h2>
              <p className="mt-4 text-white/80 max-w-xl mx-auto">
                Join over 10,000 happy customers who trust Vervoer for effortless
                laundry every week.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-amber-600 font-bold rounded-2xl
                  hover:scale-105 hover:shadow-xl transition-all duration-200 flex items-center gap-2 justify-center">
                  <Truck size={20} /> Schedule Pickup
                </button>
                <button className="px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-2xl
                  hover:bg-white/10 hover:scale-105 transition-all duration-200 flex items-center gap-2 justify-center">
                  <MapPin size={20} /> Find Locations
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}