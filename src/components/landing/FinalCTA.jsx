import { motion } from "framer-motion";

import ScrollToForm from "./ScrollToForm";

export default function FinalCTA() {
  return (
    <section className="py-10 px-4 sm:py-12 sm:px-6 bg-blue-200 text-[#1D1D1B]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-2xl sm:text-4xl font-bold mb-3 title-font"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          جاهز تبلّش تحكي عبري بثقة؟
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl mb-6 opacity-90 body-font px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          احنا معك خطوة بخطوة لحد ما توصل للطلاقة! الطلب على العبري كبير -
          والاماكن محدودة جداً
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ScrollToForm
            className="bg-[#E4665A] hover:bg-[#d13a3a] text-white font-bold rounded-md px-8 py-5 sm:px-10 sm:py-7 text-base sm:text-xl transition-all shadow-lg hover:shadow-xl body-font inline-flex items-center"
            ctaLocation="final_cta_section"
            ctaName="final_register_cta"
          >
            سجّل وابدا احكي بطلاقة 🚀
          </ScrollToForm>
        </motion.div>
      </div>
    </section>
  );
}
