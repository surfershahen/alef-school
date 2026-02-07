/**
 * Lead + Questionnaire utilities
 * Handles webhook submissions and AI enrichment inside the app
 */

import { handleApiError, logError } from "./errorHandling";
import { validateForm, commonRules } from "./validation";
import { getAllTrackingParameters, determineSourceValue } from "./urlTracking";
import { generateMoreInfoProfile } from "./aiProcessing";

const INITIAL_WEBHOOK_URL =
  "https://hook.us2.make.com/in5t62k9fxtmd7ok1iqqu6mn9somju7b";
const COMPLETION_WEBHOOK_URL =
  "https://hook.us2.make.com/h8cpk9qgw4lzba89anxu8z22gmrf8f44";

const normalizeString = (value) =>
  typeof value === "string" ? value.trim() : value || "";

const sendWebhookPayload = async (payload, context, webhookUrl) => {
  if (!webhookUrl) {
    throw new Error(`Webhook URL missing for ${context}`);
  }

  console.log(`📤 Sending ${context} payload to webhook:`, payload);

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseBody = await response.text();

  if (!response.ok) {
    throw new Error(
      `Webhook (${context}) failed with status ${response.status}: ${
        responseBody || "No response body"
      }`,
    );
  }

  console.log(`✅ Webhook (${context}) sent successfully`);
  return responseBody;
};

const getFormattedTimestamp = () => {
  return new Date()
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(/\//g, ".")
    .replace(",", "");
};

const buildLeadPayload = (formData, source) => ({
  name: normalizeString(formData.name),
  phone: normalizeString(formData.phone),
  email: normalizeString(formData.email),
  city: normalizeString(formData.city),
  source,
  aiAnalysis: null,
  status: false,
  submittedAt: getFormattedTimestamp(),
});

const buildCompletionPayload = (userData, aiAnalysis) => ({
  phone: normalizeString(userData.phone),
  aiAnalysis,
  status: true,
  submittedAt: getFormattedTimestamp(),
});

/**
 * Submits form data to the webhook (initial lead with aiAnalysis: null)
 * @param {Object} formData - The form data to submit
 * @param {string} formData.name - User's full name
 * @param {string} formData.phone - User's phone number
 * @param {string} formData.email - User's email address
 * @param {string} formData.city - User's city
 * @returns {Promise<Object>} - Success/error response
 */
export const submitLeadToWebhook = async (formData) => {
  try {
    // Validate form data
    const validation = validateForm(formData, commonRules);
    if (!validation.isValid) {
      // Throw a new error with the validation details
      throw new Error(JSON.stringify(validation.errors));
    }

    // Get URL tracking parameters and determine the source
    const trackingParams = getAllTrackingParameters();
    const sourceValue = determineSourceValue(trackingParams);

    const payload = buildLeadPayload(formData, sourceValue);

    await sendWebhookPayload(
      payload,
      "initial_submission",
      INITIAL_WEBHOOK_URL,
    );

    console.log("✅ Lead data sent successfully to webhook");

    return {
      success: true,
      message: "Lead submitted successfully",
      data: payload,
    };
  } catch (error) {
    logError(error, "LeadWebhook.submit");
    const handledError = handleApiError(error);
    return {
      success: false,
      message: error.message || "فشل إرسال البيانات",
      error: handledError,
    };
  }
};

/**
 * Generates AI summary and sends an updated payload to the webhook
 * @param {Object} userData - lead data (must include phone for webhook correlation)
 * @param {boolean} completed - Should be true when exam is finished
 * @param {Object} answers - Questionnaire answers for AI processing
 * @returns {Promise<Object>} - Success/error response with AI profile
 */
export const updateQuestionnaireStatus = async (
  userData,
  completed,
  answers = null,
) => {
  try {
    if (!completed) {
      return {
        success: true,
        message: "Questionnaire not completed - webhook update skipped",
      };
    }

    if (!answers) {
      throw new Error(
        "Questionnaire answers are required to generate AI profile",
      );
    }

    const validation = validateForm(userData, commonRules);
    if (!validation.isValid) {
      throw new Error(JSON.stringify(validation.errors));
    }

    const aiAnalysis = await generateMoreInfoProfile(userData, answers);
    const completionPayload = buildCompletionPayload(userData, aiAnalysis);

    await sendWebhookPayload(
      completionPayload,
      "questionnaire_completion",
      COMPLETION_WEBHOOK_URL,
    );

    console.log("✅ Questionnaire completion sent to webhook");

    return {
      success: true,
      message: "Questionnaire completion processed successfully",
      data: completionPayload,
      aiAnalysis,
    };
  } catch (error) {
    logError(error, "GoogleSheets.updateQuestionnaireStatus");
    const handledError = handleApiError(error);
    return {
      success: false,
      message: error.message || "فشل تحديث بيانات الطالب",
      error: handledError,
    };
  }
};
