import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, CheckCircle } from "lucide-react";

export default function LearningSteps() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 title-font">
            كيف تبدأ رحلة تعلم العبرية معنا
          </h2>
          <p className="text-xl text-gray-600">
            ثلاث خطوات بسيطة تفصلك عن بدء رحلتك في تعلم العبرية بسهولة وبدون
            تعقيد
          </p>
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
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {/* Step 1 - Fill Form (Right Position) */}
            <div className="bg-white rounded-2xl shadow p-8 h-full text-center">
              {/* Mobile number (shown only on mobile) */}
              <div className="md:hidden flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#E4665A] flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
              </div>
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#E4665A]" />
              </div>
              <h3 className="text-xl font-bold mb-4 title-font">ملء النموذج</h3>
              <p className="text-gray-600">
                قم بملء النموذج القصير أعلاه بمعلوماتك الأساسية. هذه أول خطوة
                نحو إتقان العبرية.
              </p>
            </div>

            {/* Step 2 - Welcome Message (Middle Position) */}
            <div className="bg-white rounded-2xl shadow p-8 h-full text-center">
              {/* Mobile number (shown only on mobile) */}
              <div className="md:hidden flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#0188D6] flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
              </div>
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-[#0188D6]" />
              </div>
              <h3 className="text-xl font-bold mb-4 title-font">
                استلام رسالة ترحيبية
              </h3>
              <p className="text-gray-600">
                ستتلقى فيديو ترحيبي ورسالة على واتساب خلال دقائق من التسجيل
                لمساعدتك في البدء.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow p-8 h-full text-center">
              {/* Mobile number (shown only on mobile) */}
              <div className="md:hidden flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#E3B134] flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
              </div>
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-[#E3B134]" />
              </div>
              <h3 className="text-xl font-bold mb-4 title-font">
                اختبار قصير واتصال
              </h3>
              <p className="text-gray-600">
                ستأخذ اختبارًا قصيرًا لتحديد مستواك، ثم انتظر مكالمة من أحد
                مستشارينا المختصين.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
