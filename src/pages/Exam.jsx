import { useState, useEffect, useCallback, useMemo } from "react";
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
import { ArrowRight, ArrowLeft, Loader2, X, AlertTriangle } from "lucide-react";
import { questions } from "@/components/questionnaire/questions";
import { useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { updateQuestionnaireStatus } from "@/utils/googleSheets";
import { validateQuestionnaireAnswers } from "@/utils/aiProcessing";
import {
  trackPageView,
  trackExamProgress,
  trackExamCompletion,
  trackExamAbandonment,
} from "@/utils/vercelAnalytics";
import { trackMetaPixelPageView } from "@/utils/metaPixel";
import { trackTikTokPageView, trackTikTokEvent } from "@/utils/tiktokPixel";
import { logError } from "@/utils/errorHandling";
import { examPerformanceTracker } from "@/utils/performance";

// Optimized animation variants for better performance
const questionVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const optionVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export default function Exam() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([0])); // Track visited questions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [error, setError] = useState(null);
  const [examStartTime, setExamStartTime] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Memoize current question to prevent unnecessary re-renders
  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [currentQuestionIndex]
  );
  const totalQuestions = useMemo(() => questions.length, []);

  // Memoize progress percentage
  const progressPercentage = useMemo(
    () => Math.min(((currentQuestionIndex + 1) / totalQuestions) * 100, 100),
    [currentQuestionIndex, totalQuestions]
  );

  // Check if back button should be shown
  const canGoBack = useMemo(
    () => currentQuestionIndex > 0,
    [currentQuestionIndex]
  );

  // Remove canGoNext logic - we don't need Next button

  useEffect(() => {
    // Track page view
    trackPageView("exam_page");
    trackMetaPixelPageView("exam_page");
    trackTikTokPageView("exam_page");
    trackTikTokEvent("ViewContent", { content_name: "exam_page" });
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
      window.fbq("track", "Lead");
    }

    // Initialize performance tracking for exam
    if (examPerformanceTracker) {
      examPerformanceTracker.startQuestionTimer();
    }

    // Get form data from location state
    if (location.state?.formData) {
      setFormData(location.state.formData);
      // Reduced loading delay for better perceived performance
      const timer = setTimeout(() => {
        setIsLoading(false);
        setExamStartTime(Date.now());
        setQuestionStartTime(Date.now());
      }, 500); // Reduced from 1000ms to 500ms

      return () => clearTimeout(timer);
    } else {
      // Redirect to home if no form data
      navigate(createPageUrl("index"));
    }
  }, [location.state, navigate]);

  // Handle going back to previous question
  const handleGoBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setQuestionStartTime(Date.now()); // Reset timer for previous question

      // Track performance for question transition
      if (examPerformanceTracker) {
        examPerformanceTracker.trackQuestionTransition();
        examPerformanceTracker.startQuestionTimer();
      }

      // Optimized scroll behavior for mobile
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }, [currentQuestionIndex]);

  // Remove handleGoNext function - we don't need Next button

  // Optimized answer handler with useCallback
  const handleAnswer = useCallback(
    (answer) => {
      // Track performance for option selection
      if (examPerformanceTracker) {
        examPerformanceTracker.trackOptionSelection(answer);
      }

      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: answer,
      }));

      // Track question completion time
      if (questionStartTime) {
        const timeSpent = Date.now() - questionStartTime;
        trackExamProgress(currentQuestionIndex + 1, totalQuestions, timeSpent);
      }

      // Add current question to visited questions
      setVisitedQuestions((prev) => new Set([...prev, currentQuestionIndex]));

      // Auto-advance to next question after answering
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setQuestionStartTime(Date.now()); // Reset timer for next question

        // Track performance for question transition
        if (examPerformanceTracker) {
          examPerformanceTracker.trackQuestionTransition();
          examPerformanceTracker.startQuestionTimer();
        }

        // Optimized scroll behavior for mobile
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    },
    [
      currentQuestion.id,
      currentQuestionIndex,
      questionStartTime,
      totalQuestions,
    ]
  );

  // Optimized submit handler
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setError(null);

    // Track exam completion
    if (examStartTime) {
      const totalTimeSpent = Date.now() - examStartTime;
      trackExamCompletion(totalQuestions, totalTimeSpent);
    }

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
  }, [answers, examStartTime, formData, navigate, totalQuestions]);

  // Optimized quit handlers
  const handleQuit = useCallback(() => {
    setShowQuitDialog(true);
  }, []);

  const confirmQuit = useCallback(async () => {
    console.log("User chose to quit questionnaire");
    setError(null);

    // Track exam abandonment
    if (examStartTime) {
      const timeSpent = Date.now() - examStartTime;
      trackExamAbandonment(currentQuestionIndex + 1, totalQuestions, timeSpent);
    }

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
  }, [examStartTime, currentQuestionIndex, totalQuestions, formData, navigate]);

  const cancelQuit = useCallback(() => {
    setShowQuitDialog(false);
  }, []);

  // Show loading state with optimized skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
            <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xl font-medium text-gray-600">
            جاري تحميل الاختبار...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Optimized Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <Progress
            value={progressPercentage}
            className="h-2 progress-mobile"
          />
          <p className="text-sm text-gray-600 mt-2 text-center">
            السؤال {currentQuestionIndex + 1} من {totalQuestions}
          </p>
        </div>

        {/* Optimized Question Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            variants={questionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              // Optimize for mobile performance
              type: "tween",
            }}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg exam-question mobile-optimized"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-right">
              {currentQuestion.title}
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  variants={optionVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  transition={{
                    duration: 0.2,
                    delay: index * 0.05, // Stagger animation for better performance
                    ease: "easeOut",
                  }}
                  className={`w-full p-3 sm:p-4 rounded-xl border-2 text-right flex items-center justify-between touch-manipulation exam-option ${
                    answers[currentQuestion.id] === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  dir="rtl"
                  // Optimize for mobile touch
                  style={{
                    minHeight: "48px",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    {option.icon && (
                      <span className="text-gray-600 flex-shrink-0">
                        {option.icon}
                      </span>
                    )}
                    <div className="text-right flex-1">
                      <p className="font-medium text-sm sm:text-base">
                        {option.label}
                      </p>
                      {option.description && (
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          {option.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Optimized Navigation Buttons - Only Back and Exit */}
        <div className="mt-6 sm:mt-8 flex justify-between gap-4">
          {/* Left side - Back and Quit buttons */}
          <div className="flex gap-2 flex-1">
            {canGoBack && (
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="text-gray-600 hover:text-gray-800 flex-1 sm:flex-none"
                style={{ minHeight: "48px" }}
              >
                <ArrowLeft className="h-5 w-5 ml-2" />
                <span className="hidden sm:inline">السابق</span>
                <span className="sm:hidden">السابق</span>
              </Button>
            )}

            <Button
              onClick={handleQuit}
              variant="outline"
              className="text-red-500 hover:text-red-600 flex-1 sm:flex-none"
              style={{ minHeight: "48px" }}
            >
              <X className="h-5 w-5 ml-2" />
              <span className="hidden sm:inline">إنهاء الاختبار</span>
              <span className="sm:hidden">إنهاء</span>
            </Button>
          </div>

          {/* Right side - Only Submit button on last question */}
          <div className="flex gap-2 flex-1 justify-end">
            {currentQuestionIndex === totalQuestions - 1 && (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-600 text-white flex-1 sm:flex-none"
                style={{ minHeight: "48px" }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                    <span className="hidden sm:inline">جاري الإرسال...</span>
                    <span className="sm:hidden">جاري...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">تم </span>
                    <span className="sm:hidden">تم</span>
                    <ArrowRight className="h-5 w-5 mr-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Optimized Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl"
          >
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 ml-2 flex-shrink-0" />
              <p className="text-red-700 text-sm sm:text-base">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Optimized Quit Confirmation Dialog */}
        <AlertDialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
          <AlertDialogContent className="max-w-sm mx-auto">
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
