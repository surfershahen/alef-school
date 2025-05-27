# Simple Google Sheets Form Submission

A clean, simple implementation to submit form data to Google Sheets using NoCode API.

## Setup

### API Configuration

- **API URL**: `https://v1.nocodeapi.com/shahenhamdan/google_sheets/hpvIeRGVPrCHbgmd`
- **Tab ID**: `student-data`
- **Method**: `POST`

### Google Sheets Structure

The form data is submitted to Google Sheets with the following columns:

1. **Timestamp** - Automatic timestamp when form is submitted
2. **Name** - User's full name
3. **Email** - User's email address
4. **Phone** - User's phone number
5. **City** - User's city

## Implementation

### 1. Service Function (`src/utils/googlesheet.js`)

```javascript
export async function submitFormData(formData)
```

- Takes form data object with `name`, `email`, `phone`, `city`
- Adds timestamp automatically
- Sends POST request to NoCode API
- Returns `{success: true/false, data/error}`

### 2. Form Integration (`src/components/landing/SignupForm.jsx`)

- Imports `submitFormData` function
- Calls it on form submission
- Handles success/error states
- Navigates to exam page on success

## Testing

Use `test-form-submission.html` to test the integration:

1. Open the file in a browser
2. Fill out the form fields
3. Click "Submit to Google Sheets"
4. Check the console and result display

## Data Flow

1. User fills out signup form (name, email, phone, city)
2. Form validation passes
3. `submitFormData()` is called
4. Data is sent to Google Sheets via NoCode API
5. On success: User navigates to exam page
6. On error: Error message is displayed

## Error Handling

- Network errors are caught and displayed
- API errors are logged with full response
- User-friendly error messages in Arabic
- Form remains functional after errors

## Features

✅ **Simple & Clean** - Only handles form submission  
✅ **Automatic Timestamps** - Adds submission time  
✅ **Error Handling** - Comprehensive error management  
✅ **Console Logging** - Detailed logs for debugging  
✅ **User Feedback** - Success/error messages  
✅ **Form Validation** - Client-side validation

## API Request Format

```javascript
POST https://v1.nocodeapi.com/shahenhamdan/google_sheets/hpvIeRGVPrCHbgmd?tabId=student-data

Headers:
Content-Type: application/json

Body:
[
  [
    "05/26/2025, 19:02:44",  // timestamp
    "John Doe",              // name
    "john@example.com",      // email
    "0522926777",           // phone
    "Haifa"                 // city
  ]
]
```

## Notes

- The questionnaire functionality has been simplified and doesn't update Google Sheets
- Focus is on clean, reliable form data submission
- Easy to extend if needed in the future
