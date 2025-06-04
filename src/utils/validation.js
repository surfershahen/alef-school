/**
 * Centralized validation utilities for form handling
 */

// Common validation patterns
const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9+\s()-]{8,15}$/,
  name: /^[\p{L}\s-]{2,50}$/u,
  city: /^[\p{L}\s-]{2,50}$/u,
};

// Validation messages
const messages = {
  required: "هذا الحقل مطلوب",
  invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
  invalidPhone: "يرجى إدخال رقم هاتف صحيح",
  invalidName: "يرجى إدخال اسم صحيح",
  invalidCity: "يرجى إدخال اسم مدينة صحيح",
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

  if (rules.phone && !patterns.phone.test(value)) {
    return messages.invalidPhone;
  }

  if (rules.name && !patterns.name.test(value)) {
    return messages.invalidName;
  }

  if (rules.city && !patterns.city.test(value)) {
    return messages.invalidCity;
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

  Object.keys(rules).forEach(field => {
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
