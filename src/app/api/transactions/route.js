import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return Response.json(transactions);
}

export async function POST(req) {
  await connectDB();
  const { amount, description, date, category } = await req.json();

  if (!amount || !description || !date || !category) {
    return new Response(JSON.stringify({ error: "All fields are required." }), {
      status: 400,
    });
  }

  const transaction = await Transaction.create({
    amount,
    description,
    date,
    category,
  });
  return Response.json(transaction);
}

export async function PUT(req) {
  await connectDB();
  const body = await req.json();
  const { id, ...rest } = body;

  const updated = await Transaction.findByIdAndUpdate(id, rest, { new: true });
  return Response.json(updated);
}

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const deleted = await Transaction.findByIdAndDelete(id);
  return Response.json(deleted);
}
