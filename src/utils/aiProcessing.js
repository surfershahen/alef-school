import { logError } from "./errorHandling";

/**
 * AI Processing Utility
 * Handles questionnaire validation, mapping, and AI profile generation
 * Uses secure serverless proxy to protect API key
 */

const OPENAI_PROXY_URL = "/api/openai-proxy";
const DEFAULT_VALUE = "לא ידוע";

const hebrewLevelMap = {
  beginner: "מתחיל",
  elementary: "בסיסי",
  intermediate: "בינוני",
  advanced: "מתקדם",
};

const motivationMap = {
  work: "עבודה",
  study: "לימודים",
  family: "משפחה",
  travel: "נסיעות",
  personal_interest: "עניין אישי",
  religion: "דת",
};

const goalMap = {
  basic_conversation: "שיחה בסיסית",
  fluency: "שטף",
  reading_writing: "קריאה וכתיבה",
  professional: "מקצועי",
  academic: "אקדמי",
  cultural: "תרבותי",
};

const previousMethodsMap = {
  mobile_app: "אפליקציה בנייד",
  online_teacher: "מורה מקוון",
  school: "בית ספר",
  language_courses: "קורסי שפה",
  youtube: "יוטיוב",
};

const confidenceLevelMap = {
  very_low: "ביטחון נמוך מאוד",
  low: "ביטחון נמוך",
  neutral: "ביטחון ניטרלי",
  confident: "בטוח",
  very_confident: "בטוח מאוד",
};

const frustrationLevelMap = {
  not_at_all: "ללא תסכול",
  slightly: "תסכול קל",
  moderately: "תסכול בינוני",
  very: "תסכול גבוה",
  extremely: "תסכול קיצוני",
};

const motivationLevelMap = {
  not_motivated: "לא מוטיבציה",
  slightly_motivated: "מוטיבציה קלה",
  moderately_motivated: "מוטיבציה בינונית",
  highly_motivated: "מוטיבציה גבוהה",
  extremely_motivated: "מוטיבציה קיצונית",
};

const mapValue = (map, value) => map[value] || value || DEFAULT_VALUE;

const formatPreviousMethods = (value) => {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return DEFAULT_VALUE;
    }
    return value
      .map((method) => mapValue(previousMethodsMap, method))
      .join(", ");
  }

  if (!value) {
    return DEFAULT_VALUE;
  }

  return mapValue(previousMethodsMap, value);
};

/**
 * Validate questionnaire answers for completeness
 * @param {Object} answers - Questionnaire answers
 * @returns {Object} - Validation result
 */
export const validateQuestionnaireAnswers = (answers) => {
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

  const missingFields = requiredFields.filter((field) => !answers[field]);

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
export const formatAnswersForDisplay = (answers) => {
  const formatted = {};

  Object.keys(answers).forEach((key) => {
    const value = answers[key];
    if (Array.isArray(value)) {
      formatted[key] = value.join(", ");
    } else {
      formatted[key] = value;
    }
  });

  return formatted;
};

const buildUserData = (user = {}, answers = {}) => {
  return {
    name: user.name || "הסטודנט",
    age_range: answers.age_range || DEFAULT_VALUE,
    hebrew_level: mapValue(hebrewLevelMap, answers.hebrew_level),
    motivation: mapValue(motivationMap, answers.motivation),
    goal: mapValue(goalMap, answers.goal),
    previous_methods: formatPreviousMethods(answers.previous_methods),
    confidence_level: mapValue(confidenceLevelMap, answers.feeling_confidence),
    frustration_level: mapValue(
      frustrationLevelMap,
      answers.feeling_frustration
    ),
    motivation_level: mapValue(motivationLevelMap, answers.feeling_motivation),
  };
};

const buildPrompt = (userData) => {
  return `תבסס על התשובות הבאות של משתמש, צור משפט יחיד ומובנה היטב עבור השדה 'aiAnalysis' בפורמט המדויק הזה:

'גילו של ${userData.name} הוא בין ${userData.age_range}. רמת העברית שלו היא: ${userData.hebrew_level}. הוא רוצה ללמוד עברית עבור ${userData.motivation}. המטרה שלו היא ${userData.goal}. הוא ניסה ללמוד באמצעות ${userData.previous_methods}. רמת הביטחון שלו היא ${userData.confidence_level} כשהוא מדבר עברית. רמת התסכול שלו היא ${userData.frustration_level}. רמת המוטיבציה שלו היא ${userData.motivation_level} להתחיל ללמוד עברית.'

נתוני המשתמש:
- שם: ${userData.name}
- טווח גילאים: ${userData.age_range}
- רמת עברית: ${userData.hebrew_level}
- מוטיבציה: ${userData.motivation}
- מטרה: ${userData.goal}
- שיטות קודמות: ${userData.previous_methods}
- רמת ביטחון: ${userData.confidence_level}
- רמת תסכול: ${userData.frustration_level}
- רמת מוטיבציה: ${userData.motivation_level}

החזר רק את המשפט המעוצב, ללא טקסט נוסף.`;
};

/**
 * Generate AI profile (aiAnalysis) for a completed questionnaire
 * @param {Object} user - User identification data (name, etc.)
 * @param {Object} answers - Questionnaire answers
 * @returns {Promise<string>} - AI generated profile in Hebrew
 */
export const generateMoreInfoProfile = async (user, answers) => {
  const userData = buildUserData(user, answers);
  const prompt = buildPrompt(userData);

  const payload = {
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content:
          "אתה יועץ מומחה ללימוד עברית. צור פרופילי משתמשים קצרים ומובנים על בסיס תשובות שאלון. עקוב אחר הפורמט המדויק המבוקש והחזר רק את המשפט המעוצב בעברית.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 300,
    temperature: 0.3,
  };

  try {
    // Call secure proxy endpoint instead of OpenAI directly
    const response = await fetch(OPENAI_PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const rawText = await response.text();
    const isJson =
      response.headers
        ?.get("content-type")
        ?.toLowerCase()
        .includes("application/json") || false;

    let responseData = null;
    if (isJson && rawText) {
      try {
        responseData = JSON.parse(rawText);
      } catch (parseError) {
        throw new Error("Invalid JSON response from API");
      }
    }

    if (!response.ok) {
      const errorMessage =
        responseData?.error ||
        responseData?.message ||
        rawText ||
        `API error with status ${response.status}`;
      throw new Error(errorMessage);
    }

    const aiResponse =
      responseData?.choices?.[0]?.message?.content?.trim() || "";

    if (!aiResponse) {
      throw new Error("Empty response received from AI");
    }

    return aiResponse;
  } catch (error) {
    logError(
      {
        message: error.message,
        type: "OPENAI",
        details: { user: user?.email, name: user?.name },
        timestamp: new Date().toISOString(),
      },
      "AIProcessing.generateMoreInfoProfile"
    );
    throw error;
  }
};
