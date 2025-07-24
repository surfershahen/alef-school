import { track } from "@vercel/analytics";

// Track custom events with Vercel Analytics
export const trackEvent = (eventName, properties = {}) => {
  try {
    track(eventName, properties);
    console.log("Vercel Analytics event tracked:", eventName, properties);
  } catch (error) {
    console.warn("Failed to track Vercel Analytics event:", error);
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
