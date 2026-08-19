"use client";

import React from "react";
import { CourseProvider } from "../context/CourseContext";
import { BlogProvider } from "../context/BlogContext";
import { ChatProvider } from "../context/ChatContext";
import { UserAuthProvider } from "../context/UserAuthContext";

export default function Providers({ children }) {
  return (
    <UserAuthProvider>
      <CourseProvider>
        <BlogProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </BlogProvider>
      </CourseProvider>
    </UserAuthProvider>
  );
}
