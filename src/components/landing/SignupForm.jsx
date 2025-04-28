import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!/^[0-9+\s()-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "يرجى إدخال رقم هاتف صحيح";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Save form data to backend
      console.log("Form data:", formData);

      // Navigate to exam page with form data
      navigate(createPageUrl("exam"), {
        state: { formData },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="signup" className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Form Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-8 title-font">
                سجل للحصول على تقييم مجاني
              </h2>

              {isSubmitted ? (
                <motion.div
                  className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-green-100 p-3">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    تم التسجيل بنجاح!
                  </h3>
                  <p className="text-green-700">
                    شكراً لتسجيلك! سنتواصل معك قريباً عبر الواتساب.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label
                      htmlFor="name"
                      className="block text-base font-medium text-gray-700 mb-2"
                    >
                      الاسم الكامل
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-xl text-base ${
                        errors.name
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200"
                      }`}
                      placeholder="أدخل اسمك الكامل"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="block text-base font-medium text-gray-700 mb-2"
                    >
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-xl text-base ${
                        errors.email
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200"
                      }`}
                      placeholder="أدخل بريدك الإلكتروني"
                      dir="ltr"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="phone"
                      className="block text-base font-medium text-gray-700 mb-2"
                    >
                      رقم الهاتف (للتواصل عبر واتساب)
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-xl text-base ${
                        errors.phone
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200"
                      }`}
                      placeholder="أدخل رقم هاتفك مع رمز الدولة"
                      dir="ltr"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#E4665A] hover:bg-[#d13a3a] text-white rounded-xl p-3 text-lg font-medium transition-colors"
                  >
                    {isSubmitting ? "جاري التسجيل..." : "ابدأ التقييم المجاني"}
                  </Button>

                  <p className="text-sm text-center text-gray-500 mt-4">
                    بالتسجيل، أنت توافق على{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      شروط الاستخدام
                    </a>{" "}
                    و{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      سياسة الخصوصية
                    </a>
                  </p>
                </form>
              )}
            </div>

            {/* Blue Side */}
            <div className="w-full md:w-1/2 bg-[#0188D6] p-8 md:p-12 text-white flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 title-font">
                خطوة واحدة تفصلك
                <br />
                عن إتقان العبرية
              </h2>

              <p className="text-lg mb-8">
                سجل الآن واحصل على تقييم شخصي
                <br />
                لمستواك الحالي في العبرية.
              </p>

              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-lg">
                  "ستتلقى رسالة ترحيبية على واتساب
                  <br />
                  خلال 10 دقائق من تسجيلك"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
