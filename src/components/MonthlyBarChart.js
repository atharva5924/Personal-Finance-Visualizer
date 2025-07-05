"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyBarChart({ transactions }) {
  // Group and sum expenses by month
  const data = transactions.reduce((acc, tx) => {
    const date = new Date(tx.date);
    const month = `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;

    const existing = acc.find((item) => item.month === month);
    if (existing) {
      existing.total += tx.amount;
    } else {
      acc.push({ month, total: tx.amount });
    }

    return acc;
  }, []);

  // Sort by date order
  data.sort((a, b) => new Date(a.month) - new Date(b.month));

  return (
    <div className="w-full h-[300px] mt-8 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
