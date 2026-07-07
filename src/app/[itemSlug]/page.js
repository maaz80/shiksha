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
    try {
      // Fetch locations, course, and blog in parallel to minimize TTFB
      const [locations, courseDetails, blogDetails] = await Promise.all([
        getLocations().catch(() => null),
        getCourseBySlug(itemSlug).catch(() => null),
        getBlogBySlug(itemSlug).catch(() => null)
      ]);

      // 1. Try resolving as location
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

      // 2. Try course
      if (!pageType && courseDetails) {
        resolvedData = courseDetails;
        pageType = 'course';
      }

      // 3. Try blog
      if (!pageType && blogDetails) {
        resolvedData = blogDetails;
        pageType = 'blog';
      }
    } catch (e) {
      console.error("Error resolving slug in parallel on server:", e);
    }

    if (!pageType) {
      pageType = 'notfound';
    }
  }

  return <ItemPage initialPageType={pageType} initialResolvedData={resolvedData} />;
}
