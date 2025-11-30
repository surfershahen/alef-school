/**
 * Centralized validation utilities for form handling
 */

// Common validation patterns
const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  name: /^[\p{L}\s-]{2,50}$/u,
  // Updated city pattern to handle autocomplete formats like "Haifa, Israel"
  city: /^[\p{L}\s,.-]{2,100}$/u,
};

const phonePatterns = [
  /^\d{10}$/, // Local format e.g. 0522926777
  /^\+972\s?\d{9}$/, // International autocomplete format e.g. +972 522926777
];

// Validation messages
const messages = {
  required: "هذا الحقل مطلوب",
  invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
  invalidPhone: "يرجى إدخال رقم هاتف صحيح",
  invalidName: "يرجى إدخال اسم صحيح",
  invalidCity: "يرجى إدخال اسم مدينة صحيح",
};

/**
 * Cleans city input to extract just the city name from autocomplete format
 * @param {string} cityInput - Raw city input from user
 * @returns {string} - Cleaned city name
 */
export const cleanCityInput = (cityInput) => {
  if (!cityInput) return "";

  // Remove extra whitespace
  let cleaned = cityInput.trim();

  // If it contains a comma (autocomplete format like "Haifa, Israel")
  if (cleaned.includes(",")) {
    // Take only the part before the first comma
    cleaned = cleaned.split(",")[0].trim();
  }

  // If it contains a period (some autocomplete formats)
  if (cleaned.includes(".")) {
    // Take only the part before the first period
    cleaned = cleaned.split(".")[0].trim();
  }

  // Remove any remaining special characters that might be problematic
  cleaned = cleaned.replace(/[^\p{L}\s-]/gu, "");

  return cleaned;
};

/**
 * Validates a single field against its rules
 * @param {string} value - Field value to validate
 * @param {Object} rules - Validation rules
 * @returns {string|null} - Error message or null if valid
 */
export const validateField = (value, rules) => {
  if (rules.required && !value?.trim()) {
    return messages.required;
  }

  if (!value?.trim()) return null;

  if (rules.email && !patterns.email.test(value)) {
    return messages.invalidEmail;
  }

  if (rules.phone) {
    const trimmedValue = value.trim();
    const isValidPhone = phonePatterns.some((pattern) =>
      pattern.test(trimmedValue)
    );
    if (!isValidPhone) {
      return messages.invalidPhone;
    }
  }

  if (rules.name && !patterns.name.test(value)) {
    return messages.invalidName;
  }

  if (rules.city) {
    // Clean the city input first
    const cleanedCity = cleanCityInput(value);

    // Check if the cleaned city is valid
    if (!patterns.city.test(cleanedCity) || cleanedCity.length < 2) {
      return messages.invalidCity;
    }
  }

  return null;
};

/**
 * Validates form data against provided rules
 * @param {Object} formData - Form data to validate
 * @param {Object} rules - Validation rules for each field
 * @returns {Object} - Validation result with errors and isValid flag
 */
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach((field) => {
    const error = validateField(formData[field], rules[field]);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });

  return { errors, isValid };
};

/**
 * Common validation rules for forms
 */
export const commonRules = {
  name: { required: true, name: true },
  email: { required: true, email: true },
  phone: { required: true, phone: true },
  city: { required: true, city: true },
};

/**
 * Convenience helper to validate lead form data using the common rules.
 * Returns a simple boolean while logging failures for easier debugging.
 * @param {Object} formData - Form data to validate
 * @returns {boolean} - True if all rules pass, false otherwise
 */
export const validateFormData = (formData) => {
  const { isValid, errors } = validateForm(formData, commonRules);

  if (!isValid) {
    Object.entries(errors).forEach(([field, message]) => {
      console.error(`❌ Validation failed: ${field} - ${message}`);
    });
    return false;
  }

  console.log("✅ Form data validation passed");
  return true;
};
