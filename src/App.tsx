import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import VervoerLanding from "./components/VerveorLanding";
import ParkingServices from "./components/Parkingservices";
import LaundryServices from "./components/Laundryservices";
import Contact from "./components/Contact";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-amber-500 text-white
        flex items-center justify-center shadow-lg shadow-amber-200
        hover:bg-amber-600 hover:scale-110 transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopButton />
      <Routes>
        <Route path="/" element={<VervoerLanding />} />
        <Route path="/parking-services" element={<ParkingServices />} />
        <Route path="/laundry-services" element={<LaundryServices />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}