// app/api/users/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    // ✅ Type check for Blob/File
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No valid file received." }, { status: 400 });
    }

    // ✅ Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64String = buffer.toString("base64");

    // ✅ Send data to your REST API
    const response = await fetch("http://localhost:3402/avatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // email:"bilal",
        email:"bilal@g.com",
        fileSize: file.size,
        fileType: file.type,
        fileName: file.name,
        lastModified: file.lastModified,
        buffer: base64String,
      }),
    });

    const data = await response.json();

    // if (!response.ok) {
    //   console.error("❌ API Error:", data);
    //   return NextResponse.json({ error: "Failed to upload to avatar service." }, { status: 500 });
    // }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("❌ Error processing upload:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
