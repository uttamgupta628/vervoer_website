import {
  Users,
  CircleParking,
  Building2,
  Star,
} from "lucide-react";

import heroBg from "../assets/hero_backgroung.png";
import phoneImg from "../assets/phone_img.png";
import googlePlay from "../assets/googleplay.png";
import appStore from "../assets/appstore.png";

import Navbar from "./Navbar";

const stats = [
  { icon: <Users size={22} className="text-amber-500" />, value: "50k+", label: "Happy Users" },
  { icon: <CircleParking size={22} className="text-amber-500" />, value: "10k+", label: "Parking Spots" },
  { icon: <Building2 size={22} className="text-amber-500" />, value: "50+", label: "Cities Covered" },
  { icon: <Star size={22} className="text-amber-500 fill-amber-500" />, value: "98%", label: "Satisfaction Rate" },
];

export default function Hero() {
  return (
    // ❌ Removed overflow-hidden from here — it was clipping the floating stats card
    <section className="relative min-h-screen">

      {/* Background image + overlay — overflow hidden scoped only to this inner div */}
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

          {/* Left */}
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Find Parking.
              <br />
              Schedule Laundry.
              <br />
              <span className="text-[#F59E0B]">Simplify Your day.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg text-gray-300 leading-relaxed">
              Vervoer combines real-time parking and professional laundry
              services into one simple mobile experience.
            </p>

            {/* Store Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#" className="hover:scale-105 transition-transform duration-300">
                <img src={googlePlay} alt="Google Play" className="h-14 w-auto" />
              </a>
              <a href="#" className="hover:scale-105 transition-transform duration-300">
                <img src={appStore} alt="App Store" className="h-14 w-auto" />
              </a>
            </div>

            {/* Avatar stack */}
            <div className="mt-8 flex items-center gap-3">
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
              <span className="text-gray-300 text-sm">Join 50,000+ happy drivers</span>
            </div>
          </div>

          {/* Right — Phone mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute w-80 h-80 bg-amber-500/20 blur-3xl rounded-full" />
            <img
              src={phoneImg}
              alt="Vervoer App"
              className="relative z-10 w-[320px] lg:w-[380px] animate-float drop-shadow-[0_0_40px_rgba(0,0,0,0.6)]"
            />
          </div>

        </div>
      </div>

      {/* Floating Stats Card — sits below hero, overlapping into next section */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-55px] z-30 w-[92%] max-w-5xl">
        <div className="bg-white rounded-3xl shadow-2xl px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-center gap-4 py-4 md:py-2"
              >
                <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}