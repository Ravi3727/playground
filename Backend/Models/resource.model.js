import mongoose from "mongoose";
const { Schema } = mongoose;

const resourceSchema = new mongoose.Schema({
  sharedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Resource must be shared by a user."],
  },
  title: {
    type: String,
    required: [true, "Resource must have a title."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Resource must have a description."],
    trim: true,
  },
  resourceUrl: {
    type: [String],
    required: [true, "Resource must have at least one valid URL."],
    validate: {
      validator: function (urls) {
        return urls.every((url) => /^https?:\/\/.+/.test(url));
      },
      message: "Each resource URL must be a valid URL.",
    },
  },
  tag: {
    type: String,
    required: [true, "Resource must have a tag."],
    enum: {
      values: [
        "AI/ML",
        "DSA/CP",
        "Web Dev",
        "App Dev",
        "UI/UX",
        "Cyber Security",
        "Open Source",
        "Other",
      ],
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  likedBy: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Resource", resourceSchema);
