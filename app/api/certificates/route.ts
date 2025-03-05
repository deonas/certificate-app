// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// // ✅ Handle POST request to add a new certificate
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     if (!body || typeof body !== "object") {
//       return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
//     }

//     const { name, issuer, date, certificateUrl, joiningLetterUrl, recommendationLetterUrl } = body;

//     if (!name || !issuer || !date || !certificateUrl) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     const newCertificate = await prisma.certificate.create({
//       data: { name, issuer, date, certificateUrl, joiningLetterUrl, recommendationLetterUrl },
//     });

//     return NextResponse.json(newCertificate, { status: 201 });
//   } catch (error) {
//     console.error("❌ Error adding certificate:", error);
//     return NextResponse.json({ error: "Database error" }, { status: 500 });
//   }
// }

// // ✅ Handle GET request to retrieve all certificates
// export async function GET() {
//   try {
//     const certificates = await prisma.certificate.findMany();
//     return NextResponse.json(certificates, { status: 200 });
//   } catch (error) {
//     console.error("❌ Error fetching certificates:", error);
//     return NextResponse.json({ error: "Error fetching certificates" }, { status: 500 });
//   }
// }

// // ✅ Handle OPTIONS request (CORS support)
// export async function OPTIONS() {
//   return new NextResponse(null, {
//     status: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//     },
//   });
// }

// app/api/certificates/route.ts
// app/api/certificates/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ GET: Fetch all certificates
export async function GET() {
  try {
    console.log("Fetching certificates from Supabase...");
    
    const { data, error } = await supabase.from("certificates").select("*");

    if (error) throw error;

    console.log("Certificates fetched successfully:", data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching certificates:", error);
    return NextResponse.json({ error: "Error fetching certificates" }, { status: 500 });
  }
}

// ✅ POST: Add a new certificate
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received request body:", body);

    const { name, issuer, date, certificateUrl, joiningLetterUrl, recommendationLetterUrl } = body;

    if (!name || !issuer || !date || !certificateUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("Adding new certificate...");
    const { data, error } = await supabase.from("certificates").insert([
      { name, issuer, date, certificateUrl, joiningLetterUrl, recommendationLetterUrl }
    ]);

    if (error) throw error;

    console.log("New certificate added:", data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("❌ Error adding certificate:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
