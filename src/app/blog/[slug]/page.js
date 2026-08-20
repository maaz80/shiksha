import BlogDetails from "../../../page-components/BlogDetails";
import { getBlogBySlug, getBlogs } from "../../../utils/blogService";
import { getTestimonials } from "../../../utils/testimonialService";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const blogs = await getBlogs().catch(() => []);
    if (!Array.isArray(blogs) || blogs.length === 0) {
      return [{ slug: "default" }];
    }
    return blogs.map((blog) => ({
      slug: String(blog.slug || blog._id),
    }));
  } catch (err) {
    console.error("Error generating static params for blogs:", err);
    return [{ slug: "default" }];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug).catch(() => null);

  const title = blog?.seoTitle || blog?.title || "Blog Details | Shiksha";
  const description = blog?.seoDescription || blog?.excerpt || blog?.description || "Read our latest articles and career tips at Shiksha.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: blog?.image ? [blog.image] : [],
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
  let resolvedBlog = null;
  let testimonials = [];

  try {
    const [blogRes, testRes] = await Promise.all([
      getBlogBySlug(slug).catch(() => null),
      getTestimonials().catch(() => [])
    ]);
    resolvedBlog = blogRes;
    testimonials = testRes;
  } catch (e) {
    console.error("Error fetching blog details on server:", e);
  }

  return <BlogDetails blog={resolvedBlog} slug={slug} initialTestimonials={testimonials} />;
}
