import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { submitToGoogleSheets } from "@/utils/googleSheets";
import { validateForm, commonRules } from "@/utils/validation";
import { logError } from "@/utils/errorHandling";

import { SectionContainer } from "@/components/ui/section-container";
import SectionDivider from "@/components/ui/SectionDivider";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form using centralized validation
    const validation = validateForm(formData, commonRules);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, submit: "" }));

    try {
      // Submit form data to Google Sheets
      const result = await submitToGoogleSheets(formData);

      if (!result.success) {
        throw new Error(result.message);
      }

      setIsSubmitted(true);

      // Navigate to exam page with form data
      navigate(createPageUrl("exam"), {
        state: { formData },
      });
    } catch (error) {
      logError(error, "SignupForm.handleSubmit");
      setErrors((prev) => ({
        ...prev,
        submit:
          error.message ||
          "حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SectionContainer
        id="signup"
        className="bg-gray-100 pt-8 pb-16 sm:pt-10 sm:pb-20"
        hasDivider
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-[2rem] shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Form Side */}
              <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-12">
                {/* <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 title-font text-center sm:text-right">
                  سجل للحصول على تقييم مجاني
                </h2> */}

                {isSubmitted ? (
                  <motion.div
                    className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="rounded-full bg-green-100 p-2 sm:p-3">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">
                      تم التسجيل بنجاح!
                    </h3>
                    <p className="text-green-700 text-sm sm:text-base">
                      شكراً لتسجيلك! سنتواصل معك قريباً عبر الواتساب.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div>
                      <Label
                        htmlFor="name"
                        className="block text-sm sm:text-base text-gray-700 font-bold mb-1 sm:mb-2 sm:text-right"
                      >
                        الاسم الكامل
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        dir="rtl"
                        className={`w-full p-2 sm:p-3 rounded-xl text-sm sm:text-base ${
                          errors.name
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200"
                        }`}
                        placeholder="أدخل اسمك الكامل"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs sm:text-sm text-red-500 sm:text-right">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="email"
                        className="block text-sm sm:text-base font-bold text-gray-700 mb-1 sm:mb-2 sm:text-right"
                      >
                        البريد الإلكتروني
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        dir="rtl"
                        className={`w-full p-2 sm:p-3 rounded-xl text-sm sm:text-base ${
                          errors.email
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200"
                        }`}
                        placeholder="أدخل بريدك الإلكتروني"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs sm:text-sm text-red-500 text-center sm:text-right">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="phone"
                        className="block text-sm sm:text-base font-bold text-gray-700 mb-1 sm:mb-2 sm:text-right"
                      >
                        رقم الهاتف (للتواصل عبر واتساب)
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        dir="rtl"
                        className={`w-full p-2 sm:p-3 rounded-xl text-sm sm:text-base ${
                          errors.phone
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200"
                        }`}
                        placeholder="أدخل رقم هاتفك"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs sm:text-sm text-red-500 text-center sm:text-right">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="city"
                        className="block text-sm sm:text-base text-gray-700 font-bold mb-1 sm:mb-2 sm:text-right"
                      >
                        اسم المدينة
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        dir="rtl"
                        className={`w-full p-2 sm:p-3 rounded-xl text-sm sm:text-base ${
                          errors.city
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200"
                        }`}
                        placeholder="ادخل اسم المدينة"
                      />
                      {errors.city && (
                        <p className="mt-1 text-xs sm:text-sm text-red-500 sm:text-right">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#E4665A] hover:bg-[#d13a3a] text-white rounded-xl p-2 sm:p-3 text-base sm:text-lg transition-colors font-bold"
                    >
                      {isSubmitting
                        ? "جاري التسجيل..."
                        : "سجل وابدا احكي بطلاقة "}
                    </Button>

                    {errors.submit && (
                      <p className="mt-2 text-xs sm:text-sm text-red-500 text-center">
                        {errors.submit}
                      </p>
                    )}
                  </form>
                )}
              </div>

              {/* Blue Side */}
              <div className="w-full md:w-1/2 bg-[#0188D6] p-5 sm:p-8 md:p-12 text-white flex flex-col justify-center text-center md:text-right">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 title-font">
                  سجل واحصل على قاموس سلينج هدية منا الك
                  <br />{" "}
                </h2>

                {/* <p className="text-base sm:text-lg mb-6 sm:mb-8">
                  سجل تفاصيلك وخلينا نبعتلك <br />
                  فيديو ترحيبي واختبار صغير.
                </p> */}

                {/* <div className="bg-white/20 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                  <p className="text-base sm:text-lg">
                    " 🕐 خلال 10 دقايق بتوصلك
                    <br />
                    رسالة ترحيب عالواتساب – خليك جاهز! "
                  </p>
                </div> */}
                <div className="bg-white/20 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                  <p className="text-base sm:text-lg">
                    🕐 خلال 24 ساعة راح نتواصل معك
                    <br />
                    خليك جاهز!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
      <SectionDivider color="#E4665A" />
    </>
  );
}
