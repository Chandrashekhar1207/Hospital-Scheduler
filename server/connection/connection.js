import mongoose from "mongoose";


const connectDB = async () => {
  try {
     await mongoose.connect(
      "mongodb+srv://csk1207:<JC561322Y>@cluster0.nptnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
     );
     console.log("Database connected");
  } catch (error) {
    console.log("Error: ", error);
  }
}

export default connectDB;