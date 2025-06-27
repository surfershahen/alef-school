export function saveUserInfo({ name = "", email = "" } = {}) {
  try {
    const payload = { name, email };
    localStorage.setItem("userInfo", JSON.stringify(payload));
  } catch (error) {
    // localStorage might be unavailable (e.g., in private mode)
    console.error("Failed to save user info to localStorage", error);
  }
}

export function getUserInfo() {
  try {
    const stored = localStorage.getItem("userInfo");
    if (!stored) return { name: "", email: "" };
    const parsed = JSON.parse(stored);
    return {
      name: parsed?.name || "",
      email: parsed?.email || "",
    };
  } catch (error) {
    console.error("Failed to read user info from localStorage", error);
    return { name: "", email: "" };
  }
}
