import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION || "us-east-1";
const BUCKET = process.env.S3_UPLOAD_BUCKET || "mikalyzed-uploads";

const s3 = new S3Client({
  region,
  credentials: accessKeyId && secretAccessKey
    ? { accessKeyId, secretAccessKey }
    : undefined,
});

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    if (files.length > 10) {
      return NextResponse.json({ error: "Maximum 10 files allowed" }, { status: 400 });
    }

    const urls: string[] = [];

    for (const file of files) {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const key = `uploads/${randomUUID()}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: buffer,
          ContentType: file.type,
          ACL: "public-read",
        })
      );

      urls.push(`https://${BUCKET}.s3.${region}.amazonaws.com/${key}`);
    }

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
