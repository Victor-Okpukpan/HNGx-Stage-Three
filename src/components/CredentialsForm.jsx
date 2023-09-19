"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SpinnerComponent from "./SpinnerComponent";
/**
 * CredentialsForm is a component for user login using email and password credentials.
 *
 * @returns {JSX.Element} The login form component.
 */
export default function CredentialsForm() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  /**
   * Handles the form submission when the user attempts to log in.
   *
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/gallery");
    } else {
      console.log("Error:", signInResponse);
      setError("Your Email or Password is incorrect");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl  text-black font-medium flex flex-col"
    >
      <h1 className="mb-10 text-3xl font-bold">Welcome Back</h1>
      {error && (
        <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded">
          {error}
        </span>
      )}

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        required
        className="w-full px-4 py-4 mb-4  border border-gray-300 rounded-md"
      />
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        required
        className="w-full px-4 py-4 mb-4  border border-gray-300 rounded-md"
      />

      <button
        type="submit"
        className="w-full flex items-center justify-center h-12 px-6 mt-4  text-white text-lg transition bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
      >
        {loading ? <SpinnerComponent /> : "Log In"}
      </button>
    </form>
  );
}
