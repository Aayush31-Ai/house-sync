import mongoose, { Document, Schema } from "mongoose";

interface expenses extends Document {
  houseId: Schema.Types.ObjectId;
  paidBy: Schema.Types.ObjectId;
  shareWith: Schema.Types.ObjectId[];
  amount: number;
  proofUrl?: string;
  note?: string;
  createdAt: Date;
  month: Date;
  isDeleted: boolean;
}

const expensesSchema = new Schema<expenses>({
  houseId: {
    type: Schema.Types.ObjectId,
    ref: "house",
    required: true,
  },
  paidBy: {
    type: Schema.Types.ObjectId,
    ref: "member",
    required: true,
  },
  shareWith: [
    {
      type: Schema.Types.ObjectId,
      ref: "member",
      required: true,
    },
  ],
  proofUrl: String,
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  note: String,
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  month: {
    type: Date,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.expenses || mongoose.model("expenses", expensesSchema);
