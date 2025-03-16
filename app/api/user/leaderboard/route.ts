const revalidate = 10 * 60; // 10 minutes

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// TODO: add pagination
/**
 * * considerations
 * - cache
 * - rate limit 
 * 
 */
export async function GET() {
  try {
    //! commented this just authorization code for testing
    // const session = await getServerSession(authConfig);
    // console.log(session);
    // if (!session)
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const users = await prisma.user.findMany({
      orderBy: {
        jpEarned: "desc",
      },
      include: {
        // transaction: true,
        _count: true,
      },
      omit: {
        password: true,
      },
      take: 10,
    });
    console.log(users); //?dev
    if (!users) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }
    const updatedUsers = users.map((user) => {
      return {
        ...user,
        jpTransaction: user.jpEarned + user.jpSpent,
        jpBalance: user.jpEarned - user.jpSpent,
      };
    });

    return NextResponse.json(
      { users: updatedUsers, message: "success" }, // Fixed typo from "sucess"
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
