import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import SectionDivider from "@/components/ui/SectionDivider";
import { features } from "@/data/features";

export default function Features() {
  return (
    <>
      <SectionContainer className="bg-gray-150" hasDivider>
        <motion.div
          className="text-center mb-6 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-3 sm:mb-4">
            <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-[#0188D6] mr-2" />
            <h2 className="text-xl sm:text-3xl font-bold title-font">
              ليش تختار <span className="text-[#0188D6]">اكاديمية</span>{" "}
              <span className="text-red-500">אלף</span>?
            </h2>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow body-font flex flex-col items-center sm:items-start text-center sm:text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="rounded-full bg-blue-50 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4">
                {/* Adjust icon size if possible, or just scale it */}
                <div className="scale-75 sm:scale-100">{feature.icon}</div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 title-font">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 body-font">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      <SectionDivider color="#0188D6" />
    </>
  );
}
