"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BudgetVsActualChart({ transactions, budgets }) {
  const dataMap = {};

  // Aggregate actual spend per category per month
  transactions.forEach((tx) => {
    const month = new Date(tx.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const key = `${tx.category}-${month}`;
    if (!dataMap[key])
      dataMap[key] = { category: tx.category, month, actual: 0, budget: 0 };
    dataMap[key].actual += tx.amount;
  });

  // Add budget data
  budgets.forEach((b) => {
    const key = `${b.category}-${b.month}`;
    if (!dataMap[key])
      dataMap[key] = {
        category: b.category,
        month: b.month,
        actual: 0,
        budget: 0,
      };
    dataMap[key].budget = b.amount;
  });

  const data = Object.values(dataMap);

  return (
    <div className="w-full h-[300px] mt-8 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#a8dadc" name="Budget" />
          <Bar dataKey="actual" fill="#e76f51" name="Actual Spend" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
