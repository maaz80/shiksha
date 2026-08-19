"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCurrentUser, isUserLoggedIn, logoutUser } from "../utils/auth";

const UserAuthContext = createContext({
     user: null,
     isLoggedIn: false,
     loading: true,
     refreshUser: async () => {},
     logout: async () => {},
     isCourseUnlocked: () => false,
});

export function UserAuthProvider({ children }) {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);

     const fetchUser = useCallback(async () => {
          if (!isUserLoggedIn()) {
               setUser(null);
               setLoading(false);
               return null;
          }

          try {
               const userData = await getCurrentUser();
               setUser(userData);
               return userData;
          } catch (err) {
               console.error("UserAuthContext fetchUser error:", err);
               setUser(null);
               return null;
          } finally {
               setLoading(false);
          }
     }, []);

     useEffect(() => {
          fetchUser();

          const handleAuthChange = () => {
               fetchUser();
          };

          if (typeof window !== "undefined") {
               window.addEventListener("userAuthStateChanged", handleAuthChange);
               window.addEventListener("storage", handleAuthChange);
               window.addEventListener("courseEnrollmentChanged", handleAuthChange);
          }

          return () => {
               if (typeof window !== "undefined") {
                    window.removeEventListener("userAuthStateChanged", handleAuthChange);
                    window.removeEventListener("storage", handleAuthChange);
                    window.removeEventListener("courseEnrollmentChanged", handleAuthChange);
               }
          };
     }, [fetchUser]);

     const logout = useCallback(async () => {
          try {
               await logoutUser();
          } catch (err) {
               console.error("Logout error:", err);
          } finally {
               setUser(null);
               if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("userAuthStateChanged"));
                    if (window.location.pathname.startsWith("/dashboard")) {
                         window.location.href = "/";
                    } else {
                         window.location.reload();
                    }
               }
          }
     }, []);

     const refreshUser = useCallback(async () => {
          const u = await fetchUser();
          if (typeof window !== "undefined") {
               window.dispatchEvent(new CustomEvent("userAuthStateChanged"));
          }
          return u;
     }, [fetchUser]);

     const isCourseUnlocked = useCallback((course) => {
          if (!user || !user.enrolledCourses || !Array.isArray(user.enrolledCourses)) {
               return false;
          }
          if (!course) return false;

          const targetId = (course._id || course.id || "").toString().toLowerCase();
          const targetSlug = (course.slug || "").toString().toLowerCase();

          return user.enrolledCourses.some((item) => {
               if (!item) return false;

               const itemCourseId = (
                    typeof item.courseId === "object" && item.courseId?._id
                         ? item.courseId._id
                         : item.courseId || ""
               ).toString().toLowerCase();

               const itemCourseSlug = (
                    item.courseSlug ||
                    (typeof item.courseId === "object" ? item.courseId?.slug : "") ||
                    ""
               ).toString().toLowerCase();

               if (targetId && itemCourseId && itemCourseId === targetId) return true;
               if (targetSlug && itemCourseSlug && itemCourseSlug === targetSlug) return true;

               return false;
          });
     }, [user]);

     return (
          <UserAuthContext.Provider
               value={{
                    user,
                    isLoggedIn: !!user,
                    loading,
                    refreshUser,
                    logout,
                    isCourseUnlocked,
               }}
          >
               {children}
          </UserAuthContext.Provider>
     );
}

export function useUserAuth() {
     return useContext(UserAuthContext);
}
