import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import logo from "../assets/logo.png";
import phoneImg from "../assets/footer-phone.png";
import bgImage from "../assets/footer-background.png";

export default function Footer() {
  return (
    <section className="bg-[#f4f4f4] pt-20">
      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 relative z-20">
        <div className="relative bg-[#F79400] rounded-[30px] px-12 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between shadow-2xl">

          {/* Phone */}
          <div className="absolute -top-20 left-8 hidden md:block animate-float">
            <img src={phoneImg} alt="Phone" className="h-64 w-auto drop-shadow-2xl" />
          </div>

          {/* Text */}
          <div className="md:ml-56 text-black">
            <h2 className="text-5xl font-medium mb-3">Ready to Park Smarter?</h2>
            <p className="text-xl max-w-xl text-black">
              Download the Vervoer app and find your perfect parking spot today!
            </p>
          </div>

          {/* Store Buttons */}
          <div className="flex flex-col gap-4 mt-6 md:mt-0">
            <a href="https://play.google.com/store/apps/details?id=com.uttam.verover" className="hover:scale-105 transition-transform duration-300">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-14 cursor-pointer hover:scale-105 transition duration-300"
            />
            </a>
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-14 cursor-pointer hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </div>

      {/* Footer Background */}
      <footer
        className="relative -mt-24 bg-cover bg-center pt-40 pb-12 px-4"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 rounded-[30px] p-12 shadow-xl">
            <div className="grid md:grid-cols-3 gap-12">

              {/* Logo + Social */}
              <div>
                <img src={logo} alt="Vervoer" className="h-16 w-auto mb-8" />
                <h4 className="text-3xl font-semibold mb-5">follow us on:</h4>
                <div className="flex gap-5 text-3xl text-slate-800">
                  <FaFacebook className="cursor-pointer hover:text-[#F79400] hover:scale-110 transition-all" />
                  <FaInstagram className="cursor-pointer hover:text-[#F79400] hover:scale-110 transition-all" />
                  <FaXTwitter className="cursor-pointer hover:text-[#F79400] hover:scale-110 transition-all" />
                  <FaLinkedin className="cursor-pointer hover:text-[#F79400] hover:scale-110 transition-all" />
                  <FaYoutube className="cursor-pointer hover:text-[#F79400] hover:scale-110 transition-all" />
                </div>
              </div>

              {/* Links */}
              <div>
                <h5 className="text-2xl font-semibold mb-8">Links</h5>
                <div className="space-y-4 text-xl font-small">
                  <a href="#parking" className="block transition-all duration-200 hover:text-[#F79400] hover:font-bold">
                    Parking Services
                  </a>
                  <a href="#laundry" className="block transition-all duration-200 hover:text-[#F79400] hover:font-bold">
                    Laundry Services
                  </a>
                  <a href="#download" className="block transition-all duration-200 hover:text-[#F79400] hover:font-bold">
                    Download The App
                  </a>
                  <a href="#" className="block transition-all duration-200 hover:text-[#F79400] hover:font-bold">
                    Privacy Policy
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-2xl font-semibold mb-8">Contact</h3>
                <div className="space-y-5 text-xl font-small">
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:joward2001@vervoerapp.com"
                      className="underline transition-all duration-200 hover:text-[#F79400] hover:font-bold"
                    >
                      joward2001@vervoerapp.com
                    </a>
                  </p>
                  <p>
                    Message:{" "}
                    <a
                      href="#contact"
                      className="underline transition-all duration-200 hover:text-[#F79400] hover:font-bold"
                    >
                      Use Our Contact Form
                    </a>
                  </p>
                  <p className="pt-4">
                    <a
                      href="#"
                      className="underline transition-all duration-200 hover:text-[#F79400] hover:font-bold"
                    >
                      Terms and Conditions
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 mt-12 pt-6 text-center text-gray-600">
              {"\u00A9"} 2025 Vervoer. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}