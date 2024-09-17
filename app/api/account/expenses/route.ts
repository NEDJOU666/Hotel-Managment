import { Expense } from "@/app/component/interface/expensesDetails";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await client
    .fetch(
      `*[_type=="expense"]{
        _id,
        id,
        category,
        amount,
        date,
      }`
    )
    .catch((err) => {
      return err;
    });

  if (res.isNetworkError) {
    return NextResponse.json(
      { message: "Connection problem, try later" },
      { status: 400 }
    );
  }

  return NextResponse.json({ data: res }, { status: 200 });
}

export async function POST(request: Request) {
  const newExpense: Expense = await request.json();
  console.log(newExpense);

  const res = await client
    .create({
      _type: "expense",
      id: newExpense.id,
      category: newExpense.category,
      amount: newExpense.amount,
      date: newExpense.date,
    })
    .catch((err) => {
      return err;
    });

  if (res.isNetworkError) {
    return NextResponse.json(
      { message: "Connection problem, try later" },
      { status: 400 }
    );
  }

  console.log(res);
  return NextResponse.json({ data: res }, { status: 201 });
}

export async function DELETE(request: Request) {
  const _id = await request.json();

  const res = await client.delete(_id).catch((err) => {
    return err;
  });

  if (res.isNetworkError) {
    return NextResponse.json(
      { message: "Connection problem, try later" },
      { status: 400 }
    );
  }

  return NextResponse.json({ data: res }, { status: 200 });
}
