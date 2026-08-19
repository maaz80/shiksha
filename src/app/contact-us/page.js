import ContactUs from "../../page-components/ContactUs";
import { getPageSEO } from "../../utils/seoService";

export async function generateMetadata() {
  const seo = await getPageSEO("contact-us").catch(() => null);
  return {
    title: seo?.title || "Contact Us | Shiksha",
    description: seo?.description || "Get in touch with our admissions & counseling team at Shiksha.",
    keywords: seo?.keywords || "contact, enquiry, support, shiksha",
  };
}

export default function Page() {
  return <ContactUs />;
}
