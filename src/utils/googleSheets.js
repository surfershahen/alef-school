/**
 * Google Sheets API utility for submitting form data
 * Uses Google Apps Script as the backend endpoint
 */
// https://script.google.com/macros/s/AKfycbyt51E3axE_XY6DVDI4C_b2mlMU3oFbCsOyuJqmTEPDK-6p2-ZEpacBaEgTKfFf-qRtDg/exec

import { handleApiError, logError } from "./errorHandling";
import { validateForm, commonRules } from "./validation";
import { getAllTrackingParameters } from "./urlTracking";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbySi3xa8TA5TqLirCtcijvqf1cmlUnTrmdKYQ3Nvuc2KmrvnJ_kcHh7sOv2bYLr7xviWw/exec";

/**
 * Submits form data to Google Sheets via Google Apps Script
 * @param {Object} formData - The form data to submit
 * @param {string} formData.name - User's full name
 * @param {string} formData.phone - User's phone number
 * @param {string} formData.email - User's email address
 * @param {string} formData.city - User's city
 * @returns {Promise<Object>} - Success/error response
 */
export const submitToGoogleSheets = async (formData) => {
  try {
    // Validate form data
    const validation = validateForm(formData, commonRules);
    if (!validation.isValid) {
      throw handleValidationError(validation.errors);
    }

    // Get URL tracking parameters
    const trackingParams = getAllTrackingParameters();

    // Prepare form data for submission
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("date", new Date().toLocaleString());
    formDataToSend.append("status", "false"); // Default status is false (questionnaire not completed)

    // Add URL tracking parameters
    Object.keys(trackingParams).forEach((key) => {
      if (trackingParams[key]) {
        formDataToSend.append(key, trackingParams[key]);
      }
    });

    // Log the data being sent (for debugging)
    console.log("📤 Submitting data to Google Sheets:", {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      date: new Date().toLocaleString(),
      status: "false",
      tracking_params: trackingParams,
    });

    // Submit to Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formDataToSend,
    });

    // Get response text
    const result = await response.text();
    console.log("📥 Google Apps Script response:", result);

    // Check if request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Validate response content
    if (result !== "Added") {
      throw new Error("Unexpected response from Google Apps Script");
    }

    console.log("✅ Data submitted successfully to Google Sheets");

    return {
      success: true,
      message: "Data submitted successfully",
      data: result,
    };
  } catch (error) {
    logError(error, "GoogleSheets.submitToGoogleSheets");
    return handleApiError(error);
  }
};

/**
 * Updates questionnaire status for a user in Google Sheets
 * @param {Object} userData - The user data to identify the record
 * @param {string} userData.email - User's email address (used as identifier)
 * @param {boolean} completed - Whether the questionnaire was completed (true) or quit (false)
 * @param {Object} answers - The questionnaire answers (optional, only when completed=true)
 * @returns {Promise<Object>} - Success/error response
 */
export const updateQuestionnaireStatus = async (
  userData,
  completed,
  answers = null
) => {
  try {
    // Validate user data
    const validation = validateForm(userData, { email: commonRules.email });
    if (!validation.isValid) {
      throw handleValidationError(validation.errors);
    }

    // Prepare form data for status update
    const formDataToSend = new FormData();
    formDataToSend.append("action", "updateStatus");
    formDataToSend.append("email", userData.email);
    formDataToSend.append("status", completed ? "true" : "false");

    // If questionnaire is completed and answers are provided, send them for AI processing
    if (completed && answers) {
      formDataToSend.append("answers", JSON.stringify(answers));
      console.log("📋 Including questionnaire answers for AI processing");
    }

    // Log the data being sent (for debugging)
    console.log("📤 Updating questionnaire status in Google Sheets:", {
      email: userData.email,
      status: completed ? "true" : "false",
      action: "updateStatus",
      hasAnswers: completed && answers ? "YES" : "NO",
      answersCount: answers ? Object.keys(answers).length : 0,
    });

    // Submit to Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formDataToSend,
    });

    // Get response text
    const result = await response.text();
    console.log("📥 Google Apps Script response:", result);

    // Check if request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Validate response content
    if (result !== "Updated") {
      throw new Error("Unexpected response from Google Apps Script");
    }

    console.log(
      "✅ Questionnaire status updated successfully in Google Sheets"
    );

    return {
      success: true,
      message: "Questionnaire status updated successfully",
      data: result,
    };
  } catch (error) {
    logError(error, "GoogleSheets.updateQuestionnaireStatus");
    return handleApiError(error);
  }
};

/**
 * Validates form data before submission
 * @param {Object} formData - The form data to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateFormData = (formData) => {
  const requiredFields = ["name", "phone", "city", "email"];

  for (const field of requiredFields) {
    if (!formData[field] || !formData[field].trim()) {
      console.error(`❌ Validation failed: ${field} is required`);
      return false;
    }
  }

  // Basic email validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(formData.email)) {
    console.error("❌ Validation failed: Invalid email format");
    return false;
  }

  console.log("✅ Form data validation passed");
  return true;
};
