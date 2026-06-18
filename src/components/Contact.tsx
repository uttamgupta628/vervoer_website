import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  LifeBuoy,
  MapPin,
  Send,
  User,
  FileText,
  MessageSquare,
  UploadCloud,
  ShieldCheck,
  ChevronRight,
  CheckCircle,
  Clock,
  Headphones,
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
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(245,158,11,0.45); }
    70%  { box-shadow: 0 0 0 14px rgba(245,158,11,0); }
    100% { box-shadow: 0 0 0 0 rgba(245,158,11,0); }
  }
  @keyframes toast-in {
    from { opacity: 0; transform: translateY(30px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .anim-fade-up     { animation: fadeUp 0.7s ease forwards; }
  .anim-slide-right { animation: slideRight 0.7s ease forwards; }
  .anim-slide-left  { animation: slideLeft 0.7s ease forwards; }
  .anim-scale-in    { animation: scaleIn 0.6s ease forwards; }
  .anim-float       { animation: float 3.5s ease-in-out infinite; }
  .anim-spin-slow   { animation: spin-slow 10s linear infinite; }
  .anim-pulse       { animation: pulse-ring 2.2s ease-out infinite; }
  .anim-toast       { animation: toast-in 0.4s ease forwards; }
  .hidden-init      { opacity: 0; }

  .input-field {
    width: 100%;
    border: none;
    border-bottom: 1.5px solid #e5e7eb;
    padding: 10px 0 10px 32px;
    font-size: 0.875rem;
    color: #111827;
    background: transparent;
    outline: none;
    transition: border-color 0.25s;
    font-family: inherit;
  }
  .input-field::placeholder { color: #9ca3af; }
  .input-field:focus { border-bottom-color: #f59e0b; }

  .input-wrapper {
    position: relative;
    margin-bottom: 20px;
  }
  .input-icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    transition: color 0.25s;
    pointer-events: none;
  }
  .input-wrapper:focus-within .input-icon { color: #f59e0b; }

  .textarea-wrapper .input-icon { top: 12px; transform: none; }
  .textarea-field {
    width: 100%;
    border: none;
    border-bottom: 1.5px solid #e5e7eb;
    padding: 10px 0 10px 32px;
    font-size: 0.875rem;
    color: #111827;
    background: transparent;
    outline: none;
    resize: none;
    height: 72px;
    transition: border-color 0.25s;
    font-family: inherit;
  }
  .textarea-field::placeholder { color: #9ca3af; }
  .textarea-field:focus { border-bottom-color: #f59e0b; }

  .input-underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1.5px;
    width: 0;
    background: #f59e0b;
    transition: width 0.3s ease;
  }
  .input-wrapper:focus-within .input-underline { width: 100%; }

  @media (prefers-reduced-motion: reduce) {
    .hidden-init { opacity: 1 !important; }
    .anim-fade-up, .anim-slide-right, .anim-slide-left,
    .anim-scale-in, .anim-float, .anim-spin-slow, .anim-pulse { animation: none !important; }
  }
`;

// ─── useInView ────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const contactCards = [
  {
    icon: <Phone size={22} />,
    label: "Phone",
    value: "111 111 111",
    sub: "Mon–Fri, 9am–6pm",
    color: "bg-blue-100 text-blue-500",
    hoverBg: "hover:bg-blue-500",
  },
  {
    icon: <Mail size={22} />,
    label: "E-Mail",
    value: "joward2001@vervoerapp.com",
    sub: "We reply within 24h",
    color: "bg-amber-100 text-amber-500",
    hoverBg: "hover:bg-amber-500",
  },
  {
    icon: <LifeBuoy size={22} />,
    label: "Helpdesk",
    value: "https://helpdesk.com",
    sub: "24/7 live support",
    color: "bg-green-100 text-green-500",
    hoverBg: "hover:bg-green-500",
  },
  {
    icon: <Clock size={22} />,
    label: "Office Hours",
    value: "Mon – Sat",
    sub: "9:00 AM – 6:00 PM",
    color: "bg-purple-100 text-purple-500",
    hoverBg: "hover:bg-purple-500",
  },
];

const whyItems = [
  "Response within 24 hours",
  "Dedicated support agents",
  "Multi-channel assistance",
  "NDA protection available",
  "Transparent communication",
  "Escalation guarantee",
];

// ─── Info Card ────────────────────────────────────────────────────────────────

const InfoCard = ({
  card,
  delay = 0,
  inView,
}: {
  card: (typeof contactCards)[0];
  delay?: number;
  inView: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`hidden-init ${inView ? "anim-fade-up" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`group bg-white rounded-2xl p-6 flex items-start gap-4
          border-2 transition-all duration-300 cursor-default
          ${hovered
            ? "border-amber-400 shadow-xl shadow-amber-100 -translate-y-2"
            : "border-gray-100 shadow-md"}`}
      >
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0
            transition-all duration-300
            ${hovered
              ? `${card.hoverBg} text-white scale-110`
              : card.color}`}
        >
          {card.icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
            {card.label}
          </p>
          <p
            className={`font-semibold text-sm break-all transition-colors duration-300
              ${hovered ? "text-amber-500" : "text-gray-900"}`}
          >
            {card.value}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

export default function Contact() {
  const heroRef  = useInView(0.1);
  const formRef  = useInView();
  const mapRef   = useInView();
  const cardsRef = useInView();
  const whyRef   = useInView();
  const ctaRef   = useInView();

  const [formData, setFormData] = useState({
    name: "", street: "", city: "", postcode: "",
    phone: "", email: "", message: "", nda: false,
  });
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <div className="font-sans text-gray-900 bg-white antialiased">
      <style>{styles}</style>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-0 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <div
            ref={heroRef.ref}
            className="relative rounded-3xl bg-amber-500 overflow-hidden min-h-[300px] sm:min-h-[360px] flex items-center"
          >
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute top-4 left-1/3 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -top-10 right-1/4 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
            {/* subtle spin ring — kept but pushed further right */}
            <div className="absolute top-1/2 right-8 -translate-y-1/2 w-56 h-56
              rounded-full border-[28px] border-white/10 pointer-events-none anim-spin-slow hidden sm:block" />

            {/* LEFT text */}
            <div
              className={`relative z-10 p-8 sm:p-14 max-w-md hidden-init
                ${heroRef.inView ? "anim-slide-right" : ""}`}
            >
              <p className="text-xs font-bold tracking-[0.25em] text-white/70 uppercase">
                Vervoer Support Team
              </p>
              <h1 className="mt-3 text-4xl sm:text-5xl font-medium text-white leading-tight">
                Get in{" "}
                <span className="underline decoration-white/40 decoration-4 underline-offset-4">
                  touch
                </span>
                .
              </h1>
              <p className="mt-4 text-white/80 text-sm leading-relaxed max-w-xs">
                Have a question, need support, or want to explore a partnership?
                We're here to help — reach out and we'll respond quickly.
              </p>
              <div className="mt-6 flex gap-3 flex-wrap">
                <button className="px-6 py-3 bg-white text-amber-600 font-bold rounded-2xl
                  hover:scale-105 hover:shadow-lg transition-all duration-200 text-sm">
                  Send a Message
                </button>
                <button
  onClick={() => document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" })}
  className="px-6 py-3 border-2 border-white/50 text-white font-semibold rounded-2xl
    hover:bg-white/10 hover:scale-105 transition-all duration-200 text-sm flex items-center gap-2"
>
  View on Map <ChevronRight size={16} />
</button>
              </div>

              {/* Stat chips — visible on mobile too */}
              <div className="mt-8 flex gap-3 flex-wrap">
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                  <span className="text-xs font-semibold text-white">10 k+ customers</span>
                </div>
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-xs font-semibold text-white">⚡ &lt; 2 hr reply</span>
                </div>
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-xs font-semibold text-white">🛡 NDA available</span>
                </div>
              </div>
            </div>

            {/* RIGHT panel — team + cards */}
            <div
              className={`absolute right-0 top-0 bottom-0 hidden lg:flex flex-col justify-center
                gap-4 pr-10 pl-4 z-10 hidden-init ${heroRef.inView ? "anim-slide-left" : ""}`}
              style={{ animationDelay: "200ms", minWidth: 300 }}
            >
              {/* Team avatars row */}
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-4 flex flex-col gap-3">
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Meet the team</p>
                <div className="flex items-center gap-3">
                  {/* Avatar circles with initials */}
                  {[
                    { initials: "JW", color: "bg-blue-400",   name: "James W." },
                    { initials: "SR", color: "bg-rose-400",   name: "Sara R."  },
                    { initials: "MK", color: "bg-green-400",  name: "Mike K."  },
                    { initials: "AL", color: "bg-purple-400", name: "Amy L."   },
                  ].map((a) => (
                    <div key={a.initials} className="flex flex-col items-center gap-1">
                      <div className={`w-10 h-10 rounded-full ${a.color} flex items-center justify-center
                        text-white text-xs font-bold ring-2 ring-white/40 hover:ring-white
                        hover:scale-110 transition-all duration-200 cursor-default`}>
                        {a.initials}
                      </div>
                      <span className="text-white/60 text-[9px]">{a.name.split(" ")[0]}</span>
                    </div>
                  ))}
                  {/* +more */}
                  <div className="flex flex-col items-center gap-1 ml-1">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center
                      text-white text-xs font-bold ring-2 ring-white/30 cursor-default">
                      +6
                    </div>
                    <span className="text-white/60 text-[9px]">more</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse shrink-0" />
                  <span className="text-white/80 text-xs">4 agents online right now</span>
                </div>
              </div>

              {/* Reply time card */}
              <div className="bg-white rounded-2xl px-5 py-4 shadow-xl anim-float flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Headphones size={22} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Avg. Response</p>
                  <p className="text-xl font-medium text-gray-900 leading-tight">Under 2 hrs</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Mon – Sat, 9 am – 6 pm</p>
                </div>
              </div>

              {/* Satisfaction stat */}
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center gap-4">
                <div className="text-3xl font-medium text-white leading-none">98%</div>
                <div>
                  <p className="text-white font-semibold text-sm">Satisfaction rate</p>
                  <p className="text-white/60 text-xs mt-0.5">Based on 8,000+ reviews</p>
                  {/* Star row */}
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} className="w-3 h-3 fill-yellow-300" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Info Cards ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div
            ref={cardsRef.ref}
            className={`text-center mb-12 hidden-init ${cardsRef.inView ? "anim-fade-up" : ""}`}
          >
            <p className="text-xs font-bold tracking-[0.25em] text-amber-500 uppercase">
              Reach Us
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-medium text-gray-900">
              Multiple ways to connect
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((card, i) => (
              <InfoCard key={card.label} card={card} delay={i * 90} inView={cardsRef.inView} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Map ────────────────────────────────────────────────────── */}
      <section className="pb-24 bg-[#FFF8EE]">
        <div className="max-w-7xl mx-auto px-5 pt-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* LEFT: Form */}
            <div
              ref={formRef.ref}
              className={`hidden-init ${formRef.inView ? "anim-slide-right" : ""}`}
            >
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 p-8 sm:p-10">
                <p className="text-xs font-bold tracking-[0.25em] text-amber-500 uppercase mb-1">
                  Contact Form
                </p>
                <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2">
                  Send us a message
                </h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Fill in the details below and our team will get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="input-wrapper">
                    <span className="input-icon"><User size={16} /></span>
                    <input className="input-field" name="name" placeholder="Contact name"
                      value={formData.name} onChange={handleChange} />
                    <div className="input-underline" />
                  </div>

                  <div className="input-wrapper">
                    <span className="input-icon"><MapPin size={16} /></span>
                    <input className="input-field" name="street" placeholder="Street"
                      value={formData.street} onChange={handleChange} />
                    <div className="input-underline" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="input-wrapper">
                      <span className="input-icon"><MapPin size={16} /></span>
                      <input className="input-field" name="city" placeholder="City"
                        value={formData.city} onChange={handleChange} />
                      <div className="input-underline" />
                    </div>
                    <div className="input-wrapper">
                      <span className="input-icon"><FileText size={16} /></span>
                      <input className="input-field" name="postcode" placeholder="Postcode"
                        value={formData.postcode} onChange={handleChange} />
                      <div className="input-underline" />
                    </div>
                  </div>

                  <div className="input-wrapper">
                    <span className="input-icon"><Phone size={16} /></span>
                    <input className="input-field" name="phone" placeholder="Contact Phone"
                      value={formData.phone} onChange={handleChange} />
                    <div className="input-underline" />
                  </div>

                  <div className="input-wrapper">
                    <span className="input-icon"><Mail size={16} /></span>
                    <input className="input-field" type="email" name="email" placeholder="E-mail"
                      value={formData.email} onChange={handleChange} />
                    <div className="input-underline" />
                  </div>

                  <div className="input-wrapper textarea-wrapper">
                    <span className="input-icon"><MessageSquare size={16} /></span>
                    <textarea className="textarea-field" name="message"
                      placeholder="Let's talk about your idea"
                      value={formData.message} onChange={handleChange} />
                    <div className="input-underline" />
                  </div>

                  <label className="relative flex flex-col items-center justify-center gap-2 border-2
                    border-dashed border-gray-200 rounded-2xl p-5 cursor-pointer mb-2
                    hover:border-amber-400 hover:bg-amber-50 transition-all duration-250">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFile} accept=".pdf,.doc,.docx,.png,.jpg" />
                    <UploadCloud size={24} className="text-amber-400" />
                    <span className="text-sm text-gray-400">
                      <span className="text-amber-500 font-semibold">Upload</span> Additional file
                    </span>
                    {fileName && <span className="text-xs text-gray-500 font-medium">{fileName}</span>}
                  </label>
                  <p className="text-xs text-gray-400 mb-5">File size should not exceed 10MB</p>

                  <label className="flex items-center gap-3 mb-6 cursor-pointer group">
                    <input type="checkbox" name="nda" checked={formData.nda}
                      onChange={handleChange} className="accent-amber-500 w-4 h-4 cursor-pointer" />
                    <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                      I want to protect my data by signing an NDA
                    </span>
                    <ShieldCheck size={16} className="text-amber-400 shrink-0 ml-auto" />
                  </label>

                  <button
                    type="submit"
                    className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wider uppercase
                      flex items-center justify-center gap-2 transition-all duration-300
                      hover:scale-[1.02] hover:shadow-lg
                      ${submitted
                        ? "bg-green-500 text-white shadow-green-200"
                        : "bg-amber-500 text-white hover:bg-amber-600 hover:shadow-amber-200"}`}
                  >
                    {submitted
                      ? <><CheckCircle size={18} /> Message Sent!</>
                      : <><Send size={18} /> Submit</>}
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT: Rich side panel */}
            <div
              ref={mapRef.ref}
              className={`flex flex-col gap-6 hidden-init ${mapRef.inView ? "anim-slide-left" : ""}`}
              style={{ animationDelay: "150ms" }}
            >

              {/* Intro banner */}
              <div className="relative bg-gray-900 rounded-3xl p-7 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-[20px]
                  border-amber-500/20 anim-spin-slow pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-amber-500/10 pointer-events-none" />
                <p className="text-xs font-bold tracking-[0.25em] text-amber-400 uppercase mb-2">
                  Talk to us directly
                </p>
                <h3 className="text-2xl font-medium text-white leading-snug mb-3">
                  Real people.<br />
                  <span style={{
                    background: "linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer 3s linear infinite",
                  }}>
                    Real answers.
                  </span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  No bots, no ticket queues. Our team responds personally to every inquiry — parking, laundry, or partnerships.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-semibold text-amber-300">Average reply: under 2 hours</span>
                </div>
              </div>

              {/* Quick contact cards */}
              <div className="grid grid-cols-2 gap-4">
                <a href="tel:111111111"
                  className="group bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-md
                    hover:border-amber-400 hover:shadow-xl hover:shadow-amber-100 hover:-translate-y-1
                    transition-all duration-300 flex flex-col gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 group-hover:bg-blue-500
                    flex items-center justify-center text-blue-500 group-hover:text-white transition-all duration-300">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm group-hover:text-amber-500 transition-colors">Call Us</p>
                    <p className="text-xs text-gray-400 mt-0.5">111 111 111</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-amber-400
                    group-hover:translate-x-1 transition-all duration-300 mt-auto" />
                </a>

                <a href="mailto:joward2001@vervoerapp.com"
                  className="group bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-md
                    hover:border-amber-400 hover:shadow-xl hover:shadow-amber-100 hover:-translate-y-1
                    transition-all duration-300 flex flex-col gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 group-hover:bg-amber-500
                    flex items-center justify-center text-amber-500 group-hover:text-white transition-all duration-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm group-hover:text-amber-500 transition-colors">Email Us</p>
                    <p className="text-xs text-gray-400 mt-0.5 break-all">joward2001@vervoerapp.com</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-amber-400
                    group-hover:translate-x-1 transition-all duration-300 mt-auto" />
                </a>

                <a href="https://helpdesk.com" target="_blank" rel="noreferrer"
                  className="group bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-md
                    hover:border-amber-400 hover:shadow-xl hover:shadow-amber-100 hover:-translate-y-1
                    transition-all duration-300 flex flex-col gap-3">
                  <div className="w-11 h-11 rounded-xl bg-green-100 group-hover:bg-green-500
                    flex items-center justify-center text-green-500 group-hover:text-white transition-all duration-300">
                    <LifeBuoy size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm group-hover:text-amber-500 transition-colors">Helpdesk</p>
                    <p className="text-xs text-gray-400 mt-0.5">24/7 live portal</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-amber-400
                    group-hover:translate-x-1 transition-all duration-300 mt-auto" />
                </a>

                <div className="group bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-md
                  hover:border-amber-400 hover:shadow-xl hover:shadow-amber-100 hover:-translate-y-1
                  transition-all duration-300 flex flex-col gap-3 cursor-default">
                  <div className="w-11 h-11 rounded-xl bg-purple-100 group-hover:bg-purple-500
                    flex items-center justify-center text-purple-500 group-hover:text-white transition-all duration-300">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm group-hover:text-amber-500 transition-colors">Hours</p>
                    <p className="text-xs text-gray-400 mt-0.5">Mon–Sat · 9am–6pm</p>
                  </div>
                  <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full mt-auto w-fit">
                    Open Now
                  </span>
                </div>
              </div>

              {/* Map */}
              <div className="relative" id="map-section">
                <div className="absolute -top-3 -right-3 w-40 h-52 bg-amber-500 rounded-3xl
                  hidden sm:block transition-transform duration-500 hover:translate-x-1 hover:-translate-y-1 z-0" />
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl" style={{ height: 300 }}>
                  <iframe
                    title="Vervoer HQ"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20987.05!2d14.4208!3d50.0755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94e52d47bef9%3A0x6e1fdeeda6c75e1a!2sPrague%2C%20Czechia!5e0!3m2!1sen!2s!4v1700000000000"
                    width="100%" height="100%"
                    style={{ border: "none", display: "block" }}
                    loading="lazy" allowFullScreen
                  />
                  <div className="absolute top-4 left-4 bg-white rounded-2xl px-4 py-3 shadow-xl anim-float z-10">
                    <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Headquarters</p>
                    <p className="text-xs text-gray-700 mt-1 leading-relaxed font-medium">
                      Company s. r. o.<br />Street, 51<br />100 00 Prague
                    </p>
                  </div>
                </div>
              </div>

              {/* Why us */}
              <div
                ref={whyRef.ref}
                className={`bg-white rounded-3xl p-7 shadow-md border border-gray-100
                  hidden-init ${whyRef.inView ? "anim-fade-up" : ""}`}
              >
                <p className="text-xs font-bold tracking-[0.25em] text-amber-500 uppercase mb-1">
                  Why Reach Out?
                </p>
                <h3 className="font-medium text-gray-900 text-xl mb-5">
                  We're{" "}
                  <span style={{
                    background: "linear-gradient(90deg,#f59e0b,#ef4444,#f59e0b)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer 3s linear infinite",
                  }}>
                    always listening
                  </span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {whyItems.map((item, i) => (
                    <li
                      key={item}
                      style={{ animationDelay: `${i * 70}ms` }}
                      className={`flex items-center gap-3 hidden-init ${whyRef.inView ? "anim-fade-up" : ""}`}
                    >
                      <CheckCircle size={17} className="text-amber-500 shrink-0" />
                      <span className="text-sm text-gray-600 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-96 h-96 rounded-full bg-white/5 pointer-events-none anim-spin-slow" />

            <div className="relative z-10 text-center">
              <p className="text-white/70 text-xs font-bold tracking-[0.25em] uppercase">
                Still have questions?
              </p>
              <h2 className="mt-3 text-3xl sm:text-5xl font-medium text-white leading-tight">
                We're one message away.
              </h2>
              <p className="mt-4 text-white/80 max-w-xl mx-auto text-sm">
                Whether it's parking, laundry, or a partnership inquiry — our
                team is ready to assist you around the clock.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-amber-600 font-bold rounded-2xl
                  hover:scale-105 hover:shadow-xl transition-all duration-200 flex items-center gap-2 justify-center">
                  <Send size={18} /> Send a Message
                </button>
                <button className="px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-2xl
                  hover:bg-white/10 hover:scale-105 transition-all duration-200 flex items-center gap-2 justify-center">
                  <Phone size={18} /> Call Us Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Toast */}
      {submitted && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3
          bg-green-500 text-white px-5 py-4 rounded-2xl shadow-2xl anim-toast">
          <CheckCircle size={20} />
          <span className="font-semibold text-sm">Your message has been sent!</span>
        </div>
      )}
    </div>
  );
}