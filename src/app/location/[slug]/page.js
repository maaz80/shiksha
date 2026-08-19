import Location from "../../../page-components/Location";
import { getLocations } from "../../../utils/locations";
import { getAllReviews } from "../../../utils/courseService";

export async function generateStaticParams() {
  try {
    const locations = await getLocations();
    const params = [];
    if (Array.isArray(locations)) {
      for (const loc of locations) {
        if (Array.isArray(loc.items)) {
          for (const item of loc.items) {
            if (item.slug || item._id) {
              params.push({ slug: item.slug || item._id });
            }
          }
        }
      }
    }
    return params;
  } catch (err) {
    console.error("Error generating static params for locations:", err);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let locationItem = null;

  try {
    const locations = await getLocations().catch(() => []);
    if (Array.isArray(locations)) {
      for (const loc of locations) {
        const found = loc.items?.find((i) => i.slug === slug || i._id === slug);
        if (found) {
          locationItem = found;
          break;
        }
      }
    }
  } catch (e) {
    console.error("Error generating location metadata:", e);
  }

  const title = locationItem?.seoTitle || locationItem?.title || "Location Courses | Shiksha";
  const description = locationItem?.description || "Explore top courses in your location with Shiksha.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  let resolvedLocation = null;
  let testimonials = [];

  try {
    const [locations, reviews] = await Promise.all([
      getLocations().catch(() => []),
      getAllReviews().catch(() => [])
    ]);
    testimonials = reviews;
    if (locations) {
      for (const loc of locations) {
        const found = loc.items?.find(
          (i) => i.slug === slug || i._id === slug
        );
        if (found) {
          resolvedLocation = found;
          break;
        }
      }
    }
  } catch (e) {
    console.error("Error fetching location data on server:", e);
  }

  return <Location location={resolvedLocation} slug={slug} initialTestimonials={testimonials} />;
}
