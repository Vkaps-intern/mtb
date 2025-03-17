import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract pagination parameters from URL
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");

    // Validate pagination parameters
    const validPage = page > 0 ? page : 1;
    const validLimit = limit > 0 && limit <= 100 ? limit : 9;

    // Calculate skip for pagination
    const skip = (validPage - 1) * validLimit;

    // Get total count for pagination
    const totalCount = await prisma.blog.count();

    // Get paginated blogs with proper ordering
    const blogs = await prisma.blog.findMany({
      skip,
      take: validLimit,
      orderBy: {
        createdAt: "desc", // Assuming you have a createdAt field
      },
      // Select only needed fields for better performance
      select: {
        id: true,
        title: true,
        excerpt: true,
        image: true,
        content: true,
        readTime: true,
      },
    });

    return NextResponse.json({
      message: "Blogs retrieved successfully",
      blogs,
      totalCount,
      page: validPage,
      limit: validLimit,
      totalPages: Math.ceil(totalCount / validLimit),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Blog API Error:", errorMessage);

    // Return appropriate status code based on error
    return NextResponse.json(
      { error: "Failed to fetch blogs", message: errorMessage },
      { status: 500 }
    );
  }
}
