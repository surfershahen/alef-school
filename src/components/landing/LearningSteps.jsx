import { Phone, MessageCircle, CheckCircle } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";

export default function LearningSteps() {
  return (
    <>
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 title-font">
              كيف بتبلّش؟ (3 خطوات بسيطة)
            </h2>
            <p className="text-base sm:text-xl text-gray-600"></p>
          </div>

          <div className="relative">
            {/* Step Numbers */}
            <div className="hidden md:flex justify-between absolute top-0 left-0 right-0 -mt-5">
              <div className="w-20 h-15 rounded-full bg-[#E3B134] flex items-center justify-center text-white text-3xl font-bold">
                1
              </div>
              <div className="w-20 h-15 rounded-full bg-[#0188D6] flex items-center justify-center text-white text-3xl font-bold">
                2
              </div>
              <div className="w-20 h-15 rounded-full bg-[#E4665A] flex items-center justify-center text-white text-3xl font-bold">
                3
              </div>
            </div>

            {/* Step Cards */}
            <div className="grid md:grid-cols-3 gap-4 sm:gap-8 mt-4 sm:mt-10">
              {/* Step 1 - Fill Form (Right Position) */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 h-full text-center">
                {/* Mobile number (shown only on mobile) */}
                <div className="md:hidden flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#E4665A] flex items-center justify-center text-white text-xl font-bold">
                    1
                  </div>
                </div>
                <div className="w-12 h-12 sm:w-20 sm:h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#E4665A]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 title-font">
                  ملء النموذج
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  قم بملء النموذج القصير أعلاه بمعلوماتك الأساسية. هذه أول خطوة
                  نحو إتقان العبرية.
                </p>
              </div>

              {/* Step 2 - Welcome Message (Middle Position) */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 h-full text-center">
                {/* Mobile number (shown only on mobile) */}
                <div className="md:hidden flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#0188D6] flex items-center justify-center text-white text-xl font-bold">
                    2
                  </div>
                </div>
                <div className="w-12 h-12 sm:w-20 sm:h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#0188D6]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 title-font">
                  استلام رسالة ترحيبية
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  بتوصلك رسالة وفيديو ترحيبي عالواتساب
                </p>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 h-full text-center">
                {/* Mobile number (shown only on mobile) */}
                <div className="md:hidden flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#E3B134] flex items-center justify-center text-white text-xl font-bold">
                    3
                  </div>
                </div>
                <div className="w-12 h-12 sm:w-20 sm:h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-[#E3B134]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 title-font">
                  اختبار قصير واتصال
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  اعمل تقييم اولي لمستواك وبنحكي معك شو الأنسب إلك{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider color="#E3B134" />
    </>
  );
}
