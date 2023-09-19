/* eslint-disable react-hooks/rules-of-hooks */
import { users } from "@/app/helpers/constants";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
/**
 * Constants for authentication options.
 */
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Username",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const user = users.find((item) => item.email === credentials.email);
        if (user?.password === credentials.password) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
/**
 * NextAuth handler for authentication.
 */
const handler = NextAuth(authOptions);
/**
 * Checks if a login session is required on the server.
 * If not logged in, redirects to the home page ("/").
 */
export async function loginIsRequiredServer() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
}
/**
 * Checks if a login session is required on the client.
 * If not logged in, redirects to the home page ("/").
 */
export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/");
  }
}
// Export the handler for both GET and POST methods.
export { handler as GET, handler as POST };
