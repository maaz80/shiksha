import AllCourses from "../../page-components/AllCourses";
import { getCourses } from "../../utils/courseService";
import { getPageSEO } from "../../utils/seoService";

export async function generateMetadata() {
  const seo = await getPageSEO("courses").catch(() => null);
  return {
    title: seo?.title || "Explore Industry Certified Courses | Shiksha",
    description: seo?.description || "Master UI/UX design, web development, and digital skills with expert mentorship.",
    keywords: seo?.keywords || "courses, ui ux, full stack, shiksha",
  };
}

export default async function Page() {
  const courses = await getCourses().catch(() => []);
  return <AllCourses initialCourses={courses} />;
}
