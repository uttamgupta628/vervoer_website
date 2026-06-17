import { useEffect, useState } from "react";
import {
  Users,
  CircleParking,
  Building2,
  Star,
} from "lucide-react";
import { useInView } from "react-intersection-observer";

import heroBg from "../assets/hero_backgroung.png";
import phoneImg from "../assets/phone_img.png";
import googlePlay from "../assets/googleplay.png";
import appStore from "../assets/appstore.png";

import Navbar from "./Navbar";

// ─── Stats Data ──────────────────────────────────────────────

const stats = [
  {
    icon: (
      <Users
        size={22}
        className="text-amber-500"
      />
    ),
    end: 50,
    suffix: "k+",
    label: "Happy Users",
  },
  {
    icon: (
      <CircleParking
        size={22}
        className="text-amber-500"
      />
    ),
    end: 10,
    suffix: "k+",
    label: "Parking Spots",
  },
  {
    icon: (
      <Building2
        size={22}
        className="text-amber-500"
      />
    ),
    end: 50,
    suffix: "+",
    label: "Cities Covered",
  },
  {
    icon: (
      <Star
        size={22}
        className="text-amber-500 fill-amber-500"
      />
    ),
    end: 98,
    suffix: "%",
    label: "Satisfaction Rate",
  },
];

export default function Hero() {
  // Trigger animation when stats card enters screen
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Counter state
  const [counts, setCounts] = useState<number[]>(
    stats.map(() => 0)
  );

  // Count animation
  useEffect(() => {
    if (!inView) return;

    stats.forEach((stat, index) => {
      let current = 0;

      const increment = Math.ceil(
        stat.end / 50
      );

      const timer = setInterval(() => {
        current += increment;

        if (current >= stat.end) {
          current = stat.end;
          clearInterval(timer);
        }

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = current;
          return updated;
        });
      }, 40);
    });
  }, [inView]);

  return (
    <section className="relative min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-[#020817]/65" />
      </div>

      {/* Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

            {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-40">
        <div className="grid lg:grid-cols-2 items-center gap-10">

          {/* Left Section */}
          <div className="text-white animate-fade-up">

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              Find Parking.
              <br />
              Schedule Laundry.
              <br />
              <span className="text-[#F59E0B]">
                Simplify Your day.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg text-gray-300 leading-relaxed">
              Vervoer combines real-time parking and professional
              laundry services into one simple mobile experience.
            </p>

            {/* Store Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <a
                href="#"
                className="hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={googlePlay}
                  alt="Get it on Google Play"
                  className="h-14 w-auto"
                />
              </a>

              <a
                href="#"
                className="hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={appStore}
                  alt="Download on the App Store"
                  className="h-14 w-auto"
                />
              </a>

            </div>

            {/* Social Proof */}
            <div className="mt-8 flex items-center gap-4">

              <div className="flex -space-x-3">
                {[11, 22, 33].map((n) => (
                  <img
                    key={n}
                    src={`https://i.pravatar.cc/40?img=${n}`}
                    alt="user"
                    className="w-10 h-10 rounded-full border-2 border-[#020817] object-cover"
                  />
                ))}
              </div>

              <div>
                <p className="text-white font-semibold">
                  50,000+ Users
                </p>

                <p className="text-sm text-gray-300">
                  Join thousands of happy drivers
                </p>
              </div>

            </div>
          </div>

          {/* Right Section - Phone */}
          <div className="relative flex justify-center lg:justify-end">

            {/* Glow */}
            <div className="absolute w-80 h-80 bg-amber-500/20 blur-3xl rounded-full" />

            <img
              src={phoneImg}
              alt="Vervoer App"
              className="relative z-10 w-[320px] md:w-[360px] lg:w-[400px] animate-float drop-shadow-[0_0_40px_rgba(0,0,0,0.6)]"
            />

          </div>

        </div>
      </div>


            {/* Floating Stats Card */}
      <div
        ref={ref}
        className="absolute left-1/2 -translate-x-1/2 bottom-[-55px] z-30 w-[92%] max-w-5xl"
      >
        <div className="bg-white rounded-3xl shadow-2xl px-8 py-6 backdrop-blur-lg">

          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">

            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="flex items-center justify-center gap-4 py-4 md:py-2 hover:scale-105 transition-transform duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                    {counts[index]}
                    {stat.suffix}
                  </h3>

                  <p className="text-xs md:text-sm text-gray-500">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

    </section>
  );
}