import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { Authority } = await req.json();
    const { Status } = await req.json();

    return NextResponse.redirect(
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/checkout-result?Authority=${Authority}&Status=${Status}`
        : `https://ezlegin.com/checkout-result?Authority=${Authority}&Status=${Status}`
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
