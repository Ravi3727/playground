import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerk_id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    graduatingYear: {
      type: String,
    },
    about: {
      type: String,
    },
    projects: {
      type: Array,
    },
    blogs: {
      type: Array,
    },
    resources_Shared: {
      type: Array,
    },
    events_Participated: {
      type: Array,
    },
    social_media_handles: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;