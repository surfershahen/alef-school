# Security Documentation

## OpenAI API Key Protection

### Overview

This project uses OpenAI's API to generate AI-powered student profiles. To protect the API key from exposure, we use a **serverless proxy architecture**.

### Architecture

```
Frontend (Browser)
    ↓
    POST /api/openai-proxy
    ↓
Vercel Edge Function (Server-side)
    ↓
    OpenAI API (with secret key)
```

### Security Measures

1. **Serverless Proxy**: The API key is stored as a Vercel environment variable and only accessed server-side
2. **No Client Exposure**: The frontend never has access to the actual API key
3. **Environment Variables**: Sensitive keys are stored in environment variables, not in code
4. **Gitignore Protection**: `.env` files are excluded from version control

### Environment Variables

#### Required on Vercel (Production):

- `OPENAI_API_KEY`: Your OpenAI API key (set in Vercel dashboard)

#### Removed/Deprecated:

- ~~`VITE_OPENAI_API_KEY`~~ - This was insecure as Vite embeds it in client bundle

### Setting Up Environment Variables

#### Local Development:

1. Create a `.env` file in the project root
2. Add your OpenAI API key to `.env`
3. Never commit `.env` to git

#### Vercel Production:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add `OPENAI_API_KEY` with your actual key
4. Deploy

### API Endpoint

**POST** `/api/openai-proxy`

**Request Body:**

```json
{
  "model": "gpt-4-1106-preview",
  "messages": [
    {
      "role": "system",
      "content": "System prompt"
    },
    {
      "role": "user",
      "content": "User message"
    }
  ],
  "max_tokens": 300,
  "temperature": 0.3
}
```

**Response:**

```json
{
  "choices": [
    {
      "message": {
        "content": "AI response"
      }
    }
  ]
}
```

### Security Checklist

- [x] API key stored in environment variables
- [x] `.env` file in `.gitignore`
- [x] API calls go through serverless proxy
- [x] No API key in client-side code
- [x] No API key in version control
- [x] API endpoint validates requests
- [x] Error messages don't expose sensitive info

### Incident Response

If you suspect an API key has been compromised:

1. **Immediately disable** the key in OpenAI dashboard
2. **Generate a new key** in OpenAI dashboard
3. **Update environment variable** in Vercel dashboard
4. **Redeploy** your application
5. **Review** access logs if available
6. **Audit** codebase for any potential leaks

### Best Practices

1. **Never log API keys** in console or error messages
2. **Rotate keys regularly** (every 3-6 months)
3. **Use different keys** for development and production
4. **Monitor usage** in OpenAI dashboard
5. **Set spending limits** in OpenAI dashboard
6. **Review API calls** regularly for suspicious activity

### Additional Resources

- [OpenAI Best Practices for API Key Safety](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
