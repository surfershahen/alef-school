/**
 * Simple URL Parameter Tracking Utility
 * Captures URL parameters for lead source tracking
 */

const TRACKING_KEYS = [
  "fbclid",
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "agid",
];

const hasAnyTrackingParam = (params) =>
  TRACKING_KEYS.some((key) => params[key]);

const buildTrackedUrl = (trackingParams) => {
  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams();
  TRACKING_KEYS.forEach((key) => {
    const value = trackingParams[key];
    if (value) {
      params.set(key, value);
    }
  });

  const queryString = params.toString();
  if (!queryString) {
    return null;
  }

  const { origin, pathname } = window.location;
  return `${origin}${pathname}?${queryString}`;
};

const currentUrlLooksTracked = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return /[?&](utm_|gclid|fbclid|agid|utm_id)/i.test(window.location.href);
};

/**
 * Get URL parameters from current page
 * @returns {Object} Object containing URL parameters
 */
export const getUrlParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const agid = urlParams.get("agid") || urlParams.get("AgId") || null;

  return {
    fbclid: urlParams.get("fbclid") || null,
    gclid: urlParams.get("gclid") || null,
    utm_source: urlParams.get("utm_source") || null,
    utm_medium: urlParams.get("utm_medium") || null,
    utm_campaign: urlParams.get("utm_campaign") || null,
    utm_content: urlParams.get("utm_content") || null,
    utm_term: urlParams.get("utm_term") || null,
    utm_id: urlParams.get("utm_id") || null,
    agid,
  };
};

/**
 * Store URL parameters in sessionStorage for persistence
 * @param {Object} urlParams - URL parameters object
 */
export const storeUrlParameters = (urlParams) => {
  const hasParams = hasAnyTrackingParam(urlParams);

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
  const hasParams = hasAnyTrackingParam(urlParams);

  if (hasParams) {
    const paramsWithLanding = {
      ...urlParams,
      landing_url: window.location.href,
    };
    storeUrlParameters(paramsWithLanding);
    console.log("🎯 URL parameters detected:", paramsWithLanding);
    return paramsWithLanding;
  }

  console.log("📊 No URL parameters found");
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

/**
 * Determines the source value from tracking parameters based on priority.
 * @param {Object} trackingParams - The combined tracking parameters.
 * @returns {string} The determined source value.
 */
export const determineSourceValue = (trackingParams) => {
  const hasPaidParams = hasAnyTrackingParam(trackingParams);

  if (!hasPaidParams) {
    return "Direct";
  }

  if (trackingParams.landing_url) {
    return trackingParams.landing_url;
  }

  if (currentUrlLooksTracked()) {
    return window.location.href;
  }

  const rebuiltUrl = buildTrackedUrl(trackingParams);
  if (rebuiltUrl) {
    return rebuiltUrl;
  }

  // Default fallback
  return "Direct";
};
