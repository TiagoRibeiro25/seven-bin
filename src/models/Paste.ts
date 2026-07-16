import mongoose from "@/lib/mongoose";

const Schema = mongoose.Schema;

const PasteSchema = new Schema({
    title: { type: String, default: "Untitled Paste" },
    content: { type: String, required: true },
    language: { type: String, default: "auto" },
    createdAt: { type: Date, default: Date.now },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        index: { expires: 0 },
    },
});

const Paste =
    mongoose.models.Paste || mongoose.model("Paste", PasteSchema);
export default Paste;
