/**
 * Google Sheets API utility for submitting form data
 * Uses Google Apps Script as the backend endpoint
 */

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwfeqn31ZIklm0CsCZo_ZcUiyQCGlkUd8_J5lB7RmDb7GjrUNj1leR6TgDv0q88xuZp7g/exec";

/**
 * Submits form data to Google Sheets via Google Apps Script
 * @param {Object} formData - The form data to submit
 * @param {string} formData.name - User's full name
 * @param {string} formData.phone - User's phone number
 * @param {string} formData.email - User's email address
 * @param {string} formData.city - User's city
 * @returns {Promise<Object>} - Success/error response
 */
export const submitToGoogleSheets = async formData => {
  try {
    // Prepare form data for submission
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("date", new Date().toLocaleString());

    // Log the data being sent (for debugging)
    console.log("📤 Submitting data to Google Sheets:", {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      date: new Date().toLocaleString(),
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
    console.error("❌ Error submitting to Google Sheets:", error);

    return {
      success: false,
      message: error.message || "Failed to submit data to Google Sheets",
      error: error,
    };
  }
};

/**
 * Validates form data before submission
 * @param {Object} formData - The form data to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateFormData = formData => {
  const requiredFields = ["name", "phone", "email", "city"];

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
