import { track } from "@vercel/analytics";

// Track custom events with Vercel Analytics
export const trackEvent = (eventName, properties = {}) => {
  try {
    // Add environment logging for debugging
    console.log("Environment:", {
      isDev: import.meta.env.DEV,
      mode: import.meta.env.MODE,
      url: window.location.href,
      host: window.location.host,
    });

    track(eventName, properties);
    console.log("Vercel Analytics event tracked:", eventName, properties);
  } catch (error) {
    console.warn("Failed to track Vercel Analytics event:", error);
    console.error("Analytics error details:", {
      eventName,
      properties,
      error: error.message,
      stack: error.stack,
    });
  }
};

// ENHANCED CTA TRACKING FUNCTIONS

// 1. CTA Button Click Tracking
export const trackCTAButtonClick = (ctaName, location, targetAction = null) => {
  trackEvent("cta_button_click", {
    cta_name: ctaName,
    cta_location: location,
    target_action: targetAction,
    click_timestamp: Date.now(),
  });
};

// 2. Form Start Tracking (First Input Interaction)
export const trackFormStart = (formName, firstField = null) => {
  trackEvent("form_start", {
    form_name: formName,
    first_field: firstField,
    start_timestamp: Date.now(),
  });
};

// 3. Form Submission Tracking (Conversion Signal)
export const trackFormSubmissionSuccess = (formName, submissionData = {}) => {
  trackEvent("form_submission", {
    form_name: formName,
    status: "success",
    submission_timestamp: Date.now(),
    ...submissionData,
  });
};

// 4. Form Abandonment Tracking
export const trackFormAbandonment = (
  formName,
  lastField,
  timeSpent = null,
  fieldsCompleted = 0
) => {
  trackEvent("form_abandonment", {
    form_name: formName,
    last_field: lastField,
    time_spent: timeSpent,
    fields_completed: fieldsCompleted,
    abandonment_timestamp: Date.now(),
  });
};

// LEGACY FUNCTIONS (Updated to use new structure)

// Common tracking functions
export const trackFormSubmission = (
  formName,
  success = true,
  errorMessage = null
) => {
  if (success) {
    trackFormSubmissionSuccess(formName, { error_message: null });
  } else {
    trackEvent("form_submission", {
      form_name: formName,
      status: "error",
      error_message: errorMessage,
      timestamp: Date.now(),
    });
  }
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

// Form field interactions (REMOVED - no longer tracking individual field interactions)

// CTA and button tracking with context (DEPRECATED - use trackCTAButtonClick)
export const trackCTAClick = (ctaText, location, targetPage = null) => {
  trackCTAButtonClick(ctaText, location, targetPage);
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

// Section/Component visibility with enhanced timing
export const trackSectionView = (sectionName, timeOnSection = null) => {
  console.log("🔍 trackSectionView called:", { sectionName, timeOnSection });

  // Only track time spent events, not section view start events
  if (timeOnSection !== null) {
    const timeInSeconds = Math.round(timeOnSection / 1000);

    // Create cleaner section names
    const cleanSectionName = sectionName
      .replace("_time_spent", "")
      .replace("_section", "");

    const eventData = {
      section: cleanSectionName,
      time_seconds: timeInSeconds,
      time_ms: timeOnSection,
      engagement_level:
        timeInSeconds >= 10 ? "high" : timeInSeconds >= 5 ? "medium" : "low",
      timestamp: Date.now(),
    };

    console.log("📊 Section time tracking data:", eventData);

    // Track as section time spent with cleaner event name
    trackEvent("section_time_spent", eventData);
  }
  // Remove section view start tracking completely
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
