import mongoose from "mongoose";

const navbarSchema = new mongoose.Schema({
     logo: String,
     buttonName: String,
     searchPlaceholder: String,
     dropdownName: String,
     dropdownItems: [{
          name: String,
          link: String,
     }],
     logoutButtonName: String,
}, { _id: false });


export default mongoose.models.Navbar || mongoose.model("Navbar", navbarSchema);
