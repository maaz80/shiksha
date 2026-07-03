const getApiBase = () => {
     const baseUrl = ((process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL) || "").replace(/\/$/, "");
     if (!baseUrl) return "/api";
     return baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
};

const API = getApiBase();

// Store token in localStorage
export const setUserToken = (token) => {
     if (typeof window !== "undefined") { localStorage.setItem("userToken", token); }
};

// Get token from localStorage
export const getUserToken = () => {
     if (typeof window === "undefined") { return null; } return localStorage.getItem("userToken");
};

// Remove token from localStorage
export const removeUserToken = () => {
     if (typeof window !== "undefined") { localStorage.removeItem("userToken"); }
};

// Check if user is logged in
export const isUserLoggedIn = () => {
     return !!getUserToken();
};

// Get auth header for API requests
export const getAuthHeader = () => {
     const token = getUserToken();
     return token ? { Authorization: `Bearer ${token}` } : {};
};

// Signup API call
export const signupUser = async (name, email, password) => {
     try {
          const res = await fetch(`${API}/auth/signup`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({ name, email, password }),
          });

          const data = await res.json();

          if (!res.ok) {
               throw new Error(data.error || "Signup failed");
          }

          if (data.token) {
               setUserToken(data.token);
          }

          return data;
     } catch (error) {
          console.error("Signup error:", error);
          throw error;
     }
};

// Login API call
export const loginUser = async (email, password) => {
     try {
          const res = await fetch(`${API}/auth/login`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({ email, password }),
          });

          const data = await res.json();

          if (!res.ok) {
               throw new Error(data.error || "Login failed");
          }

          if (data.token) {
               setUserToken(data.token);
          }

          return data;
     } catch (error) {
          console.error("Login error:", error);
          throw error;
     }
};

// Get current user info
export const getCurrentUser = async () => {
     try {
          const token = getUserToken();
          if (!token) {
               return null;
          }

          const res = await fetch(`${API}/auth/me`, {
               headers: {
                    ...getAuthHeader(),
               },
          });

          const data = await res.json();

          if (!res.ok) {
               removeUserToken();
               return null;
          }

          return data.user;
     } catch (error) {
          console.error("Get current user error:", error);
          removeUserToken();
          return null;
     }
};

// Logout
export const logoutUser = async () => {
     try {
          const token = getUserToken();
          if (!token) {
               removeUserToken();
               return;
          }

          await fetch(`${API}/auth/logout`, {
               method: "POST",
               headers: {
                    ...getAuthHeader(),
               },
          });

          removeUserToken();
     } catch (error) {
          console.error("Logout error:", error);
          removeUserToken();
     }
};

// Enroll in course
export const enrollInCourse = async (courseId) => {
     try {
          const res = await fetch(`${API}/enroll`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeader(),
               },
               body: JSON.stringify({ courseId }),
          });

          let data;
          try {
               data = await res.json();
          } catch (parseError) {
               console.error("Failed to parse response as JSON:", parseError);
               throw new Error(`Server error: ${res.status} ${res.statusText}`);
          }

          if (!res.ok) {
               console.error("Enrollment failed with status:", res.status, "data:", data);
               const errorMessage = (data && typeof data.error === 'string') ? data.error : "Enrollment failed";
               throw new Error(errorMessage);
          }

          return data;
     } catch (error) {
          console.error("Enrollment error:", error);
          throw error;
     }
};

// Complete lesson and unlock next
export const completeLessonAndUnlockNext = async (courseId, sectionIndex, lessonIndex) => {
     try {
          const res = await fetch(`${API}/complete-lesson`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeader(),
               },
               body: JSON.stringify({ courseId, sectionIndex, lessonIndex }),
          });

          const data = await res.json();

          if (!res.ok) {
               throw new Error(data.error || "Failed to complete lesson");
          }

          return data;
     } catch (error) {
          console.error("Lesson completion error:", error);
          throw error;
     }
};

// Get course enrollment status
export const getCourseEnrollment = async (courseId) => {
     try {
          const res = await fetch(`${API}/enrollment/${courseId}`, {
               headers: {
                    ...getAuthHeader(),
               },
          });

          const data = await res.json();

          if (!res.ok) {
               throw new Error(data.error || "Failed to get enrollment");
          }

          return data;
     } catch (error) {
          console.error("Get enrollment error:", error);
          return { enrolled: false };
     }
};

// Forgot Password API call
export const forgotPassword = async (email) => {
     try {
          const res = await fetch(`${API}/auth/forgot-password`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({ email }),
          });

          const data = await res.json();

          if (!res.ok) {
               throw new Error(data.error || "Failed to send OTP");
          }

          return data;
     } catch (error) {
          console.error("Forgot password error:", error);
          throw error;
     }
};

// Reset Password API call
export const resetPassword = async (email, otp, newPassword) => {
     try {
          const res = await fetch(`${API}/auth/reset-password`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({ email, otp, newPassword }),
          });

          const data = await res.json();

          if (!res.ok) {
               throw new Error(data.error || "Failed to reset password");
          }

          return data;
     } catch (error) {
          console.error("Reset password error:", error);
          throw error;
     }
};
