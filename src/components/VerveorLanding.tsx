import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Lock,
  Navigation,
  Car,
  ParkingCircle,
  Star,
  MapPin,
  Calendar,
} from "lucide-react";

import Hero from "./Hero";
import Footer from "./Footer";

import phone1 from "../assets/phone1.png";
import phone2 from "../assets/phone2.png";
import phone3 from "../assets/phone3.png";
import phoneImg from "../assets/phone_img.png";
import footerPhone from "../assets/footer-phone.png";

// ─── Animation Styles ────────────────────────────────────────────────────────

const animationStyles = `
@keyframes floatingCarousel {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate-floating-carousel {
  animation: floatingCarousel 4s ease-in-out infinite;
}

@keyframes phoneFloat {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate-phone-float {
  animation: phoneFloat 3s ease-in-out infinite;
}
`;

// ─── useInView Hook ───────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}
interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}
interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const features: Feature[] = [
  {
    icon: <MapPin size={24} />,
    title: "Easy Booking",
    description: "Find and book parking spots in just a few taps.",
  },
  {
    icon: <Lock size={24} />,
    title: "Secure Payments",
    description: "Your payments are safe with 100% secure options.",
  },
  {
    icon: <Navigation size={24} />,
    title: "Live Tracking",
    description: "Navigate to your spot with real-time directions.",
  },
  {
    icon: <Car size={24} />,
    title: "Smart Search",
    description: "Filter by price, distance, availability & more.",
  },
];

const steps: Step[] = [
  {
    icon: <Search size={22} />,
    title: "Search",
    description: "Find parking near you",
  },
  {
    icon: <Calendar size={22} />,
    title: "Select",
    description: "Choose the best spot for you",
  },
  {
    icon: <ParkingCircle size={22} />,
    title: "Reserve",
    description: "Book your spot in seconds",
  },
  {
    icon: <Navigation size={22} />,
    title: "Navigate",
    description: "Get directions to your spot",
  },
  {
    icon: <Car size={22} />,
    title: "Park",
    description: "Park with ease and enjoy!",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "James Pattinson",
    role: "Verified User",
    avatar: "https://i.pravatar.cc/120?img=11",
    text: "Vervoer has completely changed the way I park. I save so much time every single day using this brilliant app!",
    rating: 3,
  },
  {
    name: "Greg Stuart",
    role: "Verified User",
    avatar: "https://i.pravatar.cc/120?img=53",
    text: "Vestibulum, cum nam non amet consectetur morbi aenean condimentum eget. Ultricies integer nunc neque accumsan laoreet.",
    rating: 5,
  },
  {
    name: "Trevor Mitchell",
    role: "Business User",
    avatar: "https://i.pravatar.cc/120?img=57",
    text: "The best parking app I have ever used. Clean interface, fast booking, and the navigation is spot-on every time.",
    rating: 2,
  },
];

// ─── Helper Components ────────────────────────────────────────────────────────

const StarRating = ({
  count,
  animate = false,
}: {
  count: number;
  animate?: boolean;
}) => (
  <div className="flex gap-1 justify-center mt-2">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        style={
          animate
            ? {
                animation: `starPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s both`,
              }
            : {}
        }
        className={
          i < count
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-200 text-gray-200"
        }
      />
    ))}
  </div>
);

const FeatureIconBox = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-200">
    {icon}
  </div>
);

