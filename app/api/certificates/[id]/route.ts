import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
  request: Request,
  { params }: { params: { id: string } } // Correctly type the params
) {
  const { id } = params;

  try {
    console.log(`Fetching certificate with ID: ${id} from Supabase...`);

    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    console.log("Certificate fetched successfully:", data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching certificate:", error);
    return NextResponse.json(
      { error: "Error fetching certificate" },
      { status: 500 }
    );
  }
}