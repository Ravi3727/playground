import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
  resourceId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Resource model
    ref: "Resource",
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

export default mongoose.model("Comment", commentsSchema);
