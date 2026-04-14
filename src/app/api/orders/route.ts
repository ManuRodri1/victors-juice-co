import { NextResponse } from "next/server";
import { createOrder } from "@/lib/airtable";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate basics
    if (!body.customerName || !body.whatsapp || !body.productIds) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const result = await createOrder(body);
    
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Order Submission API Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
