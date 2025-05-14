import React from "react";
import ScrollToForm from "./ScrollToForm";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 bg-gray-50 z-50 py-4 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left side - Contact Us button */}
        <div className="order-last">
          <ScrollToForm className="text-[#0188D6] text-lg hover:text-[#0165a3] transition-colors font-medium">
            تواصل معنا
          </ScrollToForm>
        </div>

        {/* Right side - Logo and name */}
        <div className="flex items-center gap-3">
          <div className="w-20 h-20  flex items-center justify-center">
            <img
              src="/alef-logo2.jpeg"
              alt="Alef School Logo"
              className="w-20 h-20 bg-transparent"
            />
          </div>
          <div className="flex flex-col items-start">
            {/* <h1 className="text-2xl font-bold">ALEFH SCHOOL</h1>
            <span className="text-[#0188D6] text-lg">مدرسة ألف</span> */}
          </div>
        </div>
      </div>
    </header>
  );
}
