"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin/",
    });
    return {};
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "Identifiants incorrects." };
    }
    throw err;
  }
}
