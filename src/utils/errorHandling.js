/**
 * Centralized error handling utilities
 */

// Common error types
export const ErrorTypes = {
  VALIDATION: "VALIDATION",
  NETWORK: "NETWORK",
  API: "API",
  UNKNOWN: "UNKNOWN",
};

// Error messages
const errorMessages = {
  [ErrorTypes.VALIDATION]: "خطأ في التحقق من البيانات",
  [ErrorTypes.NETWORK]: "خطأ في الاتصال بالشبكة",
  [ErrorTypes.API]: "خطأ في الاتصال بالخادم",
  [ErrorTypes.UNKNOWN]: "حدث خطأ غير متوقع",
};

/**
 * Creates a standardized error object
 * @param {Error|string} error - Original error or error message
 * @param {string} type - Error type from ErrorTypes
 * @param {Object} details - Additional error details
 * @returns {Object} Standardized error object
 */
export const createError = (error, type = ErrorTypes.UNKNOWN, details = {}) => {
  const message = error instanceof Error ? error.message : error;

  return {
    type,
    message: errorMessages[type] || message,
    details,
    originalError: error,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Handles API errors and returns standardized error object
 * @param {Error} error - Original error
 * @returns {Object} Standardized error object
 */
export const handleApiError = error => {
  console.error("API Error:", error);

  if (!navigator.onLine) {
    return createError(error, ErrorTypes.NETWORK);
  }

  if (error.response) {
    return createError(error, ErrorTypes.API, {
      status: error.response.status,
      data: error.response.data,
    });
  }

  return createError(error, ErrorTypes.UNKNOWN);
};

/**
 * Handles form validation errors
 * @param {Object} errors - Validation errors object
 * @returns {Object} Standardized error object
 */
export const handleValidationError = errors => {
  return createError(errors, ErrorTypes.VALIDATION, {
    fields: Object.keys(errors),
  });
};

/**
 * Logs error to console with additional context
 * @param {Object} error - Error object
 * @param {string} context - Error context
 */
export const logError = (error, context = "") => {
  console.error(`[${context}] Error:`, {
    message: error.message,
    type: error.type,
    details: error.details,
    timestamp: error.timestamp,
  });
};
