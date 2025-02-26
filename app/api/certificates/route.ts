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

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Handle GET request to retrieve all certificates
export async function GET() {
  try {
    console.log("Fetching certificates from the database...");

    const certificates = await prisma.certificate.findMany({
      select: {
        id: true,
        name: true,
        issuer: true,
        date: true,
        certificateUrl: true,
        joiningLetterUrl: true,
        recommendationLetterUrl: true,
      },
    });

    console.log("Certificates fetched successfully:", certificates);

    return NextResponse.json(certificates, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching certificates:", error);
    return NextResponse.json(
      { error: "Error fetching certificates" },
      { status: 500 }
    );
  }
}

// ✅ Handle POST request to add a new certificate
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received request body:", body);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { name, issuer, date, certificateUrl, joiningLetterUrl, recommendationLetterUrl } = body;

    if (!name || !issuer || !date || !certificateUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Creating new certificate...");
    const newCertificate = await prisma.certificate.create({
      data: { name, issuer, date, certificateUrl, joiningLetterUrl, recommendationLetterUrl },
    });
    console.log("New certificate created:", newCertificate);

    return NextResponse.json(newCertificate, { status: 201 });
  } catch (error) {
    console.error("❌ Error adding certificate:", error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
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