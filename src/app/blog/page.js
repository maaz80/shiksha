import Blogs from "../../page-components/Blogs";
import { getBlogs } from "../../utils/blogService";
import { getTestimonials } from "../../utils/testimonialService";
import { getPageSEO } from "../../utils/seoService";

export async function generateMetadata() {
  const seo = await getPageSEO("blogs").catch(() => null);
  return {
    title: seo?.title || "Latest Blogs & Industry Insights | Shiksha",
    description: seo?.description || "Explore design, tech, and career insights from industry experts at Shiksha.",
    keywords: seo?.keywords || "blogs, design, tech, shiksha",
  };
}

export default async function Page() {
  const [blogs, testimonials] = await Promise.all([
    getBlogs().catch(() => []),
    getTestimonials().catch(() => [])
  ]);
  return <Blogs initialBlogs={blogs} initialTestimonials={testimonials} />;
}
