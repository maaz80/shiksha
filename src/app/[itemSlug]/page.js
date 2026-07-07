import ItemPage from "../../page-components/ItemPage";
import { getLocations } from "../../utils/locations";
import { getCourseBySlug } from "../../utils/courseService";
import { getBlogBySlug } from "../../utils/blogService";

const LOCATION_SLUGS = new Set([
     "full-stack-development-courses-shiksha"
]);

export default async function Page({ params }) {
  const { itemSlug } = await params;

  let pageType = null;
  let resolvedData = null;

  if (LOCATION_SLUGS.has(itemSlug)) {
    pageType = 'location';
    try {
      const locations = await getLocations();
      if (locations) {
        for (const loc of locations) {
          const found = loc.items?.find(
            (i) => i.slug === itemSlug || i._id === itemSlug
          );
          if (found) {
            resolvedData = found;
            break;
          }
        }
      }
    } catch (e) {
      console.error("Error fetching location data on server:", e);
    }
  } else {
    // 1. Try resolving as location
    try {
      const locations = await getLocations();
      if (locations) {
        for (const loc of locations) {
          const found = loc.items?.find(
            (i) => i.slug === itemSlug || i._id === itemSlug
          );
          if (found) {
            resolvedData = found;
            pageType = 'location';
            break;
          }
        }
      }
    } catch (e) {
      console.error("Error fetching locations on server:", e);
    }

    // 2. Try course
    if (!pageType) {
      try {
        const courseDetails = await getCourseBySlug(itemSlug);
        if (courseDetails) {
          resolvedData = courseDetails;
          pageType = 'course';
        }
      } catch (e) {
        console.error("Error fetching course details on server:", e);
      }
    }

    // 3. Try blog
    if (!pageType) {
      try {
        const blogDetails = await getBlogBySlug(itemSlug);
        if (blogDetails) {
          resolvedData = blogDetails;
          pageType = 'blog';
        }
      } catch (e) {
        console.error("Error fetching blog details on server:", e);
      }
    }

    if (!pageType) {
      pageType = 'notfound';
    }
  }

  return <ItemPage initialPageType={pageType} initialResolvedData={resolvedData} />;
}
