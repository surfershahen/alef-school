import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ScrollToForm from "./ScrollToForm";

export default function FinalCTA() {
  return (
    <section className="py-12 px-4 sm:px-6 bg-gradient-to-r from-[#0188D6] to-[#0165a3] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-4 title-font"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          هل أنت مستعد للتحدث بالعبرية بثقة؟
        </motion.h2>

        <motion.p
          className="text-xl mb-8 opacity-90 body-font"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          اتخذ الخطوة الأولى اليوم! انضم إلى آلاف المتحدثين بالعربية الذين
          اكتشفوا مدى سهولة وإثارة تعلم العبرية مع مدرسة ألف.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ScrollToForm className="bg-[#E4665A] hover:bg-[#d13a3a] text-white font-bold rounded-md px-10 py-7 text-xl transition-all shadow-lg hover:shadow-xl body-font inline-flex items-center">
            نعم، أريد البدء الآن!
          </ScrollToForm>

          <p className="text-sm mt-4 opacity-80 body-font">
            🚀 الأماكن محدودة — احجز مكانك اليوم وابدأ رحلتك مع اللغة العبرية!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
