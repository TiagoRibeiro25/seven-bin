import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

connectToDatabase();

export default mongoose;
