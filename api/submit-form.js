import { appendToSheet } from "./index.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

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

    return res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    return res.status(500).json({ message: "Error submitting form" });
  }
}
