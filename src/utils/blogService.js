import { API_URL } from "./api.js";

const API = API_URL;

export const getBlogs = async () => {

     try {

          const res = await fetch(`${API}/blogs`);
          return await res.json();

     } catch (err) {

          console.error(err);
          return [];

     }

};
export const getBlogBySlug = async (slug) => {
     try {
          const res = await fetch(`${API}/blogs/${slug}`);

          if (!res.ok) {
               throw new Error("Blog not found");
          }

          return await res.json();

     } catch (err) {
          console.error(err);
          return null;
     }
};
