"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const router = useRouter();
  /**
   * Handles the logout process.
   * - Calls the signOut function to log the user out.
   * - Redirects the user to the home page ("/").
   */
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-32 bg-red-600 py-2 px-3 text-white flex items-center justify-center rounded hover:brightness-110 transition duration-200 ease-in"
    >
      Log out
    </button>
  );
}
