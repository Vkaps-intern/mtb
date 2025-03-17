"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

const BlogHero = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(9);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      // Adjust your API endpoint to support pagination
      const response = await axios.get(
        `/api/blogs?page=${currentPage}&limit=${postsPerPage}`
      );
      setBlogPosts(response.data.blogs);

      // Calculate total pages based on total count from API
      // If your API doesn't provide total count, you'll need to adjust this
      const totalCount = response.data.totalCount || response.data.blogs.length;
      setTotalPages(Math.ceil(totalCount / postsPerPage));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Custom skeleton component
  const Skeleton = ({ className }: { className: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(postsPerPage)
      .fill(0)
      .map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="relative h-48">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="p-6">
            <Skeleton className="h-7 w-3/4 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? renderSkeletons()
          : blogPosts.map((post: BlogPost) => (
              <BlogCard key={post.id} {...post} />
            ))}
      </div>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <nav
            className="inline-flex items-center -space-x-px"
            aria-label="Blog pagination"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-2 border border-gray-300 text-sm font-medium ${
                    pageNumber === currentPage
                      ? "bg-blue-50 text-blue-600"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {/* Add this style for the loading animation */}
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default BlogHero;
