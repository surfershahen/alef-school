import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

// Google Sheets setup
const auth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

async function appendToSheet(values) {
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A:Z",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: { values: [values] },
  });
  return response.data;
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API endpoint
app.post("/api/submit-form", async (req, res) => {
  try {
    const { name, email, phone, age, q1, q2, q3, q4, q5, q6, q7 } = req.body;

    const values = [
      name || "",
      email || "",
      phone || "",
      age || "",
      q1 || "",
      q2 || "",
      q3 || "",
      q4 || "",
      q5 || "",
      q6 || "",
      q7 || "",
    ];

    await appendToSheet(values);
    res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ message: "Error submitting form" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
