import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Day = new Schema(
    {
        date: { type: String, required: true },
        creatorEmail: { type: String, required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

Day.virtual("creator", {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
});

export default Day;
