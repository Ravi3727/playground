import ApiError from "../API/ApiError.js";
import ApiResponse from "../API/ApiResponse.js";
import asyncHandler from "../API/asyncHandler.js";
import Doubt from "../Models/doubt.model.js";
import mongoose from "mongoose";
import * as clerk from "@clerk/clerk-sdk-node";

const TAG_KEYWORDS = {
    react: ["react", "jsx", "hooks", "useState", "useEffect"],
    javascript: ["javascript", "js", "ecmascript", "console.log"],
    css: ["css", "margin", "padding", "flexbox", "grid"],
    html: ["html", "doctype", "div", "span", "form"],
    python: ["python", "py", "pandas", "numpy", "flask", "django"],
    java: ["java", "jvm", "spring", "jdk", "jre"],
    kotlin: ["kotlin", "android", "jetpack", "compose"],
    flutter: ["flutter", "dart", "widget", "hot reload"],
    ml: ["machine learning", "sklearn", "scikit", "regression", "model"],
    dl: ["deep learning", "neural network", "cnn", "rnn", "tensor"],
    cloud: ["cloud", "aws", "azure", "gcp", "docker", "kubernetes", "devops"]
};

function generateTagsFromText(text) {
    const foundTags = new Set();
    const lowerText = text.toLowerCase();

    for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
        for (const word of keywords) {
            if (lowerText.includes(word)) {
                foundTags.add(tag);
                break; // Only need one keyword match to include the tag
            }
        }
    }

    return Array.from(foundTags);
}


//CRUD operations on the Doubts in the Doubt Forum
export const createDoubt = asyncHandler(async (req, res) => {
    const doubt = req.body;
    if (!doubt.user_id || !doubt.title || !doubt.doubt_description || !doubt.department) {
        return res.status(400).json({ success: false, message: "kindly fill all the required fields" });
    }

    const combinedText = `${doubt.title} ${doubt.doubt_description}`;
    const tags = generateTagsFromText(combinedText);

    try {
        const newDoubt = new Doubt({
            user_id: doubt.user_id,
            title: doubt.title,
            doubt_description: doubt.doubt_description,
            tags: tags,
            department: doubt.department,
        });
        await newDoubt.save();
        return res.status(201).json({ success: true, message: "Doubt saved!" });
        //here not giving doubt already asked thing because maybe different people ask the same doubt
    } catch (error) {
        console.error('Doubt creation error: ', error.message);
        return res.status(500).json({ success: false, message: "Some error occured" });
    }
})

export const getAllDoubts = asyncHandler(async (req, res) => {
    try {
        const doubts = await Doubt.find({});
        return res.status(200).json({ success: true, message: doubts });
    } catch (error) {
        console.error('Doubt Error : ', error.message);
        return res.status(500).json({ success: false, message: "Some error occured" });
    }
})

export const getAllDoubtsByCategory = asyncHandler(async(req, res) => {
    try {
        const doubts = await Doubt.find({});

        const webTags = ["react", "javascript", "css", "html"];
        const androidTags = ["java", "kotlin", "flutter"];
        const cloudTags = ["cloud"];
        const mlTags = ["ml", "dl"];

        const webDoubts = [];
        const androidDoubts = [];
        const cloudDoubts = [];
        const mlDoubts = [];

        doubts.forEach(doubt => {
            if (doubt.tags.some(tag => webTags.includes(tag))) {
                webDoubts.push(doubt);
            }
            if (doubt.tags.some(tag => androidTags.includes(tag))) {
                androidDoubts.push(doubt);
            }
            if(doubt.tags.some(tag => cloudTags.includes(tag))){
                cloudDoubts.push(doubt);
            }
            if (doubt.tags.some(tag => mlTags.includes(tag))) {
                mlDoubts.push(doubt);
            }
        });

        return res.status(200).json({
            success: true,
            categories: {
                web: webDoubts,
                android: androidDoubts,
                cloud: cloudDoubts,
                ml: mlDoubts,
            }
        });
    } catch (error) {
        console.error('Category Doubt Error:', error.message);
        return res.status(500).json({ success: false, message: "Some error occurred" });
    }
})

