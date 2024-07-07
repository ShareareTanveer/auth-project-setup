import { DB_NAME } from "../constants/variables.js";
import mongoose from "mongoose";
const DBConnection = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`);
        console.log("MongoDB Connected!!!")
      } catch (error) {
        console.log("MongoDB Connection Refused!!!", error)
        process.exit(1)
      }
}

export default DBConnection;
