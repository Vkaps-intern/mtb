import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface MemberWithUser {
  id: string;
  userId: string;
  joinedAt: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
  // Optional: goal info
  midwayUpdate?: string;
  endResult?: string;
  notes?: string;
  comments?: string;
}

export async function GET(req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    const { groupId } = params;

    if (!groupId) {
      return NextResponse.json({ error: "groupId is required" }, { status: 400 });
    }

    // Fetch members for the group
    const members = await prisma.groupMember.findMany({
      where: { groupId },
      include: {
        group: false, // we only need member info
      },
    });

    // Fetch user info for all members
    const userIds = members.map((m) => m.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, image: true },
    });

    // Combine data
    const memberData: MemberWithUser[] = members.map((member) => {
      const user = users.find((u) => u.id === member.userId);
      return {
        id: member.id,
        userId: member.userId,
        joinedAt: member.joinedAt.toISOString(),
        user: user
          ? {
              id: user.id,
              name: user.name,
              image: user.image ?? undefined,
            }
          : { id: member.userId, name: "Unknown" },
        // Optional goal info: set undefined if no data yet
        midwayUpdate: undefined,
        endResult: undefined,
        notes: undefined,
        comments: undefined,
      };
    });

    return NextResponse.json(memberData, { status: 200 });
  } catch (error) {
    console.error("Error fetching group members:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
