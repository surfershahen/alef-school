import React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

export default function Qualifications() {
  return (
    <section className="py-12 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-bold text-[#E4665A] mb-2 body-font">
            ⚡ معلومات مهمة!
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold title-font">
            🚫 ليس كل شخص سينجح في تعلم العبرية معنا...
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white rounded-xl p-6 shadow-md border-r-4 border-red-500 body-font"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-4 text-red-600 title-font">
              هذا البرنامج ليس لك إذا:
            </h3>
            <ul className="space-y-4">
              {[
                "كنت تبحث عن نتائج سريعة دون بذل الحد الأدنى من الجهد.",
                "لم تكن جادًا في ممارسة التواصل باللغة العبرية.",
                "كنت تفضل حفظ قواعد النحو على التحدث.",
              ].map((item, index) => (
                <li key={index} className="flex items-start body-font">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5 ml-2">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-md border-r-4 border-green-500 body-font"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 text-green-600 title-font">
              هذا البرنامج مناسب لك إذا:
            </h3>
            <ul className="space-y-4">
              {[
                "كنت مستعدًا للتوقف عن التأجيل واتخاذ إجراء مع طريقة مثبتة.",
                "كنت تحلم بالتحدث باللغة العبرية بثقة في الحياة اليومية.",
                "كنت تبحث عن طريقة ذكية وبسيطة وداعمة لتعلم العبرية.",
              ].map((item, index) => (
                <li key={index} className="flex items-start body-font">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 ml-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center body-font">
              <p className="font-bold text-lg body-font">
                👉 إذن هذا البرنامج هو بالضبط لك!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
