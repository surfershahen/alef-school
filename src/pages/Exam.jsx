import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { questions } from "@/components/questionnaire/questions";
import { useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ThankYouScreen from "@/components/exam/ThankYouScreen";

export default function Exam() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState(null);
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
    if (!formData) return;

    setIsSubmitting(true);
    try {
      // Combine form data with exam answers
      const submissionData = {
        ...formData,
        ...answers,
        submission_date: new Date().toISOString(),
      };

      // TODO: Submit exam answers to backend
      console.log("Submitting exam answers:", submissionData);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show thank you screen
      setIsCompleted(true);
    } catch (error) {
      console.error("Error submitting exam:", error);
    } finally {
      setIsSubmitting(false);
    }
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

  // Show thank you screen
  if (isCompleted) {
    return <ThankYouScreen name={formData?.name} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-almoni" dir="rtl">
      {/* Header with progress bar */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="max-w-3xl mx-auto px-4 py-2">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>
              {currentQuestionIndex + 1} من {totalQuestions}
            </span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto pt-16 pb-20 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-md p-6 md:p-10"
          >
            <h2 className="text-2xl font-bold mb-6">{currentQuestion.title}</h2>

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

            {currentQuestionIndex === totalQuestions - 1 && (
              <div className="mt-8">
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
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
