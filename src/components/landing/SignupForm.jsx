import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { submitLeadToWebhook } from "@/utils/webhookService";
import { validateForm, commonRules, cleanCityInput } from "@/utils/validation";
import { logError } from "@/utils/errorHandling";
import { saveUserInfo } from "@/utils/localStorage";
import { trackError } from "@/utils/vercelAnalytics";
import { useFormTracking } from "@/hooks/useFormTracking";

import { SectionContainer } from "@/components/ui/section-container";
import SectionDivider from "@/components/ui/SectionDivider";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // Enhanced form tracking
  const { handleFormStart, handleFormSuccess } = useFormTracking("signup_form");

  // Memoized and optimized change handler for better INP
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Use requestAnimationFrame for non-critical updates to improve INP
      requestAnimationFrame(() => {
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
      });
    },
    [errors],
  );

  // Handle field focus (form start tracking)
  const handleFieldFocus = useCallback(
    (fieldName) => {
      handleFormStart(fieldName);
    },
    [handleFormStart],
  );

  // Handle field blur
  const handleFieldBlur = useCallback(() => {
    // Field blur tracking removed - only tracking form start/completion/abandonment
  }, []);

  // Optimized submit handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Clean the city input before validation
      const cleanedFormData = {
        ...formData,
        city: cleanCityInput(formData.city),
      };

      // Check if terms are accepted
      if (!acceptedTerms) {
        setErrors((prev) => ({
          ...prev,
          terms: "يجب الموافقة على شروط الاستخدام وسياسة الخصوصية",
        }));
        return;
      }

      // Validate form using centralized validation
      const validation = validateForm(cleanedFormData, commonRules);
      if (!validation.isValid) {
        setErrors(validation.errors);

        // Track validation errors for each field
        Object.keys(validation.errors).forEach((fieldName) => {
          trackError("validation_error", validation.errors[fieldName], {
            field: fieldName,
            form: "signup_form",
          });
        });
        return;
      }

      setIsSubmitting(true);
      setErrors((prev) => ({ ...prev, submit: "" }));

      try {
        // Submit cleaned form data to webhook (initial lead payload)
        const result = await submitLeadToWebhook(cleanedFormData);

        if (!result.success) {
          throw new Error(result.message);
        }

        const leadPayload = result.data || {
          ...cleanedFormData,
          source: "Direct",
          aiAnalysis: null,
          status: false,
          submittedAt: new Date()
            .toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })
            .replace(/\//g, ".")
            .replace(",", ""),
        };

        // Persist user info for later Calendly prefill
        saveUserInfo({
          name: cleanedFormData.name,
          email: cleanedFormData.email,
        });

        setIsSubmitted(true);

        // Track successful form submission with enhanced data
        handleFormSuccess({
          user_city: cleanedFormData.city,
          has_phone: !!cleanedFormData.phone,
          submission_method: "webhook",
        });

        // Delay navigation slightly to ensure success message is visible
        setTimeout(() => {
          navigate(createPageUrl("exam"), {
            state: { formData: leadPayload },
          });
        }, 1000);
      } catch (error) {
        logError(error, "SignupForm.handleSubmit");

        // Track failed form submission (but don't track as abandonment)
        trackError("form_submission_error", error.message, {
          form: "signup_form",
          fields_completed: Object.keys(cleanedFormData).filter(
            (key) => cleanedFormData[key],
          ).length,
        });

        setErrors((prev) => ({
          ...prev,
          submit:
            error.message ||
            "حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.",
        }));
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, navigate, handleFormSuccess, acceptedTerms],
  );

  // Memoized form fields to prevent unnecessary re-renders
  const formFields = useMemo(
    () => [
      {
        id: "name",
        name: "name",
        type: "text",
        label: "الاسم الكامل",
        placeholder: "أدخل اسمك الكامل",
        autoComplete: "name",
      },
      {
        id: "email",
        name: "email",
        type: "email",
        label: "البريد الإلكتروني",
        placeholder: "أدخل بريدك الإلكتروني",
        autoComplete: "email",
      },
      {
        id: "phone",
        name: "phone",
        type: "tel",
        label: "رقم الهاتف (للتواصل عبر واتساب)",
        placeholder: "أدخل رقم هاتفك",
        autoComplete: "tel",
      },
      {
        id: "city",
        name: "city",
        type: "text",
        label: "اسم المدينة",
        placeholder: "ادخل اسم المدينة",
        autoComplete: "address-level2", // Better autocomplete for city
      },
    ],
    [],
  );

  return (
    <>
      <SectionContainer
        id="signup"
        className="bg-gray-100 pt-6 pb-10 sm:pt-10 sm:pb-20 lg:py-12"
        hasDivider
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-[2rem] shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Form Side - Fixed dimensions to prevent any layout shift */}
              <div className="w-full md:w-1/2 p-4 sm:p-8 md:p-10 relative">
                {/* Fixed height container that prevents all layout shifts */}
                <div className="min-h-[420px] sm:min-h-[500px] lg:min-h-[550px] flex flex-col justify-center relative">
                  {/* Success Message Overlay - Better positioned to prevent CLS */}
                  {isSubmitted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 z-20 backdrop-blur-sm">
                      <motion.div
                        className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 text-center max-w-sm mx-auto shadow-lg"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex justify-center mb-3">
                          <div className="rounded-full bg-green-100 p-2 sm:p-3">
                            <CheckCircle className="h-6 w-6 sm:h-10 sm:w-10 text-green-600" />
                          </div>
                        </div>
                        <h3 className="text-base sm:text-xl font-bold text-green-800 mb-1">
                          تم التسجيل بنجاح!
                        </h3>
                        <p className="text-green-700 text-xs sm:text-base">
                          شكراً لتسجيلك! سنتواصل معك قريباً عبر الواتساب.
                        </p>
                      </motion.div>
                    </div>
                  )}

                  {/* Form Container - Always maintains same dimensions */}
                  <div className="w-full">
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-3 sm:space-y-6 w-full"
                      noValidate
                    >
                      {formFields.map((field) => (
                        <div
                          key={field.id}
                          className="min-h-[65px] sm:min-h-[75px] lg:min-h-[80px]"
                        >
                          <Label
                            htmlFor={field.id}
                            className="block text-xs sm:text-sm lg:text-base text-gray-700 font-bold mb-1 sm:mb-1.5 sm:text-right"
                          >
                            {field.label}
                          </Label>
                          <Input
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            value={formData[field.name]}
                            onChange={handleChange}
                            onFocus={() => handleFieldFocus(field.name)}
                            onBlur={() => handleFieldBlur(field.name)}
                            dir="rtl"
                            autoComplete={field.autoComplete}
                            className={`w-full p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-sm sm:text-base min-h-[38px] sm:min-h-[42px] transition-colors duration-150 ${
                              errors[field.name]
                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                            }`}
                            placeholder={field.placeholder}
                          />
                          {/* Fixed height error container to prevent layout shift */}
                          <div className="h-3 sm:h-4 mt-0.5 flex items-start">
                            {errors[field.name] && (
                              <p className="text-[10px] sm:text-xs text-red-500 sm:text-right animate-in fade-in-50 duration-150">
                                {errors[field.name]}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Privacy Terms Checkbox */}
                      <div className="min-h-[50px] sm:min-h-[70px]">
                        <div className="flex items-start gap-2 flex-row-reverse">
                          <label
                            htmlFor="terms"
                            className="text-[10px] sm:text-sm text-gray-700 cursor-pointer leading-tight sm:leading-relaxed text-right flex-1"
                          >
                            הריני משאר כי קראתי, הבנתי והסכמתי ל
                            <a
                              href="/privacy-terms.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#0188D6] hover:text-[#0166a8] underline font-semibold mx-1"
                            >
                              תנאי השימוש המפורטים בתקנון ובמדיניות הפרטיות
                            </a>
                          </label>
                          <Checkbox
                            id="terms"
                            checked={acceptedTerms}
                            onCheckedChange={(checked) => {
                              setAcceptedTerms(checked);
                              if (checked && errors.terms) {
                                setErrors((prev) => ({ ...prev, terms: "" }));
                              }
                            }}
                            className="h-3 w-3 mt-0.5 shrink-0 border-gray-400"
                          />
                        </div>
                        {/* Fixed height error container */}
                        <div className="h-4 sm:h-5 mt-0.5 flex items-start justify-end">
                          {errors.terms && (
                            <p className="text-[10px] sm:text-sm text-red-500 text-right animate-in fade-in-50 duration-150">
                              {errors.terms}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Button Container - Fixed dimensions */}
                      <div className="pt-2 sm:pt-4 min-h-[55px] sm:min-h-[60px]">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#E4665A] hover:bg-[#d13a3a] disabled:bg-gray-400 text-white rounded-lg sm:rounded-xl p-2 sm:p-3 text-sm sm:text-lg font-bold min-h-[46px] sm:min-h-[52px] flex items-center justify-center transition-all duration-150 transform active:scale-95"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center text-xs sm:text-base">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              جاري التسجيل...
                            </span>
                          ) : (
                            "سجل وابدا احكي بطلاقة"
                          )}
                        </Button>
                      </div>

                      {/* Fixed height error container for submit errors */}
                      <div className="h-4 sm:h-6 flex items-start justify-center">
                        {errors.submit && (
                          <p className="text-[10px] sm:text-sm text-red-500 text-center animate-in fade-in-50 duration-150">
                            {errors.submit}
                          </p>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Blue Side - Optimized with transform for better performance */}
              <div className="w-full md:w-1/2 bg-[#0188D6] p-4 sm:p-8 md:p-10 text-white flex flex-col justify-center text-center md:text-right will-change-transform">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 title-font">
                  سجل واحصل على قاموس سلينج هدية منا الك
                  <br />{" "}
                </h2>

                <div className="bg-white/20 rounded-lg sm:rounded-xl p-2 sm:p-4 backdrop-blur-sm">
                  <p className="text-sm sm:text-lg">
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
