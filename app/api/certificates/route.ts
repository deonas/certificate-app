import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Handle POST request to add a new certificate
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { name, issuer, date, certificateUrl, joiningLetterUrl, recommendationLetterUrl } = body;

    if (!name || !issuer || !date || !certificateUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newCertificate = await prisma.certificate.create({
      data: { name, issuer, date, certificateUrl, joiningLetterUrl, recommendationLetterUrl },
    });

    return NextResponse.json(newCertificate, { status: 201 });
  } catch (error) {
    console.error("❌ Error adding certificate:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// ✅ Handle GET request to retrieve all certificates
export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany();
    return NextResponse.json(certificates, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching certificates:", error);
    return NextResponse.json({ error: "Error fetching certificates" }, { status: 500 });
  }
}

// ✅ Handle OPTIONS request (CORS support)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