export const getUserInfo = asyncHandler(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { userId } = req.body;
    console.log(userId);

    try {
        const user = await clerk.clerkClient.users.getUser(userId.trim());
        res.status(200).json({
            username: user.username || user.firstName || user.emailAddresses[0]?.emailAddress,
        });
    } catch (error) {
        res.status(500).json({ error: "User not found" });
    }
})

export const updateDoubt = asyncHandler(async (req, res) => {
    const updatedValues = req.body;
    const { id } = req.params;

    const combinedText = `${updatedValues.title} ${updatedValues.doubt_description}`;
    const tags = generateTagsFromText(combinedText);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid doubt id" });
    }

    const updatePayload = {
        title: updatedValues.title,
        doubt_description: updatedValues.doubt_description,
        department: updatedValues.department,
        tags: tags,
    };

    try {
        const updatedDoubt = await Doubt.findByIdAndUpdate(id, updatePayload, { new: true });
        res.status(200).json({ success: true, message: updatedDoubt });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
})

export const deleteDoubt = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid doubt id" });
    }

    try {
        await Doubt.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Doubt deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
})

//Now CRUD operations on the replies send on any of the doubts

export const createReply = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { author, message } = req.body;
    //i also need to think , how will i provide author and message in request body, message from form at frontend, and author , by getting sessionId for current user and then use it to get clerk id and from there get the fullName

    if (!author || !message) {
        return res.status(401).json({ success: false, message: "Missing author or message" });
    }

    try {
        const doubt = await Doubt.findById(id);
        if (!doubt) {
            return res.status(404).json({ message: 'Doubt not found' });
        }

        doubt.replies.push({ author, message })
        await doubt.save();
        res.status(200).json({ success: true, message: "reply send" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
})

export const getAllReplies = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid doubt id" });
    }

    try {
        const doubt = await Doubt.findById(id);
        const replies = doubt.replies;
        res.status(200).json({ success: true, message: "All replies availables", data: replies });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
})

export const updateReply = asyncHandler(async (req, res) => {
    const { id, rid } = req.params;
    const { message } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(rid)) {
        return res.status(400).json({ success: false, message: "Invalid doubt or reply id" })
    }

    try {
        const doubt = await Doubt.findById(id);
        const reply = doubt.replies.id(rid);
        reply.message = message || reply.message;  //update only if the new message is provided
        await doubt.save();

        res.status(200).json({ success: true, message: "Reply updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
})

export const deleteReply = asyncHandler(async (req, res) => {
    const { id, rid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(rid)) {
        return res.status(400).json({ success: false, message: "Invalid doubt or reply id" });
    }

    try {
        const doubt = await Doubt.findById(id);
        const reply = doubt.replies.id(rid);
        const originalLength = doubt.replies.length;

        // Remove the reply by filtering it out
        doubt.replies = doubt.replies.filter(reply => reply._id.toString() !== rid);

        if (doubt.replies.length === originalLength) {
            return res.status(404).json({ success: false, message: "Reply not found" });
        }
        await doubt.save();

        res.status(200).json({ success: true, message: "Reply deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
})

export const doubtLikes = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid doubt ID" });
    }

    try {
        const updatedDoubt = await Doubt.findByIdAndUpdate(id,
            { $inc: { likes: 1 } },
            { new: true }
        );

        if (!updatedDoubt) {
            return res.status(404).json({ success: false, message: "Doubt not found" });
        }
        res.status(200).json({ success: true, message: updatedDoubt });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
})

export const replyLikes = asyncHandler(async (req, res) => {
    const { id, rid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(rid)) {
        return res.status(400).json({ success: false, message: "Invalid doubt or reply ID" });
    }

    try {
        const doubt = await Doubt.findById(id);
        if (!doubt) {
            return res.status(404).json({ success: false, message: "Doubt not found" });
        }
        const reply = doubt.replies.id(rid);
        if (!reply) {
            return res.status(404).json({ success: false, message: "Reply not found" });
        }
        reply.likes = (reply.likes || 0) + 1;
        await doubt.save();

        return res.status(200).json({ success: true, message: "Reply liked", data: reply });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
})