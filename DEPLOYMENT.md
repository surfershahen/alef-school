# Deployment Guide - ALEF School

## ⚠️ Critical: Fixing the API Key Leak

If you received a notification from OpenAI about a leaked API key, follow these steps:

### Step 1: Update Environment Variables in Vercel

1. **Go to Vercel Dashboard**

   - Navigate to: https://vercel.com/dashboard
   - Select your `alef-school` project

2. **Set New Environment Variable**

   - Go to: Settings → Environment Variables
   - Add a new variable:
     - **Key**: `OPENAI_API_KEY`
     - **Value**: Your new OpenAI API key (starts with `sk-proj-`)
     - **Environments**: Select all (Production, Preview, Development)

3. **Remove Old Variable (if exists)**
   - Delete any variable named `VITE_OPENAI_API_KEY`
   - This was the insecure method that caused the leak

### Step 2: Redeploy Your Application

After setting the environment variable:

```bash
# Option 1: Redeploy through Vercel Dashboard
Go to Deployments → Click "..." on latest → Redeploy

# Option 2: Deploy via Git
git add .
git commit -m "Security: Move OpenAI API to secure serverless proxy"
git push origin main
```

### Step 3: Verify the Fix

1. **Check Deployment Logs**

   - Make sure deployment completed successfully
   - No errors related to missing environment variables

2. **Test the Application**

   - Fill out a questionnaire on your website
   - Verify AI profile generation works
   - Check Vercel Functions logs for any errors

3. **Verify API Key is Not Exposed**
   - Open your website in Chrome
   - Press F12 → Network tab
   - Fill out a form and submit
   - Look for requests to `/api/openai-proxy` (not directly to OpenAI)
   - Check that Authorization headers don't contain your API key

## Architecture Overview

### Before (Insecure ❌)

```
Frontend → OpenAI API
(API key embedded in JavaScript bundle - visible to everyone!)
```

### After (Secure ✅)

```
Frontend → /api/openai-proxy → OpenAI API
(API key stays on server, never exposed to client)
```

## Files Changed

1. **Created:**

   - `/api/openai-proxy.js` - Serverless function that securely calls OpenAI

2. **Updated:**

   - `/src/utils/aiProcessing.js` - Now calls proxy instead of OpenAI directly
   - `/vercel.json` - Configured to handle API routes
   - `/.gitignore` - Removed /api from ignore list

3. **Added Documentation:**
   - `/SECURITY.md` - Security best practices
   - `/DEPLOYMENT.md` - This file

## Local Development Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd alef-school

# 2. Install dependencies
npm install

# 3. Create .env file and add your key
echo "OPENAI_API_KEY=sk-proj-your-key-here" > .env

# 4. Run development server
npm run dev
```

## Vercel Functions

The `/api/openai-proxy.js` function will automatically be deployed as a Vercel Edge Function.

**Endpoint:** `https://your-domain.vercel.app/api/openai-proxy`

**Method:** POST

**Headers:**

- `Content-Type: application/json`

**Body:**

```json
{
  "model": "gpt-4-1106-preview",
  "messages": [...],
  "max_tokens": 300,
  "temperature": 0.3
}
```

## Troubleshooting

### "Missing OpenAI API key" Error

**Cause:** Environment variable not set in Vercel

**Solution:**

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add `OPENAI_API_KEY` with your key
3. Redeploy

### API Calls Failing

**Cause:** Old deployment still active

**Solution:**

1. Clear browser cache
2. Hard refresh (Ctrl/Cmd + Shift + R)
3. Redeploy latest commit

### "Server configuration error"

**Cause:** Environment variable name mismatch

**Solution:**

- Variable name must be exactly: `OPENAI_API_KEY`
- Not: `VITE_OPENAI_API_KEY`, `OPENAI_KEY`, or anything else

## Security Checklist

Before considering the deployment complete, verify:

- [ ] New `OPENAI_API_KEY` environment variable set in Vercel
- [ ] Old `VITE_OPENAI_API_KEY` removed from Vercel (if it existed)
- [ ] Application deployed successfully
- [ ] Questionnaire and AI profile generation working
- [ ] API key NOT visible in browser DevTools
- [ ] All requests to OpenAI go through `/api/openai-proxy`
- [ ] `.env` file NOT committed to git
- [ ] Old API key disabled in OpenAI dashboard

## Monitoring

### OpenAI Dashboard

- Monitor usage: https://platform.openai.com/usage
- Set spending limits to prevent unexpected charges
- Rotate keys every 3-6 months

### Vercel Logs

- Check function logs: Vercel Dashboard → Functions
- Monitor for errors or unusual activity

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Review SECURITY.md for best practices
3. Contact Base44 support: app@base44.com
