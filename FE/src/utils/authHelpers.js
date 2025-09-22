const USER_KEY = "auth_user";
const TOKEN_KEY = "auth_token";

export const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem(USER_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    return user && token ? { user: JSON.parse(user), token } : null;
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
    return null;
  }
};

export const setUserToLocalStorage = (user, token) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);
  } catch (err) {
    console.error("Failed to save user to localStorage:", err);
  }
};

export const clearAuthFromLocalStorage = () => {
  try {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.error("Failed to clear auth from localStorage:", err);
  }
};
