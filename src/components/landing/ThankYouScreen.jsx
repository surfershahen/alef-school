import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, PhoneCall } from "lucide-react";

export default function ThankYouScreen({ name }) {
  const firstName = name ? name.split(" ")[0] : "";

  return (
    <div className="text-center py-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="h-12 w-12 text-green-600" />
      </motion.div>

      <h1 className="text-3xl font-bold text-[#0188D6] mb-6">
        شكراً لك {firstName}!
      </h1>

      <p className="text-xl text-gray-700 mb-8">
        تم استلام إجاباتك بنجاح. استناداً إلى ردودك، يمكننا مساعدتك في تحسين
        مهاراتك في اللغة العبرية.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-md mx-auto mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <PhoneCall className="h-6 w-6 text-blue-600" />
          </div>
          <div className="mr-4 text-right">
            <h3 className="font-bold text-xl">الخطوة التالية</h3>
            <p className="text-gray-600">
              ستتلقى اتصالاً من أحد خبرائنا قريباً
            </p>
          </div>
        </div>

        <p className="text-gray-700">
          سيتواصل معك أحد مستشارينا المتخصصين خلال 24 ساعة لمناقشة نتائج التقييم
          ومساعدتك في اختيار البرنامج المناسب لاحتياجاتك.
        </p>
      </div>

      <p className="text-gray-600">
        في الوقت نفسه، ستصلك رسالة على الواتساب تحتوي على بعض الموارد المفيدة
        لبدء رحلتك في تعلم العبرية.
      </p>
    </div>
  );
}
