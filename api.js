// src/api/api.js
const BASE_URL = "https://prelim-exam.onrender.com";

export async function apiRequest(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) options.body = JSON.stringify(body);

  console.log("➡️ Sending request:", endpoint, options); // Debug log

  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const text = await res.text(); // read raw response for debugging

  try {
    return JSON.parse(text);
  } catch {
    return text; // return raw text if not JSON
  }
}
