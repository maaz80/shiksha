import { API_URL } from "./api.js";

const API = API_URL;

export const getLocations = async () => {

     try {

          const res = await fetch(`${API}/locations`);
          return await res.json();

     } catch (err) {

          console.error(err);
          return [];

     }

};