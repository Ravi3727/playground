import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,
      required: true,
    },
    mvpLink: {
      type: String,
    },
    createdBy: {
      type: String, // clerk_id of the user
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);
