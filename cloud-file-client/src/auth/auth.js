const API_BASE_URL =
  (typeof window !== "undefined" && window.__API_BASE_URL__) ||
  (typeof process !== "undefined" && process.env && process.env.VITE_API_BASE_URL) ||
  "http://localhost:3000";

// Built-in test accounts. These work without a backend server so testers can
// always sign in. See README.md for usage notes.
export const TEST_ACCOUNTS = [
  {
    name: "Test User",
    email: "tester@cloudfile.dev",
    password: "TestLogin123!",
    token: "test-login-token",
  },
];

export const TEST_SIGNUP_CREDENTIALS = {
  name: "Signup Tester",
  email: "signup-tester@cloudfile.dev",
  password: "TestSignup123!",
  token: "test-signup-token",
};

const findTestAccountByToken = (token) =>
  [...TEST_ACCOUNTS, TEST_SIGNUP_CREDENTIALS].find(
    (account) => account.token === token
  );

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
};

export const authorize = (email, password) => {
  const testAccount = TEST_ACCOUNTS.find((account) => account.email === email);
  if (testAccount) {
    if (testAccount.password !== password) {
      return Promise.reject(new Error("Incorrect email or password"));
    }
    return Promise.resolve({
      token: testAccount.token,
      user: { name: testAccount.name, email: testAccount.email },
    });
  }

  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const register = (name, email, password) => {
  if (email === TEST_SIGNUP_CREDENTIALS.email) {
    if (password !== TEST_SIGNUP_CREDENTIALS.password) {
      return Promise.reject(
        new Error("Incorrect password for the test signup account")
      );
    }
    return Promise.resolve({
      token: TEST_SIGNUP_CREDENTIALS.token,
      user: {
        name: name || TEST_SIGNUP_CREDENTIALS.name,
        email: TEST_SIGNUP_CREDENTIALS.email,
      },
    });
  }

  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
};

export const checkToken = (token) => {
  if (!token) {
    return Promise.resolve(null);
  }

  const testAccount = findTestAccountByToken(token);
  if (testAccount) {
    return Promise.resolve({
      data: { name: testAccount.name, email: testAccount.email },
    });
  }

  return request("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};