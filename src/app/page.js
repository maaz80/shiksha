import Home from "../page-components/Home";
import { getBlogs } from "../utils/blogService";
import { getTestimonials } from "../utils/testimonialService";
import { getCompanies } from "../utils/companyService";
import { getLocations } from "../utils/locations";
import { getPageSEO } from "../utils/seoService";

export async function generateMetadata() {
  const seo = await getPageSEO("home").catch(() => null);
  return {
    title: seo?.title || "Shiksha - Master In-Demand Skills & Get Certified",
    description: seo?.description || "Master in-demand skills with industry-leading courses. Get certified, land your dream job, and join thousands of successful graduates.",
    keywords: seo?.keywords || "shiksha, courses, design, full stack",
  };
}

export default async function Page() {
  const [blogs, testimonials, companies, locations] = await Promise.all([
    getBlogs().catch(() => []),
    getTestimonials().catch(() => []),
    getCompanies().catch(() => null),
    getLocations().catch(() => [])
  ]);

  return (
    <Home
      initialBlogs={blogs}
      initialTestimonials={testimonials}
      initialCompanies={companies}
      initialLocations={locations}
    />
  );
}
