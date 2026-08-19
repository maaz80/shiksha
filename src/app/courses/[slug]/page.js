import CourseDetails from "../../../page-components/CourseDetails";
import { getCourseBySlug, getCourses } from "../../../utils/courseService";
import { getTestimonials } from "../../../utils/testimonialService";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const courses = await getCourses();
    if (!Array.isArray(courses)) return [];
    return courses.map((course) => ({
      slug: course.slug || course._id,
    }));
  } catch (err) {
    console.error("Error generating static params for courses:", err);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug).catch(() => null);

  const title = course?.seoTitle || course?.title || "Course Details | Shiksha";
  const description = course?.seoDescription || course?.overview || "Master in-demand skills with industry-leading courses at Shiksha.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: course?.image ? [course.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  let resolvedCourse = null;
  let testimonials = [];

  try {
    const [courseRes, testRes] = await Promise.all([
      getCourseBySlug(slug).catch(() => null),
      getTestimonials().catch(() => [])
    ]);
    resolvedCourse = courseRes;
    testimonials = testRes;
  } catch (e) {
    console.error("Error fetching course details on server:", e);
  }

  return <CourseDetails course={resolvedCourse} slug={slug} initialTestimonials={testimonials} />;
}
