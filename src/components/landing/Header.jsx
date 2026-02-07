import ScrollToForm from "./ScrollToForm";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 bg-gray-50/95 backdrop-blur-sm z-[100] py-2 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center h-14 sm:h-16 px-4 sm:px-10">
        {/* Left side - Contact Us button */}
        <div className="order-last">
          <ScrollToForm
            className="text-[#0188D6] text-sm sm:text-lg hover:text-[#0165a3] transition-colors font-medium px-3 py-2 sm:px-4 sm:py-2 rounded-md"
            ctaLocation="cta-header"
            ctaName="header_contact_cta"
          >
            تواصل معنا
          </ScrollToForm>
        </div>

        {/* Right side - Logo and name */}
        <div className="flex items-center gap-2 sm:gap-3 h-full">
          <div className="h-full flex items-center justify-center py-1 sm:py-2">
            <img
              src="/alef-logo2-removebg-preview.png"
              alt="Alef School Logo"
              className="h-10 w-auto sm:h-20 bg-transparent object-contain"
            />
          </div>
          <div className="flex flex-col items-start"></div>
        </div>
      </div>
    </header>
  );
}
