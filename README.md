# ALEF School - Hebrew Learning Platform

A Vite+React application for ALEF School with AI-powered student profile generation.

## 🔒 Security Setup (Important!)

This application uses OpenAI API through a **secure serverless proxy** to protect the API key.

### Environment Variables Setup

1. **Local Development:**

   - Create a `.env` file in the project root
   - Add your key: `OPENAI_API_KEY=sk-proj-your-key-here`

2. **Vercel Production:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `OPENAI_API_KEY` = `your-actual-openai-key`
   - Redeploy the application

**⚠️ Never commit `.env` file to git - it's already in `.gitignore`**

For detailed security information, see [SECURITY.md](./SECURITY.md)

## Running the app

```bash
npm install
npm run dev
```

## Building the app

```bash
npm run build
```

## Project Structure

- `/src/components/` - React components
- `/src/utils/` - Utility functions including AI processing
- `/api/` - Serverless API endpoints (OpenAI proxy)
- `/public/` - Static assets

## Features

- Hebrew learning questionnaire
- AI-powered student profile generation (secure)
- Webhook integration with Make.com
- URL tracking and analytics
- Meta Pixel & TikTok Pixel integration

For more information and support, please contact Base44 support at app@base44.com.
