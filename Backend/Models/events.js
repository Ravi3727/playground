const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    on_date: {
      type: Date,
      required: true,
    },
    venue: {
      mode: {
        type: String,
        enum: ["online", "offline"],
        required: true,
      },
      place: {
        type: String,
        required: true,
      },
    },
    registered_user_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    ],
    department: [
      {
        type: String,
        enum: [
          "web dev",
          "cybersecurity",
          "AI/ML",
          "Open Source",
          "App dev",
          "UI/UX",
        ],
        required: true,
      },
    ],
    winners: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        position: {
          type: String,
          enum: ["1st", "2nd", "3rd" ], // Add more as needed
        },
      },
    ],
    type_of_event: {
      type: String,
      enum: ["Hackathon", "Speaker Session", "Workshop", "Meetup"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
