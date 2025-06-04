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
import { handleApiError, logError } from "@/utils/errorHandling";

export default function Exam() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [error, setError] = useState(null);
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
    setError(null);

    try {
      console.log("Questionnaire completed with answers:", answers);

      // Validate that all required questions are answered
      const validation = validateQuestionnaireAnswers(answers);
      if (!validation.isValid) {
        throw new Error(
          `يرجى الإجابة على جميع الأسئلة المطلوبة: ${validation.missingFields.join(
            ", "
          )}`
        );
      }

      // Update questionnaire status to completed (true) in Google Sheets WITH REAL ANSWERS
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
          logError(statusResult, "Exam.handleSubmit");
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
      logError(error, "Exam.handleSubmit");
      setError(
        error.message ||
          "حدث خطأ أثناء إنهاء الاستبيان. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuit = () => {
    setShowQuitDialog(true);
  };

  const confirmQuit = async () => {
    console.log("User chose to quit questionnaire");
    setError(null);

    try {
      // Update questionnaire status to quit/incomplete (false) in Google Sheets
      if (formData?.email) {
        const statusResult = await updateQuestionnaireStatus(formData, false);
        if (!statusResult.success) {
          logError(statusResult, "Exam.confirmQuit");
          // Continue anyway - don't block user experience
        }
      }
    } catch (error) {
      logError(error, "Exam.confirmQuit");
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-sm text-gray-600 mt-2 text-center">
            السؤال {currentQuestionIndex + 1} من {totalQuestions}
          </p>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold mb-6 text-right">
            {currentQuestion.title}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 text-right flex items-center justify-between ${
                  answers[currentQuestion.id] === option.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                dir="rtl"
              >
                <div className="flex items-center gap-3">
                  {option.icon && (
                    <span className="text-gray-600">{option.icon}</span>
                  )}
                  <div className="text-right">
                    <p className="font-medium">{option.label}</p>
                    {option.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <Button
            onClick={handleQuit}
            variant="outline"
            className="text-red-500 hover:text-red-600"
          >
            <X className="h-5 w-5 ml-2" />
            إنهاء الاختبار
          </Button>

          {currentQuestionIndex === totalQuestions - 1 && (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  إنهاء
                  <ArrowRight className="h-5 w-5 mr-2" />
                </>
              )}
            </Button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 ml-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Quit Confirmation Dialog */}
        <AlertDialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                هل أنت متأكد من إنهاء الاختبار؟
              </AlertDialogTitle>
              <AlertDialogDescription>
                سيتم حفظ إجاباتك حتى الآن، ولكن لن تتمكن من إكمال الاختبار
                لاحقاً.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelQuit}>إلغاء</AlertDialogCancel>
              <AlertDialogAction onClick={confirmQuit}>
                نعم، إنهاء الاختبار
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
