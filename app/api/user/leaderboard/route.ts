import { authConfig } from "@/app/api/auth/[...nextauth]/auth.config";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// TODO: add pagination
export async function GET() {
  try {
    // const session = await getServerSession(authConfig);
    // console.log(session);
    // if (!session)
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const users = await prisma.user.findMany({
      //    orderBy: {
      //      score: "desc",
      //    },
      include: {
        transaction: true,
      },
      take: 10,
    });

    return NextResponse.json({ users, message: "sucess" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
