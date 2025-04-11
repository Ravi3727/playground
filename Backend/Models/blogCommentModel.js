import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Resource model
    ref: "Blog",
    required: true,
  },
  userId: {
    type: String, // ID of the user who made the comment
    required: true,
  },
  comment: {
    type: String, // The actual comment text
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for when the comment was created
  },
});

export default mongoose.model("BlogComment", commentsSchema);
