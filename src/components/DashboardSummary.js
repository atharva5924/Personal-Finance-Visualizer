"use client";

export default function DashboardSummary({ transactions }) {
  if (!transactions.length) return null;

  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const recent = transactions[0];
  const categoryTotals = {};
  transactions.forEach((tx) => {
    categoryTotals[tx.category] =
      (categoryTotals[tx.category] || 0) + tx.amount;
  });

  const topCategory = Object.entries(categoryTotals).reduce((a, b) =>
    b[1] > a[1] ? b : a
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-500 text-sm">Total Expenses</p>
        <h3 className="text-xl font-bold">₹{total}</h3>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-500 text-sm">Most Recent</p>
        <h3 className="text-base font-semibold">{recent.description}</h3>
        <p className="text-sm text-gray-600">
          ₹{recent.amount} — {recent.category}
        </p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-500 text-sm">Top Category</p>
        <h3 className="text-base font-semibold">{topCategory[0]}</h3>
        <p className="text-sm text-gray-600">₹{topCategory[1]}</p>
      </div>
    </div>
  );
}
