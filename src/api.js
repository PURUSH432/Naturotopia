const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:3001/api" : "/api");

export function getToken() {
  return localStorage.getItem("naturotopia_token");
}

export function saveSession({ token, user }) {
  localStorage.setItem("naturotopia_token", token);
  localStorage.setItem("naturotopia_user", JSON.stringify(user));
}

export async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (response.status === 204) return null;
  const text = await response.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = {
      error: `API returned ${response.status} ${response.statusText}. Restart the backend with npm start.`,
    };
  }
  if (!response.ok) throw new Error(body?.error || "Request failed.");
  return body;
}
