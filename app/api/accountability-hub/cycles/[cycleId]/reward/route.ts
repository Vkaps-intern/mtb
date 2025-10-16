import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activity-logger";

const REWARD_AMOUNT = 100; // e.g., 100 JoyPearls per member

export async function POST(
  req: Request,
  { params }: { params: { cycleId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !session.user.name) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cycleId } = params;
    const { memberIds } = await req.json(); // Expecting an array of userIds

    if (!memberIds || !Array.isArray(memberIds) || memberIds.length === 0) {
      return NextResponse.json(
        { error: "Member IDs are required" },
        { status: 400 }
      );
    }

    const cycle = await prisma.cycle.findUnique({
      where: { id: cycleId },
      include: { group: true },
    });

    if (!cycle) {
      return NextResponse.json({ error: "Cycle not found" }, { status: 404 });
    }

    // ✅ Verify the current user is the coach (admin)
    if (cycle.group.coachId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden: Not an admin" }, { status: 403 });
    }

    // ✅ Fetch members of this group whose userIds match the incoming memberIds
    const membersToReward = await prisma.groupMember.findMany({
      where: {
        userId: { in: memberIds },
        groupId: cycle.groupId,
      },
      include: {
        user: { select: { name: true } },
      },
    });

    if (membersToReward.length === 0) {
      return NextResponse.json(
        { error: "No valid members found for this group." },
        { status: 404 }
      );
    }

    const totalCost = membersToReward.length * REWARD_AMOUNT;

    await prisma.$transaction(async (tx) => {
      // ✅ Get admin profile
      const admin = await tx.user.findUnique({
        where: { id: session.user.id },
      });

      if (!admin || admin.jpBalance < totalCost) {
        throw new Error("Insufficient JoyPearl balance.");
      }

      // ✅ Deduct admin balance
      await tx.user.update({
        where: { id: session.user.id },
        data: {
          jpBalance: { decrement: totalCost },
          jpSpent: { increment: totalCost },
        },
      });

      // ✅ Credit members and log rewards
      for (const member of membersToReward) {
        await tx.user.update({
          where: { id: member.userId },
          data: {
            jpBalance: { increment: REWARD_AMOUNT },
            jpEarned: { increment: REWARD_AMOUNT },
          },
        });

        await tx.reward.create({
          data: {
            adminId: session.user.id,
            memberId: member.userId,
            cycleId: cycleId,
            jpAmount: REWARD_AMOUNT, // ✅ changed from "amount" → "jpAmount"
          },
        });
      }
    });

    // ✅ Log activity
    const memberNames = membersToReward.map((m) => m.user?.name || "Unknown").join(", ");
    await logActivity(
      cycle.groupId,
      "status_updated",
      `${session.user.name} rewarded ${memberNames} with ${REWARD_AMOUNT} JoyPearls each.`
    );

    return NextResponse.json({
      success: true,
      message: `${membersToReward.length} members have been rewarded.`,
    });
  } catch (error) {
    console.error("[REWARD_CYCLE_ERROR]", error);
    return NextResponse.json(
      { error: (error as Error).message || "Something went wrong" },
      { status: 500 }
    );
  }
}
