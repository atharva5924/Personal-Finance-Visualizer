"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#a4de6c",
  "#d0ed57",
  "#8dd1e1",
];

export default function CategoryPieChart({ transactions }) {
  
  const data = transactions.reduce((acc, tx) => {
    const existing = acc.find((item) => item.name === tx.category);
    if (existing) {
      existing.value += tx.amount;
    } else {
      acc.push({ name: tx.category, value: tx.amount });
    }
    return acc;
  }, []);

  return (
    <div className="w-full mt-6 p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Category-wise Spending
      </h2>

  
      <div className="w-full overflow-x-auto">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name }) => name}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                paddingTop: 20,
                fontSize: 12,
                flexWrap: "wrap",
                display: "flex",
                justifyContent: "center",
                maxWidth: "100%",
                whiteSpace: "normal",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
