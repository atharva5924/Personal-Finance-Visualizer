"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = [
  "Food",
  "Rent",
  "Utilities",
  "Entertainment",
  "Travel",
  "Shopping",
  "Other",
];

export default function TransactionList({ transactions, onDelete, onEdit }) {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    amount: "",
    description: "",
    date: "",
    category: "Other",
  });

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const startEdit = (tx) => {
    setEditId(tx._id);
    setEditForm({
      amount: tx.amount,
      description: tx.description,
      date: tx.date?.slice(0, 10) || "",
      category: tx.category || "Other",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onEdit(editId, editForm);
    setEditId(null);
  };

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <div key={tx._id} className="border p-3 rounded shadow">
          {editId === tx._id ? (
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="number"
                name="amount"
                value={editForm.amount}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              />
              <input
                name="description"
                value={editForm.description}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="date"
                name="date"
                value={editForm.date}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              />
              <select
                name="category"
                value={editForm.category}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <p>
                <strong>₹{tx.amount}</strong> — {tx.description}
              </p>
              <p className="text-sm text-gray-500">
                {tx.date ? new Date(tx.date).toLocaleDateString() : ""} |{" "}
                {tx.category}
              </p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" onClick={() => startEdit(tx)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(tx._id)}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
