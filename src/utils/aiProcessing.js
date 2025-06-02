/**
 * AI Processing Utility
 * Handles questionnaire validation and formatting
 */

/**
 * Validate questionnaire answers for completeness
 * @param {Object} answers - Questionnaire answers
 * @returns {Object} - Validation result
 */
export const validateQuestionnaireAnswers = answers => {
  const requiredFields = [
    "age_range",
    "hebrew_level",
    "motivation",
    "goal",
    "previous_methods",
    "feeling_confidence",
    "feeling_frustration",
    "feeling_motivation",
  ];

  const missingFields = requiredFields.filter(field => !answers[field]);

  if (missingFields.length > 0) {
    return {
      isValid: false,
      missingFields,
      message: `Missing required answers: ${missingFields.join(", ")}`,
    };
  }

  return {
    isValid: true,
    message: "All required answers provided",
  };
};

/**
 * Format questionnaire answers for display
 * @param {Object} answers - Raw questionnaire answers
 * @returns {Object} - Formatted answers for display
 */
export const formatAnswersForDisplay = answers => {
  const formatted = {};

  Object.keys(answers).forEach(key => {
    const value = answers[key];
    if (Array.isArray(value)) {
      formatted[key] = value.join(", ");
    } else {
      formatted[key] = value;
    }
  });

  return formatted;
};
