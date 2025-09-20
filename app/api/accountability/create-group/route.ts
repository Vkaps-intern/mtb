import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      visibility,
      cycleDuration,
      progressStage,
      notesPrivacy,
      coachId,
    } = body;

    if (!name || !coachId) {
      return NextResponse.json(
        { error: "Name and coachId are required" },
        { status: 400 }
      );
    }

    const group = await prisma.group.create({
      data: {
        name,
        description,
        visibility,
        cycleDuration,
        progressStage,
        notesPrivacy,
        coachId,
      },
    });

    return NextResponse.json(group, { status: 201 });
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { error: "Failed to create group" },
      { status: 500 }
    );
  }
}
