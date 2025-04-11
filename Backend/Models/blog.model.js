import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
          type:String,
          required:true,
          trim:true
    },
    description: {
        type:String,
        required:true,
        trim:true
    },
    blog: {
        type:String,
        required:true,
        trim:true
    },
    tag: {
        type: String,
        required: true,
        enum: ["AI/ML", "DSA/CP", "Web Dev", "App Dev", "UI/UX", "Cyber security"]
      },
      isVerified: {
        type: Boolean,
        default:false
      },
      likedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
      
      writer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
      }
}, { timestamps: true } );
const blogModel=mongoose.model("Blog",blogSchema);
export default blogModel;