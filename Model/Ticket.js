import mongoose from "mongoose";

const Ticket = mongoose.Schema(
  {
    timeOne: Number,
    timeTwo:Number
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Ticket || mongoose.model("Ticket", Ticket);