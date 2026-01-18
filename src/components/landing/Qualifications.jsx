import { motion } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

export default function Qualifications() {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-6 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-bold text-[#E4665A] mb-1 sm:mb-2 body-font text-sm sm:text-base">
            ⚠️ مهم تعرف!
          </span>
          <h2 className="text-xl sm:text-3xl font-bold title-font">
            🚫 مش الكل رح ينجح معنا…
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
          <motion.div
            className="bg-white rounded-xl p-5 sm:p-6 shadow-md border-r-4 border-red-500 body-font"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-red-600 title-font">
              هالدورة مش للك إذا:
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {[
                "بدك نتيجة سحرية بلا جهد",
                "مش حابب تحكي عبري فعليًا",
                "بتحب تحفظ قواعد أكتر من تحكي",
              ].map((item, index) => (
                <li key={index} className="flex items-start body-font text-sm sm:text-base">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5 ml-2">
                    <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-5 sm:p-6 shadow-md border-r-4 border-green-500 body-font"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-green-600 title-font">
              ✔️ بس إذا:
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {[
                " بدك تحكي عبري بطلاقة وبطريقة عملية",
                " تعبت من المحاولات الفاشلة",
                "مستعد تبلّش اليوم بخطوة صغيرة",
              ].map((item, index) => (
                <li key={index} className="flex items-start body-font text-sm sm:text-base">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 ml-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 sm:mt-6 text-center body-font">
              <p className="font-bold text-base sm:text-lg body-font">
                فأنت بالمكان الصح! 👌
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
