"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const handleClick = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome to your dashboard!</p>
      <button
        type="button"
        onClick={handleClick}
        className="border cursor-pointer p-2"
      >
        Log out
      </button>
    </div>
  );
}
