// Meta Pixel tracking utilities

// Track page view
export const trackMetaPixelPageView = (pageName = null) => {
  if (typeof window.fbq === "function") {
    window.fbq("track", "PageView");
    console.log("Meta Pixel PageView tracked", { pageName });
  }
};

// Track custom events
export const trackMetaPixelEvent = (eventName, parameters = {}) => {
  if (typeof window.fbq === "function") {
    window.fbq("track", eventName, parameters);
    console.log("Meta Pixel event tracked", { eventName, parameters });
  }
};

// Track lead generation
export const trackMetaPixelLead = (parameters = {}) => {
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", parameters);
    console.log("Meta Pixel Lead tracked", parameters);
  }
};

// Track form submission
export const trackMetaPixelFormSubmission = (formName, parameters = {}) => {
  if (typeof window.fbq === "function") {
    window.fbq("track", "CompleteRegistration", {
      content_name: formName,
      ...parameters,
    });
    console.log("Meta Pixel CompleteRegistration tracked", {
      formName,
      parameters,
    });
  }
};

// Track button clicks
export const trackMetaPixelButtonClick = (buttonName, parameters = {}) => {
  if (typeof window.fbq === "function") {
    window.fbq("track", "Contact", {
      content_name: buttonName,
      ...parameters,
    });
    console.log("Meta Pixel Contact tracked", { buttonName, parameters });
  }
};
