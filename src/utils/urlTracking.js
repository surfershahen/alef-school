/**
 * Simple URL Parameter Tracking Utility
 * Captures URL parameters for lead source tracking
 */

/**
 * Get URL parameters from current page
 * @returns {Object} Object containing URL parameters
 */
export const getUrlParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return {
    fbclid: urlParams.get("fbclid") || null,
    gclid: urlParams.get("gclid") || null,
    utm_source: urlParams.get("utm_source") || null,
    utm_medium: urlParams.get("utm_medium") || null,
    utm_campaign: urlParams.get("utm_campaign") || null,
    utm_content: urlParams.get("utm_content") || null,
    utm_term: urlParams.get("utm_term") || null,
  };
};

/**
 * Store URL parameters in sessionStorage for persistence
 * @param {Object} urlParams - URL parameters object
 */
export const storeUrlParameters = (urlParams) => {
  const hasParams = Object.values(urlParams).some((param) => param !== null);

  if (hasParams) {
    sessionStorage.setItem("url_parameters", JSON.stringify(urlParams));
    console.log("📊 URL parameters stored:", urlParams);
  }
};

/**
 * Get stored URL parameters from sessionStorage
 * @returns {Object} Stored URL parameters or empty object
 */
export const getStoredUrlParameters = () => {
  try {
    const stored = sessionStorage.getItem("url_parameters");
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("❌ Error parsing stored URL parameters:", error);
    return {};
  }
};

/**
 * Initialize URL tracking - capture and store URL parameters
 * Should be called on page load
 */
export const initializeUrlTracking = () => {
  const urlParams = getUrlParameters();
  storeUrlParameters(urlParams);

  // Log URL parameters for debugging
  if (Object.values(urlParams).some((param) => param !== null)) {
    console.log("🎯 URL parameters detected:", urlParams);
  } else {
    console.log("📊 No URL parameters found");
  }

  return urlParams;
};

/**
 * Get all tracking parameters (current + stored)
 * @returns {Object} Combined tracking parameters
 */
export const getAllTrackingParameters = () => {
  const currentParams = getUrlParameters();
  const storedParams = getStoredUrlParameters();

  // Combine current and stored parameters
  // Current parameters take precedence over stored ones
  const combined = { ...storedParams, ...currentParams };

  // Remove null values
  const cleanParams = {};
  Object.keys(combined).forEach((key) => {
    if (combined[key] !== null && combined[key] !== undefined) {
      cleanParams[key] = combined[key];
    }
  });

  return cleanParams;
};
