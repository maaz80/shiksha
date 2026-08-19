import AboutUs from "../../page-components/AboutUs";
import { getTestimonials } from "../../utils/testimonialService";
import { getPageSEO } from "../../utils/seoService";

export async function generateMetadata() {
  const seo = await getPageSEO("about-us").catch(() => null);
  return {
    title: seo?.title || "About Us | Shiksha",
    description: seo?.description || "Learn more about Shiksha, our mission, vision, and team.",
    keywords: seo?.keywords || "about us, shiksha, education",
  };
}

export default async function Page() {
  const testimonials = await getTestimonials().catch(() => []);
  return <AboutUs initialTestimonials={testimonials} />;
}
