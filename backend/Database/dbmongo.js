import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("data base is connected")
    } catch (error) {
        console.log("AN ERROR OCCURED WHILE CONNECTING WITH DATA BASE", error.message)
    }
}

export default connectToMongoDB;