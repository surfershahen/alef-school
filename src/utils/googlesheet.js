// import { google } from "googleapis";

// // Use default credentials (GCP environment)
// const auth = new google.auth.GoogleAuth({
//   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
// });

// const sheets = google.sheets({ version: "v4", auth });

// export async function appendToSheet(values) {
//   try {
//     const response = await sheets.spreadsheets.values.append({
//       spreadsheetId: process.env.GOOGLE_SHEET_ID,
//       range: "Sheet1!A:Z",
//       valueInputOption: "USER_ENTERED",
//       insertDataOption: "INSERT_ROWS",
//       resource: {
//         values: [values],
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error appending to Google Sheet:", error);
//     throw error;
//   }
// }
