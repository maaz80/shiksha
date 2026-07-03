import mongoose from "mongoose";

let cachedConnection = global.mongoose;

if (!cachedConnection) {
     cachedConnection = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
     if (cachedConnection.conn) {
          return cachedConnection.conn;
     }

     if (!cachedConnection.promise) {
          const opts = {
               bufferCommands: true,
          };

          cachedConnection.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongooseInstance) => {
               console.log("MongoDB Connected");
               return mongooseInstance;
          });
     }

     try {
          cachedConnection.conn = await cachedConnection.promise;
     } catch (e) {
          cachedConnection.promise = null;
          console.error("MongoDB connection error:", e);
          throw e;
     }

     return cachedConnection.conn;
};

export default connectDB;