/**
 * AI Service for Hebrew Learning Questionnaire System
 * Handles OpenAI GPT-4 integration for generating consolidated user profiles
 */

import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
});

/**
 * Generate consolidated user profile using OpenAI GPT-4
 * @param {Object} userData - User data and questionnaire responses
 * @param {string} userData.name - User's name
 * @param {string} userData.age_range - User's age range
 * @param {string} userData.hebrew_level - User's Hebrew level
 * @param {string} userData.motivation - User's motivation for learning
 * @param {string} userData.goal - User's learning goal
 * @param {string} userData.previous_methods - Previous learning methods
 * @param {string} userData.confidence_level - User's confidence level
 * @param {string} userData.frustration_level - User's frustration level
 * @param {string} userData.motivation_level - User's motivation level
 * @returns {Promise<Object>} - AI response with consolidated profile
 */
export const generateUserProfile = async userData => {
  try {
    console.log("🤖 Generating AI profile for user:", userData.name);

    // Validate required data
    const requiredFields = [
      "name",
      "age_range",
      "hebrew_level",
      "motivation",
      "goal",
      "previous_methods",
      "confidence_level",
      "frustration_level",
      "motivation_level",
    ];

    const missingFields = requiredFields.filter(field => !userData[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    // Create the AI prompt
    const prompt = createAIPrompt(userData);

    console.log("📝 AI Prompt created, sending to OpenAI...");

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview", // Using GPT-4 Turbo (latest available)
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
      temperature: 0.3, // Lower temperature for more consistent formatting
    });

    const aiResponse = completion.choices[0].message.content.trim();

    console.log("✅ AI profile generated successfully");
    console.log("📄 AI Response:", aiResponse);

    return {
      success: true,
      profile: aiResponse,
      usage: completion.usage,
      model: completion.model,
    };
  } catch (error) {
    console.error("❌ Error generating AI profile:", error);

    // Handle specific OpenAI errors
    if (error.code === "insufficient_quota") {
      return {
        success: false,
        error: "OpenAI API quota exceeded",
        message: "API quota limit reached. Please check your OpenAI account.",
      };
    }

    if (error.code === "invalid_api_key") {
      return {
        success: false,
        error: "Invalid OpenAI API key",
        message: "Please check your OpenAI API key configuration.",
      };
    }

    return {
      success: false,
      error: error.message || "Failed to generate AI profile",
      details: error,
    };
  }
};

/**
 * Create AI prompt template for user profile generation
 * @param {Object} userData - User data and questionnaire responses
 * @returns {string} - Formatted prompt for OpenAI
 */
const createAIPrompt = userData => {
  return `Given the following answers from a user, create a single, well-structured sentence for the 'more_info' field in this exact format:

'[Name]'s age is between [age_range]. His Hebrew level is: [hebrew_level]. He wants to learn Hebrew for [motivation]. His goal is [goal]. He has tried learning using [previous_methods]. His feeling confidence is [feeling_confidence] when speaking Hebrew. His feeling frustration is [feeling_frustration]. His feeling motivation is [feeling_motivation] to start learning Hebrew.'

User Data:
- Name: ${userData.name}
- Age Range: ${userData.age_range}
- Hebrew Level: ${userData.hebrew_level}
- Motivation: ${userData.motivation}
- Goal: ${userData.goal}
- Previous Methods: ${userData.previous_methods}
- Confidence Level: ${userData.confidence_level}
- Frustration Level: ${userData.frustration_level}
- Motivation Level: ${userData.motivation_level}

Return only the formatted sentence, no additional text.`;
};

/**
 * Test AI service with sample data
 * @returns {Promise<Object>} - Test result
 */
export const testAIService = async () => {
  const sampleData = {
    name: "Ahmed",
    age_range: "25-34",
    hebrew_level: "beginner",
    motivation: "work",
    goal: "basic_conversation",
    previous_methods: "mobile_app",
    confidence_level: "low",
    frustration_level: "moderately",
    motivation_level: "highly_motivated",
  };

  console.log("🧪 Testing AI service with sample data...");
  return await generateUserProfile(sampleData);
};

/**
 * Validate OpenAI API configuration
 * @returns {Promise<Object>} - Validation result
 */
export const validateAIConfiguration = async () => {
  try {
    console.log("🔍 Validating OpenAI API configuration...");

    // Check if API key is configured
    const apiKey =
      import.meta.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: "OpenAI API key not configured",
        message:
          "Please set VITE_OPENAI_API_KEY or OPENAI_API_KEY environment variable",
      };
    }

    // Test API connection with a simple request
    const response = await openai.models.list();

    console.log("✅ OpenAI API configuration is valid");
    return {
      success: true,
      message: "OpenAI API configuration is valid",
      models: response.data.length,
    };
  } catch (error) {
    console.error("❌ OpenAI API configuration validation failed:", error);
    return {
      success: false,
      error: error.message || "Failed to validate OpenAI configuration",
      details: error,
    };
  }
};
