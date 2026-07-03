const API = (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL);

export const getLocations = async () => {

     try {

          const res = await fetch(`${API}/locations`);
          return await res.json();

     } catch (err) {

          console.error(err);
          return [];

     }

};