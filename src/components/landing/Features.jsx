import React from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Users,
  MessageCircle,
  Clock,
  BookOpen,
  ThumbsUp,
} from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Features() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-[#0188D6]" />,
      title: "+2500 طالب",
      description: "أكثر من 2500 متحدث باللغة العربية تعلموا العبرية بنجاح",
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-[#0188D6]" />,
      title: "تعلم بالمحادثة",
      description: "تعلم العبرية من خلال المحادثة، وليس بحفظ القواعد النحوية!",
    },
    {
      icon: <ThumbsUp className="h-8 w-8 text-[#0188D6]" />,
      title: "دعم شخصي",
      description: "احصل على دعم شخصي عبر الواتساب من اليوم الأول",
    },
    {
      icon: <Clock className="h-8 w-8 text-[#0188D6]" />,
      title: "تعلم بوتيرتك الخاصة",
      description: "تعلم بوتيرتك الخاصة - جدول زمني مرن يناسب احتياجاتك",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-[#0188D6]" />,
      title: "طريقة مثبتة",
      description:
        "طريقة مثبتة مصممة للمتحدثين بالعربية وتركز على المحادثة اليومية",
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-[#0188D6]" />,
      title: "دعم مستمر",
      description: "دعم مستمر من المعلمين وزملائك في الدراسة طوال رحلة التعلم",
    },
  ];

  return (
    <>
      <SectionContainer className="bg-gray-50" hasDivider>
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-4">
            <Lock className="h-5 w-5 text-[#0188D6] mr-2" />
            <h2 className="text-2xl sm:text-3xl font-bold title-font">
              لماذا تختار مدرسة ألف؟
            </h2>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow body-font flex flex-col items-center sm:items-start text-center sm:text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="rounded-full bg-blue-50 w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 title-font">
                {feature.title}
              </h3>
              <p className="text-gray-600 body-font">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
      <SectionDivider color="#aaa" />
    </>
  );
}
