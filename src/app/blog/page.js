import Blogs from "../../page-components/Blogs";
import { getBlogs } from "../../utils/blogService";
import { getTestimonials } from "../../utils/testimonialService";
import { getPageSEO } from "../../utils/seoService";
import { getOptimizedCloudinaryUrl } from "../../utils/cloudinary";

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

  const firstBlogImage = blogs?.[0]?.image;
  const lcpPreloadUrl = firstBlogImage ? getOptimizedCloudinaryUrl(firstBlogImage, { width: 400, quality: "auto:eco", format: "auto", crop: "fill" }) : null;

  return (
    <>
      {lcpPreloadUrl && (
        <link rel="preload" as="image" href={lcpPreloadUrl} fetchPriority="high" />
      )}
      <Blogs initialBlogs={blogs} initialTestimonials={testimonials} />
    </>
  );
}

