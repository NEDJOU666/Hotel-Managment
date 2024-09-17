import { Contributor } from "@/app/component/interface/contributorDetail";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

// GET: Fetch all contributors
export async function GET() {
  const res = await client
    .fetch(`*[_type == "contributor"]{
      _id,
      id,
      name,
      amount,
      date,
    }`)
    .catch(err => err);

  if (res.isNetworkError) {
    console.log("from",res)
    return NextResponse.json(
      { message: "Connection problem, try later" },
      { status: 400 }
    );
  }
  console.log("from",res)
  return NextResponse.json({ data: res }, { status: 200 });
}

// POST: Create a new contributor
export async function POST(request: Request) {
  const newContributor: Contributor = await request.json();
  const res = await client
    .create({
      _type: "contributor",
      id: newContributor.id,
      name: newContributor.name,
      amount: newContributor.amount,
      date: newContributor.date,
    })
    .then(data => data)
    .catch(err => err);

  if (res.isNetworkError) {
    return NextResponse.json(
      { message: "Connection problem, try later" },
      { status: 400 }
    );
  }
  return NextResponse.json({ data: res }, { status: 201 });
}

// DELETE: Delete a contributor by ID
export async function DELETE(request: Request) {
  const _id = await request.json();

  const res = await client
    .delete(_id)
    .then(data => data)
    .catch(err => err);

  if (res.isNetworkError) {
    return NextResponse.json(
      { message: "Connection problem, try later" },
      { status: 400 }
    );
  }
  return NextResponse.json({ data: res }, { status: 200 });
}