const FeatureCard = ({
  feature,
  delay = 0,
}: {
  feature: Feature;
  delay?: number;
}) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm
        hover:shadow-[0_8px_30px_rgba(247,148,0,0.35)] hover:-translate-y-3 hover:border-amber-400 transition-all duration-300 group
        opacity-0-init ${inView ? "animate-fade-up" : ""}`}
    >
      <div
        className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-500
        group-hover:bg-amber-500 group-hover:text-white group-hover:scale-110 transition-all duration-300
        group-hover:shadow-lg group-hover:shadow-amber-200"
      >
        {feature.icon}
      </div>
      <p className="mt-5 font-bold text-lg text-gray-900">{feature.title}</p>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};

// ─── Testimonial Card ─────────────────────────────────────────────────────────

const TestimonialCard = ({
  t,
  delay = 0,
}: {
  t: Testimonial;
  delay?: number;
}) => {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`opacity-0-init ${inView ? "animate-fade-up" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative border-2 rounded-3xl px-6 pt-16 pb-8 text-center
          transition-all duration-500 cursor-default
          ${
            hovered
              ? "border-amber-500 shadow-2xl shadow-amber-100 -translate-y-3 bg-gradient-to-b from-white to-amber-50"
              : "border-amber-300 shadow-md bg-white"
          }`}
      >
        <div
          className={`absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full
          transition-all duration-500
          ${hovered ? "ring-4 ring-amber-300 ring-offset-2" : ""}`}
        >
          <img
            src={t.avatar}
            alt={t.name}
            className={`w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg
              transition-transform duration-500 ${hovered ? "scale-110" : "scale-100"}`}
          />
        </div>

        <div className="absolute top-6 right-6 text-5xl text-amber-200 font-serif leading-none select-none">
          "
        </div>

        <h4
          className={`font-bold text-lg transition-colors duration-300 ${hovered ? "text-amber-600" : "text-gray-900"}`}
        >
          {t.name}
        </h4>
        <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>

        <StarRating count={t.rating} animate={hovered} />

        <p className="mt-4 text-gray-500 text-sm leading-relaxed italic">
          "{t.text}"
        </p>
      </div>
    </div>
  );
};

// ─── App Section (Carousel) ───────────────────────────────────────────────────

const AppSection = () => {
  const screens = [phone1, phone2, phone3, phoneImg, footerPhone];

  const [current, setCurrent] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const { ref, inView } = useInView(0.2);

  const prev = () =>
    setCurrent((c) => (c - 1 + screens.length) % screens.length);
  const next = () => setCurrent((c) => (c + 1) % screens.length);

  useEffect(() => {
  if (!isPlaying) return;

  const timer = setInterval(() => {
    setCurrent((prev) => (prev + 1) % screens.length);
  }, 2000);

  return () => clearInterval(timer);
}, [isPlaying, screens.length]);

  const getStyle = (index: number): React.CSSProperties => {
    const total = screens.length;
    const left = (current - 1 + total) % total;
    const right = (current + 1) % total;
    const farLeft = (current - 2 + total) % total;
    const farRight = (current + 2) % total;

    if (index === current)
      return {
        zIndex: 30,
        width: "10rem",
        opacity: 1,
        transform: "translateY(0px) scale(1)",
        filter: "drop-shadow(0 25px 40px rgba(0,0,0,0.18))",
      };
    if (index === left || index === right)
      return {
        zIndex: 20,
        width: "7.5rem",
        opacity: 0.8,
        transform: "translateY(16px) scale(0.95)",
        filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.10))",
      };
    if (index === farLeft || index === farRight)
      return {
        zIndex: 10,
        width: "5.5rem",
        opacity: 0.4,
        transform: "translateY(28px) scale(0.88)",
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.06))",
      };
    return {
      zIndex: 0,
      width: "4rem",
      opacity: 0,
      transform: "translateY(40px) scale(0.8)",
    };
  };

  return (
    <section className="py-24 bg-gradient-to-br from-white via-amber-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        <div
          ref={ref}
          className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
        >
          {/* Left: Text */}
          <div
            className={`lg:w-80 shrink-0 opacity-0-init ${inView ? "animate-slide-right" : ""}`}
          >
            <p className="text-xs font-bold tracking-[0.25em] text-amber-500 uppercase">
              The App
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Everything at your{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #f59e0b, #ef4444, #f59e0b)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                Fingertips
              </span>
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              A powerful app built to make parking simple, fast and reliable.
              Download now and never stress about parking again.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                className="flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-2xl text-sm font-semibold
                hover:bg-gray-700 hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <span className="text-lg">🍎</span>
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 leading-none">
                    Download on the
                  </div>
                  <div className="text-sm font-bold leading-tight">
                    App Store
                  </div>
                </div>
              </button>
              <a
                href="https://play.google.com/store/apps/details?id=com.uttam.verover"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="flex items-center gap-2 px-5 py-3 bg-amber-500 text-white rounded-2xl text-sm font-semibold
                  hover:bg-amber-600 hover:scale-105 transition-all duration-200 shadow-lg shadow-amber-200"
                >
                  <span className="text-lg">&#9654;</span>
                  <div className="text-left">
                    <div className="text-[10px] text-amber-100 leading-none">
                      Get it on
                    </div>
                    <div className="text-sm font-bold leading-tight">
                      Google Play
                    </div>
                  </div>
                </button>
              </a>
            </div>

            <div className="mt-8 flex gap-2 items-center">
              {screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrent(i);
                    setIsPlaying(false);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-amber-500"
                      : "w-2 bg-gray-300 hover:bg-amber-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Carousel */}
          <div
  className={`flex-1 relative flex items-center justify-center min-h-[460px]
    opacity-0-init ${
      inView ? "animate-slide-left animate-floating-carousel" : ""
    }`}
  style={{ animationDelay: "200ms" }}
>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full bg-amber-300/40 blur-3xl animate-pulse" />
            </div>

            <button
              onClick={() => {
                prev();
                setIsPlaying(false);
              }}
              className="absolute left-0 z-40 w-11 h-11 rounded-full bg-white border-2 border-amber-200
                shadow-lg flex items-center justify-center text-xl text-amber-500
                hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:scale-110
                transition-all duration-200"
            >
              &#8249;
            </button>

            <div className="flex items-end justify-center gap-3 px-14">
              {screens.map((src, i) => (
  <div
    key={i}
    onClick={() => {
      setCurrent(i);
      setIsPlaying(false);
    }}
    style={{
      ...getStyle(i),
      transition: "all 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
      animationDelay: `${i * 0.3}s`,
    }}
    className="rounded-[2rem] overflow-hidden aspect-[9/19] bg-gray-100 cursor-pointer shrink-0 animate-phone-float"
  >
                  <img
                    src={src}
                    alt={`App screen ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                next();
                setIsPlaying(false);
              }}
              className="absolute right-0 z-40 w-11 h-11 rounded-full bg-white border-2 border-amber-200
                shadow-lg flex items-center justify-center text-xl text-amber-500
                hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:scale-110
                transition-all duration-200"
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VervoerLanding() {
  const whyRef = useInView();
  const featRef = useInView();
  const howRef = useInView();
  const testRef = useInView();

  return (
    <div className="font-sans text-gray-900 bg-white antialiased">
      <style>{animationStyles}</style>

      <Hero />

      <div className="h-24 md:h-32" />

      {/* Why Choose */}
      <section id="features" className="py-24 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-5">
          <div
            ref={whyRef.ref}
            className={`text-center opacity-0-init ${whyRef.inView ? "animate-fade-up" : ""}`}
          >
            <p className="text-xs font-bold tracking-[0.25em] text-amber-500 uppercase">
              Why Choose Vervoer?
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-lora font-semibold text-gray-900 max-w-3xl mx-auto leading-tight">
              Everything You Need for a Smarter Parking Experience
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.title} feature={f} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div
            ref={featRef.ref}
            className={`text-center opacity-0-init ${featRef.inView ? "animate-fade-up" : ""}`}
          >
            <p className="text-xs font-bold tracking-[0.25em] text-amber-500 uppercase">
              Features
            </p>
            <h2 className="font-lora text-4xl font-semibold">
              Designed for Convenience
            </h2>
          </div>

          <div className="mt-16 flex flex-col gap-20">
            <FeatureRow
              imgSrc={phone1}
              imgAlt="Find Parking Anywhere"
              imgLeft={true}
              icon={<Search size={20} />}
              title="Find Parking Anywhere"
              desc="Search nearby parking spots in real-time and get details like price, distance, availability and more."
            />
            <FeatureRow
              imgSrc={phone2}
              imgAlt="Reserve Instantly"
              imgLeft={false}
              icon={<Calendar size={20} />}
              title="Reserve Instantly"
              desc="Book your parking spot in advance and avoid the stress of last-minute searching."
            />
            <FeatureRow
              imgSrc={phone3}
              imgAlt="Navigate with Ease"
              imgLeft={true}
              icon={<Navigation size={20} />}
              title="Navigate with Ease"
              desc="Get step-by-step directions directly to your reserved spot and park without any confusion."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-10 bg-[#FFF0DD]">
        <div className="max-w-7xl mx-auto px-5">
          <div
            ref={howRef.ref}
            className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center"
          >
            <div
             className={`lg:w-56 shrink-0 ${
  howRef.inView
    ? "animate-slide-right"
    : "opacity-0 -translate-x-8"
}`}
            >
              <p className="text-xs font-bold tracking-[0.25em] text-amber-500 uppercase">
                How It Works
              </p>
              <h2 className="font-lora text-4xl font-semibold">
                Park in 5 Simple Steps
              </h2>
            </div>

            <div className="flex-1 relative">
          <div className="hidden sm:block absolute inset-x-[28px] top-[70px] z-0">
  {/* Dashed Line */}
  <div className="border-t-2 border-dashed border-amber-300" />

  {/* Moving Yellow Dot */}
 <div className="absolute top-[-2px] left-0 w-20 h-[4px] rounded-full bg-gradient-to-r from-yellow-300 via-amber-500 to-transparent animate-road-line" />
</div>
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-6">
                {steps.map((s, i) => (
                  <div
                    key={s.title}
                    style={{
                      animationDelay: `${i * 180}ms`,
                      animationFillMode: "forwards",
                    }}
                    className={`flex flex-col items-center text-center gap-3
                      opacity-0 translate-y-6
                      ${howRef.inView ? "animate-step" : ""}`}
                  >
                    <div className="flex items-center justify-center h-24">
                      <div
                        className="w-14 h-14 rounded-full bg-white border-2 border-amber-400
                        flex items-center justify-center text-amber-500 shadow-md
                        hover:bg-amber-500 hover:text-white hover:scale-110
                        transition-all duration-300"
                      >
                        {s.icon}
                      </div>
                    </div>
                    <p className="font-bold text-sm">{s.title}</p>
                    <p className="text-xs text-gray-500 leading-snug max-w-[90px]">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The App */}
      <AppSection />

      {/* Testimonials */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <div
            ref={testRef.ref}
            className={`text-center opacity-0-init ${testRef.inView ? "animate-fade-up" : ""}`}
          >
            <p className="text-xs font-bold tracking-[0.25em] text-amber-500 uppercase">
              What Our Users Say
            </p>
            <h2 className="font-lora text-4xl font-semibold">
              Trusted by Thousands of Drivers
            </h2>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-8 items-start">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} t={t} delay={i * 150} />
            ))}
          </div>

          <div className="mt-12 flex justify-center items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-300 hover:bg-amber-300 transition-colors cursor-pointer" />
            <span className="w-8 h-2 rounded-full bg-amber-500" />
            <span className="w-2 h-2 rounded-full bg-gray-300 hover:bg-amber-300 transition-colors cursor-pointer" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ─── Feature Row ──────────────────────────────────────────────────────────────

function FeatureRow({
  imgSrc,
  imgAlt,
  imgLeft,
  icon,
  title,
  desc,
}: {
  imgSrc: string;
  imgAlt: string;
  imgLeft: boolean;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
      <div
        style={{ animationDelay: "0ms" }}
        className={`rounded-3xl overflow-hidden shadow-xl aspect-video
          opacity-0-init ${inView ? (imgLeft ? "animate-slide-right" : "animate-slide-left") : ""}
          ${!imgLeft ? "lg:order-2" : ""}`}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div
        style={{ animationDelay: "150ms" }}
        className={`flex gap-5 items-start
          opacity-0-init ${inView ? (imgLeft ? "animate-slide-left" : "animate-slide-right") : ""}
          ${!imgLeft ? "lg:order-1" : ""}`}
      >
        <FeatureIconBox icon={icon} />
        <div>
          <h3 className="font-bold text-xl text-gray-900">{title}</h3>
          <p className="text-gray-500 mt-2 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}
