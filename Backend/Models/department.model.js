import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  numberOfMembers: {
    type: Number,
    default: 0,
  },
  departmentHead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  departmentCohead: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default mongoose.model("Department", departmentSchema);