# Vercel Analytics Integration Guide

## ✅ What's Been Set Up

### 1. Core Analytics Component

- **Added `<Analytics />` component** to `src/App.jsx`
- This tracks **automatic page views** and **user interactions**

### 2. Custom Event Tracking

- **Created utility file**: `src/utils/vercelAnalytics.js`
- **Functions available**:
  - `trackEvent(eventName, properties)` - General event tracking
  - `trackFormSubmission(formName, success, errorMessage)` - Form submissions
  - `trackPageView(pageName)` - Custom page views
  - `trackButtonClick(buttonName, location)` - Button interactions
  - `trackUserAction(action, details)` - User actions

### 3. Automatic Tracking Added

#### **Page Views:**

- **Landing Page** (`/`) - tracks as `landing_page`
- **Exam Page** (`/exam`) - tracks as `exam_page`
- **Thank You Page** (`/thank-you`) - tracks as `thank_you_page`

#### **Form Events:**

- **Signup Form Success** - tracks as `form_submission` with success: true
- **Signup Form Errors** - tracks as `form_submission` with success: false + error message

## 🚀 How to Verify It's Working

### 1. Check Vercel Dashboard

1. Go to your **Vercel project dashboard**
2. Click on **"Analytics"** tab
3. You should see:
   - **Page views** for each page
   - **Custom events** when users submit forms
   - **User flows** between pages

### 2. Browser Console Check

- Open browser developer tools
- Look for logs like: `"Vercel Analytics event tracked: page_view"`
- No error messages about analytics

### 3. Test Custom Events

Try these actions on your live site:

- **Visit each page** → Should track page views
- **Submit signup form** → Should track form submission
- **Submit with errors** → Should track failed submission

## 📊 What You'll See in Vercel Analytics

### **Automatic Metrics:**

- Page views and unique visitors
- Bounce rate and session duration
- Top pages and referrers
- Device and browser breakdown

### **Custom Events You're Tracking:**

- `page_view` - When users visit pages
- `form_submission` - Signup form success/failure
- Any additional events you add

## 🔧 How to Add More Tracking

### Example: Track Button Clicks

```javascript
import { trackButtonClick } from "@/utils/vercelAnalytics";

const MyComponent = () => {
  const handleCTAClick = () => {
    trackButtonClick("start_now_button", "hero_section");
    // Your existing click logic
  };

  return <Button onClick={handleCTAClick}>Start Now</Button>;
};
```

### Example: Track User Actions

```javascript
import { trackUserAction } from "@/utils/vercelAnalytics";

// Track video play
trackUserAction("video_played", {
  videoName: "intro_video",
  duration: 120,
});

// Track download
trackUserAction("file_downloaded", {
  fileName: "course_brochure.pdf",
});
```

## 📈 Analytics Benefits

### **Free Tier Includes:**

- **10k events per month**
- **Real-time analytics**
- **Custom event tracking**
- **Conversion funnels**

### **What You Can Track:**

- **User journey** through your signup flow
- **Form abandonment** rates
- **Most popular pages**
- **Traffic sources** (where users come from)
- **Device/browser** usage

## 🔍 Debugging

### Common Issues:

1. **No data showing** → Wait 24-48 hours for data aggregation
2. **Events not tracking** → Check browser console for errors
3. **Missing page views** → Ensure `<Analytics />` is in App.jsx

### Debug Mode:

Add this to browser console to see detailed tracking:

```javascript
localStorage.setItem("debug", "true");
```

## 📁 Files Modified

- ✅ `src/App.jsx` - Added `<Analytics />` component
- ✅ `src/utils/vercelAnalytics.js` - Custom tracking utilities
- ✅ `src/components/landing/SignupForm.jsx` - Form tracking
- ✅ `src/pages/index.jsx` - Landing page tracking
- ✅ `src/pages/Exam.jsx` - Exam page tracking
- ✅ `src/pages/ThankYou.jsx` - Thank you page tracking

## 🎯 Next Steps

1. **Deploy your changes** to see analytics in action
2. **Test the signup flow** to verify form tracking
3. **Check Vercel dashboard** after 24 hours for data
4. **Add more tracking** to buttons/interactions you want to measure

Your Vercel Analytics is now fully integrated and ready to provide insights into user behavior! 🚀
