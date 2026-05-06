import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const nextCursor = searchParams.get("next_cursor") || undefined;

    const searchOptions: Record<string, unknown> = {
      resource_type: "image",
      type: "upload",
      prefix: "search-modifiers-admin",
      max_results: 30,
      sort_by: [{ created_at: "desc" }],
    };
    if (nextCursor) searchOptions.next_cursor = nextCursor;
    if (query) {
      searchOptions.expression = `folder:search-modifiers-admin AND filename:*${query}*`;
    }

    // Use search API for richer results
    const result = await cloudinary.search
      .expression(
        query
          ? `folder:search-modifiers-admin AND filename:*${query}*`
          : "folder:search-modifiers-admin"
      )
      .sort_by("created_at", "desc")
      .max_results(30)
      .next_cursor(nextCursor ?? "")
      .with_field("context")
      .execute();

    return NextResponse.json({
      resources: result.resources,
      next_cursor: result.next_cursor ?? null,
      total_count: result.total_count,
    });
  } catch (error) {
    console.error("Cloudinary list error:", error);
    return NextResponse.json({ error: "Failed to list media" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "search-modifiers-admin",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
