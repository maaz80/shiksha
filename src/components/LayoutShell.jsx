"use client";

import React, { useState, Suspense, lazy, useRef } from 'react';
import Navbar from './Navbar';
import Toast from './Toast';
import { usePageSEO } from '../hooks/usePageSEO';

// Lazy load components that are not immediately visible
const Footer = lazy(() => import('./Footer'));
const ProgramModal = lazy(() => import('./Home/ProgramModal'));
const AuthModal = lazy(() => import('./AuthModal'));

export default function LayoutShell({ children }) {
  usePageSEO();
  const [isModal, setIsModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [authRefresh, setAuthRefresh] = useState(0);
  const hoverTimeoutRef = useRef(null);

  const startCloseTimeout = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = setTimeout(() => {
        setIsModal(false);
      }, 200);
    }
  };

  const clearCloseTimeout = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setIsModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsLogin(false);
    setAuthRefresh(prev => prev + 1);
  };

  return (
    <div className="open-sans bg-primary-bg min-h-screen flex flex-col pt-15 md:pt-16 lg:pt-20">
      <Suspense fallback={null}>
        <ProgramModal isModal={isModal} setIsModal={setIsModal} onMouseEnter={clearCloseTimeout} onMouseLeave={startCloseTimeout} />
      </Suspense>

      <Suspense fallback={null}>
        <AuthModal isOpen={isLogin} onClose={() => setIsLogin(false)} onAuthSuccess={handleAuthSuccess} />
      </Suspense>

      <Navbar key={authRefresh} isModal={isModal} setIsModal={setIsModal} isLogin={isLogin} setIsLogin={setIsLogin} onCoursesMouseEnter={clearCloseTimeout} onCoursesMouseLeave={startCloseTimeout} />
      <Toast />

      <main className="flex-1">
        {children}
      </main>

      <Suspense fallback={<div className="bg-dark-blue w-full mt-20 min-h-190 md:min-h-130" aria-hidden="true" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
