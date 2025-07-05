import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        "Food",
        "Rent",
        "Utilities",
        "Entertainment",
        "Travel",
        "Shopping",
        "Other",
      ],
      required: true,
    },
    month: { type: String, required: true }, // Format: 'Jul 2025'
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
