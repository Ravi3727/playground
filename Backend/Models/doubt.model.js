import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const doubtSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    doubt_description: {
        type: String,
        required: true
    },
    replies: [replySchema],
    department: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true  //createdAt, updatedAt
})

const Doubt = mongoose.model("Doubt", doubtSchema);

export default Doubt;