import { Suspense } from "react";
import Dashboard from "../../page-components/Dashboard";
import { getPageSEO } from "../../utils/seoService";

export async function generateMetadata() {
  const seo = await getPageSEO("dashboard").catch(() => null);

  const title = seo?.title || "Student Dashboard | Shiksha";
  const description = seo?.description || "Access your enrolled courses, lectures, and track learning progress.";
  const keywords = seo?.keywords || "dashboard, student, learning, courses, shiksha";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://shikshadesign.com/dashboard",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[75vh] flex items-center justify-center bg-primary-bg/30">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    }>
      <Dashboard />
    </Suspense>
  );
}
