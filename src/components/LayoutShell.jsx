"use client";

import React, { useState, Suspense, lazy, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import QuickAccessBar from './QuickAccessBar';
import Toast from './Toast';
import { usePageSEO } from '../hooks/usePageSEO';
import { useChat } from '../context/ChatContext';
import { usePathname } from 'next/navigation';

// Lazy load heavy modal & interactive overlays on-demand
const ProgramModal = lazy(() => import('./Home/ProgramModal'));
const AuthModal = lazy(() => import('./AuthModal'));
const LeadModal = lazy(() => import('./LeadModal'));
const Chatbot = lazy(() => import('./Chatbot'));
const CookieBanner = lazy(() => import('./CookieBanner'));
import WhatsAppButton from './WhatsAppButton';

export default function LayoutShell({ children, initialLocations = [] }) {
  usePageSEO();
  const pathname = usePathname();
  const isDashboardPage = pathname === "/dashboard" || pathname?.startsWith("/dashboard");
  const isImmersivePage = pathname === "/coming-soon";
  const [isModal, setIsModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [authRefresh, setAuthRefresh] = useState(0);
  const [shouldLoadChatbot, setShouldLoadChatbot] = useState(false);
  const [shouldLoadModals, setShouldLoadModals] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const { isChatbotOpen } = useChat();
  const shouldRenderChatbot = isChatbotOpen || shouldLoadChatbot;
  const shouldRenderModals = isChatbotOpen || shouldLoadModals;

  // Defer Chatbot & Overlay JS bundles until user opens chat or after 3.5s idle time
  useEffect(() => {
    if (isChatbotOpen) return;

    const timer = setTimeout(() => {
      setShouldLoadChatbot(true);
      setShouldLoadModals(true);
    }, 3500);

    const handleOpenLead = () => setShouldLoadModals(true);
    if (typeof window !== "undefined") {
      window.addEventListener("openLeadModal", handleOpenLead);
    }

    return () => {
      clearTimeout(timer);
      if (typeof window !== "undefined") {
        window.removeEventListener("openLeadModal", handleOpenLead);
      }
    };
  }, [isChatbotOpen]);

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
    <div className={`open-sans bg-primary-bg min-h-screen flex flex-col ${isDashboardPage ? "pt-15 md:pt-16 lg:pt-20 pb-0" : isImmersivePage ? "pt-20 md:pt-24 pb-2 md:pb-10" : "pt-22 md:pt-24 lg:pt-28 pb-2 md:pb-14"}`}>
      {isModal && (
        <Suspense fallback={null}>
          <ProgramModal isModal={isModal} setIsModal={setIsModal} onMouseEnter={clearCloseTimeout} onMouseLeave={startCloseTimeout} />
        </Suspense>
      )}

      {isLogin && (
        <Suspense fallback={null}>
          <AuthModal isOpen={isLogin} onClose={() => setIsLogin(false)} onAuthSuccess={handleAuthSuccess} />
        </Suspense>
      )}

      {shouldRenderModals && (
        <Suspense fallback={null}>
          <LeadModal />
        </Suspense>
      )}

      {shouldRenderChatbot && (
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      )}

      {shouldRenderModals && (
        <Suspense fallback={null}>
          <CookieBanner />
        </Suspense>
      )}

      {!isDashboardPage && !isImmersivePage && <QuickAccessBar />}
      {!isDashboardPage && !isImmersivePage && <WhatsAppButton />}

      <Navbar key={authRefresh} isModal={isModal} setIsModal={setIsModal} isLogin={isLogin} setIsLogin={setIsLogin} onCoursesMouseEnter={clearCloseTimeout} onCoursesMouseLeave={startCloseTimeout} />
      <Toast />

      <main className="flex-1">
        {children}
      </main>

      {!isDashboardPage && <Footer initialLocations={initialLocations} />}
    </div>
  );
}
