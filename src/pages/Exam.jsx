import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowRight, Loader2, X, AlertTriangle } from "lucide-react";
import { questions } from "@/components/questionnaire/questions";
import { useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { updateQuestionnaireStatus } from "@/utils/googleSheets";
import { validateQuestionnaireAnswers } from "@/utils/aiProcessing";

export default function Exam() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get form data from location state
    if (location.state?.formData) {
      setFormData(location.state.formData);
      // Simulate loading delay
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      // Redirect to home if no form data
      navigate(createPageUrl("index"));
    }
  }, [location.state, navigate]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswer = answer => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));

    // Move to next question
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      console.log("Questionnaire completed with answers:", answers);

      // Validate that all required questions are answered
      const validation = validateQuestionnaireAnswers(answers);
      if (!validation.isValid) {
        alert(
          `يرجى الإجابة على جميع الأسئلة المطلوبة: ${validation.missingFields.join(
            ", "
          )}`
        );
        setIsSubmitting(false);
        return;
      }

      // Update questionnaire status to completed (true) in Google Sheets WITH REAL ANSWERS
      // The Google Apps Script will handle AI processing automatically when status becomes true
      if (formData?.email) {
        console.log(
          "📤 Sending REAL questionnaire answers to Google Apps Script for AI processing..."
        );
        const statusResult = await updateQuestionnaireStatus(
          formData,
          true,
          answers
        );
        if (!statusResult.success) {
          console.error(
            "Failed to update questionnaire status:",
            statusResult.message
          );
          // Continue anyway - don't block user experience
        } else {
          console.log(
            "✅ Questionnaire status updated with REAL answers - AI processing will be handled by Google Apps Script"
          );
        }
      }

      // Navigate to thank you page with user's name
      navigate("/thank-you", {
        state: {
          name: formData?.name,
          answers: answers,
        },
      });
    } catch (error) {
      console.error("Error completing questionnaire:", error);
      alert("حدث خطأ أثناء إنهاء الاستبيان. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuit = () => {
    setShowQuitDialog(true);
  };

  const confirmQuit = async () => {
    console.log("User chose to quit questionnaire");

    try {
      // Update questionnaire status to quit/incomplete (false) in Google Sheets
      if (formData?.email) {
        const statusResult = await updateQuestionnaireStatus(formData, false);
        if (!statusResult.success) {
          console.error(
            "Failed to update questionnaire status:",
            statusResult.message
          );
          // Continue anyway - don't block user experience
        }
      }
    } catch (error) {
      console.error("Error updating questionnaire status:", error);
      // Continue anyway - don't block user experience
    }

    setShowQuitDialog(false);
    // Navigate to thank you page with user's name
    navigate("/thank-you", { state: { name: formData?.name } });
  };

  const cancelQuit = () => {
    setShowQuitDialog(false);
  };
  // Calculate progress percentage
  const progressPercentage = Math.min(
    ((currentQuestionIndex + 1) / totalQuestions) * 100,
    100
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-xl font-medium text-gray-600">
            جاري تحميل الاختبار...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Quit Confirmation Dialog */}
      <AlertDialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
        <AlertDialogContent className="max-w-md" dir="rtl">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-orange-100 rounded-full p-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <AlertDialogTitle className="text-lg font-bold">
                تأكيد الخروج من الاستبيان
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base text-gray-600 leading-relaxed">
              هل أنت متأكد من أنك تريد الخروج من الاستبيان؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-2">
            <AlertDialogCancel
              onClick={cancelQuit}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
            >
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmQuit}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              نعم، الخروج من الاستبيان
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="min-h-screen bg-gray-50 font-almoni" dir="rtl">
        {/* Header with progress bar and quit button */}
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
          <div className="max-w-3xl mx-auto px-4 py-2">
            {/* Top row with quit button */}
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-lg font-bold text-gray-800">
                اختبار تحديد المستوى
              </h1>
            </div>

            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>
                {currentQuestionIndex + 1} من {totalQuestions}
              </span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto pt-20 pb-20 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-md p-6 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-6">
                {currentQuestion.title}
              </h2>

              <div className="space-y-4">
                {currentQuestion.options.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      answers[currentQuestion.id] === option.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {option.icon}
                      <div className="text-right">
                        <div className="font-medium">{option.label}</div>
                        {option.description && (
                          <div className="text-sm text-gray-500 mt-1">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Action buttons */}
              <div className="mt-8 space-y-3">
                {currentQuestionIndex === totalQuestions - 1 && (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        جاري الإرسال...
                      </>
                    ) : (
                      "إنهاء الاختبار"
                    )}
                  </Button>
                )}

                {/* Quit button - always visible */}
                <Button
                  onClick={handleQuit}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-600 hover:text-red-500"
                >
                  <X className="h-4 w-4 ml-2" />
                  تخطي الاستبيان
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
