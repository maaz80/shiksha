"use client";

import React from "react";
import { CourseProvider } from "../context/CourseContext";
import { BlogProvider } from "../context/BlogContext";

export default function Providers({ children }) {
  return (
    <CourseProvider>
      <BlogProvider>
        {children}
      </BlogProvider>
    </CourseProvider>
  );
}
