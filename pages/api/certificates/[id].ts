import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    console.log(`Fetching certificate with ID: ${id} from Supabase...`);
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    console.log("Certificate fetched successfully:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error fetching certificate:", error);
    res.status(500).json({ error: "Error fetching certificate" });
  }
}