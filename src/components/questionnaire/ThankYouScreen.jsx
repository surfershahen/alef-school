import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ThankYouScreen({ name }) {
  // Extract first name
  const firstName = name?.split(" ")[0] || "";
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-green-100 rounded-full p-6">
          <CheckCircle2 className="text-green-600 h-16 w-16" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold text-gray-800 mb-4"
      >
        شكراً لك {firstName}!
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-xl mb-6 text-gray-600"
      >
        تم تلقي إجاباتك بنجاح
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <Phone className="text-[#0188D6] h-6 w-6" />
          <h3 className="font-bold text-lg text-[#0188D6]">الخطوة التالية</h3>
        </div>
        <p className="text-gray-700">
          سيقوم أحد خبرائنا بالاتصال بك خلال الـ 24 ساعة القادمة لمناقشة خطة
          تعلم مخصصة تناسب احتياجاتك واهدافك.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button
          onClick={() => navigate("/")}
          className="bg-[#0188D6] hover:bg-[#0165a3] text-white px-6 py-3 rounded-lg text-lg"
        >
          العودة إلى الصفحة الرئيسية
        </Button>
      </motion.div>
    </div>
  );
}
