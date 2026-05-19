import mongoose from "mongoose";

const BadgeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 80,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 240,
        },
        image: {
            type: String,
            default: "",
            trim: true,
        },
        category: {
            type: String,
            enum: ["streak", "consistency", "problem-solving", "study", "community", "special"],
            default: "special",
            index: true,
        },
        rarity: {
            type: String,
            enum: ["common", "rare", "epic", "legendary"],
            default: "common",
            index: true,
        },
        xpReward: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Badge", BadgeSchema);
