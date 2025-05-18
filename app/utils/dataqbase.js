import mongoose from "mongoose"

const connectDB = async() =>{
    try {
        await mongoose.connect("mongodb+srv://apacinate:A7NYqreTEhdD9zJi@cluster0.njeu6vp.mongodb.net/nextMarketDataServerActions?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Success:Connected to MongoDB")
    } catch {
        console.log("Failure:Unconnected to MongoDB")
        throw new Error()
    }
}
export default connectDB