"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "Food",
  "Rent",
  "Utilities",
  "Entertainment",
  "Travel",
  "Shopping",
  "Other",
];

export default function BudgetForm({ onAdd }) {
  const [form, setForm] = useState({
    category: "Food",
    month: "",
    amount: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { category, month, amount } = form;

    //  Frontend validation
    if (!category || !month || !amount) {
      setError("All fields are required.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Amount must be a positive number.");
      return;
    }

    setError("");

    const res = await fetch("/api/budgets", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        amount: parsedAmount,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      onAdd(data);
      setForm({ category: "Food", month: "", amount: "" });
    } else {
      setError(data.error || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border h-10 px-3 rounded-md"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <Input
        name="month"
        placeholder="e.g. Jul 2025"
        value={form.month}
        onChange={handleChange}
      />

      <Input
        name="amount"
        type="number"
        placeholder="Budget Amount"
        value={form.amount}
        onChange={handleChange}
      />

      <Button type="submit">Set Budget</Button>
    </form>
  );
}
