"use client";

import { useEffect, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import DashboardSummary from "@/components/DashboardSummary";
import SpendingInsights from "@/components/SpendingInsights";
import BudgetForm from "@/components/BudgetForm";
import BudgetVsActualChart from "@/components/BudgetVsActualChart";

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        if (!res.ok) throw new Error("Failed to fetch transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Transaction fetch error:", err);
      }
    };

    const fetchBudgets = async () => {
      try {
        const res = await fetch("/api/budgets");
        if (!res.ok) throw new Error("Failed to fetch budgets");
        const data = await res.json();
        setBudgets(data);
      } catch (err) {
        console.error("Budget fetch error:", err);
      }
    };

    fetchTransactions();
    fetchBudgets();
  }, []);

  const handleAdd = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/transactions?id=${id}`, { method: "DELETE" });
    setTransactions((prev) => prev.filter((tx) => tx._id !== id));
  };

  const handleEdit = async (id, updatedData) => {
    const res = await fetch("/api/transactions", {
      method: "PUT",
      body: JSON.stringify({ id, ...updatedData }),
    });
    const updated = await res.json();
    setTransactions((prev) => prev.map((tx) => (tx._id === id ? updated : tx)));
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Tracker</h1>
      <TransactionForm onAdd={handleAdd} />
      <BudgetForm onAdd={(budget) => setBudgets((prev) => [budget, ...prev])} />
      <DashboardSummary transactions={transactions} />
      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <SpendingInsights transactions={transactions} budgets={budgets} />
      <BudgetVsActualChart transactions={transactions} budgets={budgets} />
      <MonthlyBarChart transactions={transactions} />
      <CategoryPieChart transactions={transactions} />

       <p className="text-center text-sm text-gray-500 mt-4 py-3">
    ⚠️ This app is pre-filled with sample data for demonstration. Feel free to add, edit, or delete transactions and budgets.
  </p>
    </main>
  );
}
