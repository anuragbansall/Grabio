import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    paymentMethod: { type: String, required: true },
    status: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);
