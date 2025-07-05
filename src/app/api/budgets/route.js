import { connectDB } from "@/lib/mongodb";
import Budget from "@/models/Budget";

export async function POST(req) {
  await connectDB();
  const { category, month, amount } = await req.json();

  if (!category || !month || !amount) {
    return new Response(JSON.stringify({ error: "All fields required" }), {
      status: 400,
    });
  }

  const budget = await Budget.create({ category, month, amount });
  return Response.json(budget);
}

export async function GET() {
  await connectDB();
  const budgets = await Budget.find();
  return Response.json(budgets);
}
