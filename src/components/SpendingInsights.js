"use client";

export default function SpendingInsights({ transactions, budgets }) {
  if (!transactions.length || !budgets.length) return null;

  const overBudget = [];

  budgets.forEach((b) => {
    const totalSpent = transactions
      .filter(
        (tx) =>
          tx.category === b.category &&
          new Date(tx.date).toLocaleString("default", {
            month: "short",
            year: "numeric",
          }) === b.month
      )
      .reduce((sum, tx) => sum + tx.amount, 0);

    if (totalSpent > b.amount) {
      overBudget.push({
        category: b.category,
        spent: totalSpent,
        budget: b.amount,
      });
    }
  });

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Spending Insights</h2>
      {overBudget.length === 0 ? (
        <p className="text-sm text-green-600">
          You are within budget in all categories. ✅
        </p>
      ) : (
        <ul className="text-sm text-red-600 list-disc ml-5">
          {overBudget.map((item, idx) => (
            <li key={idx}>
              Overspent in <strong>{item.category}</strong>: ₹{item.spent}{" "}
              (Budget: ₹{item.budget})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
    