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

  const lines = [
  "Find Parking.",
  "Schedule Laundry.",
  "Simplify Your day.",
];

const [displayedLines, setDisplayedLines] = useState([
  "",
  "",
  "",
]);

useEffect(() => {
  let lineIndex = 0;
  let charIndex = 0;

  const typeNext = () => {
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];

    if (charIndex <= currentLine.length) {
      setDisplayedLines((prev) => {
        const updated = [...prev];
        updated[lineIndex] = currentLine.slice(0, charIndex);
        return updated;
      });

      charIndex++;
      setTimeout(typeNext, 80); // typing speed
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNext, 400); // delay before next line
    }
  };

  typeNext();
}, []);

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

  const duration = 2000; // counting duration
  const pause = 3000; // wait after reaching max

  const animateCounters = () => {
    const start = Date.now();

    const timer = setInterval(() => {
      const progress = Math.min(
        (Date.now() - start) / duration,
        1
      );

      setCounts(
        stats.map((stat) =>
          Math.floor(stat.end * progress)
        )
      );

      if (progress === 1) {
        clearInterval(timer);

        setTimeout(() => {
          animateCounters(); // restart
        }, pause);
      }
    }, 30);
  };

  animateCounters();
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
<h1 className="font-lora text-5xl md:text-6xl lg:text-6xl font-semibold leading-tight tracking-tight">
  {/* Line 1 */}
  <div className="min-h-[70px] md:min-h-[85px] lg:min-h-[95px]">
    {displayedLines[0]}
    {displayedLines[0].length < lines[0].length && (
      <span className="animate-pulse">|</span>
    )}
  </div>

  {/* Line 2 */}
  <div className="min-h-[70px] md:min-h-[85px] lg:min-h-[95px]">
    {displayedLines[1]}
    {displayedLines[1].length > 0 &&
      displayedLines[1].length < lines[1].length && (
        <span className="animate-pulse">|</span>
      )}
  </div>

  {/* Line 3 */}
  <div className="text-[#F59E0B] min-h-[70px] md:min-h-[85px] lg:min-h-[95px]">
    {displayedLines[2]}
    {displayedLines[2].length > 0 &&
      displayedLines[2].length < lines[2].length && (
        <span className="animate-pulse">|</span>
      )}
  </div>
</h1>

            <p className="mt-6 max-w-md text-lg text-gray-300 leading-relaxed">
              Vervoer combines real-time parking and professional
              laundry services into one simple mobile experience.
            </p>

            {/* Store Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <a
                href="https://play.google.com/store/apps/details?id=com.uttam.verover"
                className="hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={googlePlay}
                  alt="Get it on Google Play"
                  className="h-14 w-auto rounded-xl"
                />
              </a>

              <a
                href="#"
                className="hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={appStore}
                  alt="Download on the App Store"
                  className="h-14 w-auto rounded-xl"
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