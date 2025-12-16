/**
 * Secure OpenAI API Proxy
 * This serverless function keeps the API key on the server-side only
 * and prevents exposure to the client
 */

export const config = {
  runtime: 'edge',
};

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export default async function handler(request) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Get the API key from environment variables (server-side only)
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('Missing OPENAI_API_KEY environment variable');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse the request body
    const body = await request.json();

    // Validate required fields
    if (!body.messages || !Array.isArray(body.messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: messages array required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Prepare the payload for OpenAI
    const payload = {
      model: body.model || 'gpt-4-1106-preview',
      messages: body.messages,
      max_tokens: body.max_tokens || 300,
      temperature: body.temperature || 0.3,
    };

    // Call OpenAI API with the server-side API key
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage =
        responseData?.error?.message ||
        `OpenAI API error with status ${response.status}`;
      
      console.error('OpenAI API Error:', errorMessage);
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Return the successful response
    return new Response(
      JSON.stringify(responseData),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Proxy Error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
