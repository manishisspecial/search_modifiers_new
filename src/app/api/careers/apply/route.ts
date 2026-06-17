import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  roleTitle: z.string().min(1, "Role is required"),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = ApplicationSchema.parse(body);

    const application = await prisma.careerApplication.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        roleTitle: data.roleTitle,
        coverLetter: data.coverLetter || null,
        resumeUrl: data.resumeUrl || null,
      },
    });

    return NextResponse.json(
      { message: "Application submitted successfully", id: application.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("[careers/apply]", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
