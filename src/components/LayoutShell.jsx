"use client";

import React, { useState, Suspense, lazy, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import QuickAccessBar from './QuickAccessBar';
import Toast from './Toast';
import { usePageSEO } from '../hooks/usePageSEO';

// Lazy load modal/interactive overlays
const ProgramModal = lazy(() => import('./Home/ProgramModal'));
const AuthModal = lazy(() => import('./AuthModal'));
const LeadModal = lazy(() => import('./LeadModal'));
const Chatbot = lazy(() => import('./Chatbot'));
const CookieBanner = lazy(() => import('./CookieBanner'));

import { usePathname } from 'next/navigation';

export default function LayoutShell({ children, initialLocations = [] }) {
  usePageSEO();
  const pathname = usePathname();
  const isDashboardPage = pathname === "/dashboard" || pathname?.startsWith("/dashboard");
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
    <div className={`open-sans bg-primary-bg min-h-screen flex flex-col ${isDashboardPage ? "pt-15 md:pt-16 lg:pt-20" : "pt-22 md:pt-24 lg:pt-28"} pb-2 md:pb-14`}>
      <Suspense fallback={null}>
        <ProgramModal isModal={isModal} setIsModal={setIsModal} onMouseEnter={clearCloseTimeout} onMouseLeave={startCloseTimeout} />
      </Suspense>

      <Suspense fallback={null}>
        <AuthModal isOpen={isLogin} onClose={() => setIsLogin(false)} onAuthSuccess={handleAuthSuccess} />
      </Suspense>

      <Suspense fallback={null}>
        <LeadModal />
      </Suspense>

      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>

      <Suspense fallback={null}>
        <CookieBanner />
      </Suspense>

      <QuickAccessBar />

      <Navbar key={authRefresh} isModal={isModal} setIsModal={setIsModal} isLogin={isLogin} setIsLogin={setIsLogin} onCoursesMouseEnter={clearCloseTimeout} onCoursesMouseLeave={startCloseTimeout} />
      <Toast />

      <main className="flex-1">
        {children}
      </main>

      <Footer initialLocations={initialLocations} />
    </div>
  );
}
