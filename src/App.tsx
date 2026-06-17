import { BrowserRouter, Routes, Route } from "react-router-dom";
import VervoerLanding from "./components/VerveorLanding";
import ParkingServices from "./components/Parkingservices";
import LaundryServices from "./components/Laundryservices";
import Contact from "./components/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VervoerLanding />} />
        <Route path="/parking-services" element={<ParkingServices />} />
        <Route path="/laundry-services" element={<LaundryServices />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}