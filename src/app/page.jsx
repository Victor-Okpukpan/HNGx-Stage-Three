import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import CredentialsForm from "@/components/CredentialsForm";
import { redirect } from "next/navigation";
/**
 * Sign-in page component.
 * This page displays a sign-in form and redirects authenticated users to the gallery.
 *
 * @returns {JSX.Element} The sign-in page component.
 */
export default async function SignInPage() {
  const data = await getServerSession(authOptions);
  // Redirect authenticated users to the gallery page.
  if (data) return redirect("/gallery");

  return (
    <main className="flex justify-center items-center min-h-screen">
      <CredentialsForm />
    </main>
  );
}
