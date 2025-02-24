import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // ✅ Make sure this is correctly initialized

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { certificateId, name, issuer, date, url } = body;

    if (!certificateId || !name || !issuer || !date || !url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Check if prisma.certificate exists before using it
    if (!prisma.certificate) {
      return NextResponse.json({ error: "Prisma model not found" }, { status: 500 });
    }

    const newCertificate = await prisma.certificate.create({
      data: { certificateId, name, issuer, date, url },
    });

    return NextResponse.json(newCertificate, { status: 201 });
  }catch (error: unknown) {
    if (error instanceof Error) {
        console.error("❌ Error adding certificate:", error.message);
        return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
    } else {
        console.error("❌ Unknown error:", error);
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
}
export async function GET() {
    try {
      const certificates = await prisma.certificate.findMany();
      return NextResponse.json(certificates, { status: 200 });
    } catch (error) {
      console.error("Error fetching certificates:", error);
      return NextResponse.json({ error: "Error fetching certificates" }, { status: 500 });
    }
  }
  