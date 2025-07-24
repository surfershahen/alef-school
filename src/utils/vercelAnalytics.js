import { track } from "@vercel/analytics";

// Track custom events with Vercel Analytics
export const trackEvent = (eventName, properties = {}) => {
  try {
    // Add environment logging for debugging
    console.log("Environment:", {
      isDev: import.meta.env.DEV,
      mode: import.meta.env.MODE,
      url: window.location.href,
      host: window.location.host
    });
    
    track(eventName, properties);
    console.log("Vercel Analytics event tracked:", eventName, properties);
  } catch (error) {
    console.warn("Failed to track Vercel Analytics event:", error);
    console.error("Analytics error details:", {
      eventName,
      properties,
      error: error.message,
      stack: error.stack
    });
  }
};

// Common tracking functions
export const trackFormSubmission = (
  formName,
  success = true,
  errorMessage = null
) => {
  trackEvent("form_submission", {
    form_name: formName,
    success,
    error_message: errorMessage,
  });
};

export const trackPageView = (pageName) => {
  trackEvent("page_view", {
    page_name: pageName,
  });
};

export const trackButtonClick = (buttonName, location) => {
  trackEvent("button_click", {
    button_name: buttonName,
    location,
  });
};

export const trackUserAction = (action, details = {}) => {
  trackEvent("user_action", {
    action,
    ...details,
  });
};

// ADVANCED TRACKING FUNCTIONS

// Scroll depth tracking
export const trackScrollDepth = (percentage, section = null) => {
  trackEvent("scroll_depth", {
    percentage,
    section,
    timestamp: Date.now(),
  });
};

// Form field interactions
export const trackFormFieldInteraction = (
  fieldName,
  action,
  formName = "unknown"
) => {
  trackEvent("form_field_interaction", {
    field_name: fieldName,
    action, // 'focus', 'blur', 'error', 'clear_error'
    form_name: formName,
    timestamp: Date.now(),
  });
};

// CTA and button tracking with context
export const trackCTAClick = (ctaText, location, targetPage = null) => {
  trackEvent("cta_click", {
    cta_text: ctaText,
    location,
    target_page: targetPage,
    timestamp: Date.now(),
  });
};

// Video/Media interactions
export const trackVideoInteraction = (videoName, action, currentTime = 0) => {
  trackEvent("video_interaction", {
    video_name: videoName,
    action, // 'play', 'pause', 'complete', 'seek'
    current_time: currentTime,
    timestamp: Date.now(),
  });
};

// Section/Component visibility
export const trackSectionView = (sectionName, timeOnSection = null) => {
  trackEvent("section_view", {
    section_name: sectionName,
    time_on_section: timeOnSection,
    timestamp: Date.now(),
  });
};

// Exam/Questionnaire specific tracking
export const trackExamProgress = (
  questionNumber,
  totalQuestions,
  timeSpent = null
) => {
  trackEvent("exam_progress", {
    question_number: questionNumber,
    total_questions: totalQuestions,
    completion_percentage: Math.round((questionNumber / totalQuestions) * 100),
    time_spent: timeSpent,
    timestamp: Date.now(),
  });
};

export const trackExamCompletion = (
  totalQuestions,
  totalTimeSpent,
  score = null
) => {
  trackEvent("exam_completion", {
    total_questions: totalQuestions,
    total_time_spent: totalTimeSpent,
    score,
    completion_rate: 100,
    timestamp: Date.now(),
  });
};

export const trackExamAbandonment = (
  questionNumber,
  totalQuestions,
  timeSpent = null
) => {
  trackEvent("exam_abandonment", {
    abandoned_at_question: questionNumber,
    total_questions: totalQuestions,
    completion_percentage: Math.round((questionNumber / totalQuestions) * 100),
    time_spent: timeSpent,
    timestamp: Date.now(),
  });
};

// Navigation tracking
export const trackNavigation = (fromPage, toPage, method = "click") => {
  trackEvent("navigation", {
    from_page: fromPage,
    to_page: toPage,
    method, // 'click', 'back_button', 'direct'
    timestamp: Date.now(),
  });
};

// Error tracking
export const trackError = (errorType, errorMessage, context = null) => {
  trackEvent("error_occurred", {
    error_type: errorType,
    error_message: errorMessage,
    context,
    timestamp: Date.now(),
  });
};

// User engagement patterns
export const trackEngagement = (action, value = null, context = {}) => {
  trackEvent("user_engagement", {
    action,
    value,
    ...context,
    timestamp: Date.now(),
  });
};

// Time-based tracking
export const trackTimeOnPage = (pageName, timeSpent) => {
  trackEvent("time_on_page", {
    page_name: pageName,
    time_spent: timeSpent,
    engagement_level:
      timeSpent > 60 ? "high" : timeSpent > 30 ? "medium" : "low",
    timestamp: Date.now(),
  });
};
