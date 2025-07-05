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

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
    category: "Other",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation
    const { amount, description, date, category } = form;
    if (!amount || !description || !date || !category) {
      setError("All fields are required.");
      return;
    }

    setError(""); // clear previous error
    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      onAdd(data);
      setForm({ amount: "", description: "", date: "", category: "Other" });
    } else {
      setError(data.error || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />
      <Input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <Input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <Button type="submit">Add Transaction</Button>
    </form>
  );
}
