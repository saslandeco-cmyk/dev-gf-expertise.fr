import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * Defense-in-depth session check for admin pages, Server Actions, and Route
 * Handlers under /admin and /api/admin. proxy.ts is only an optimistic
 * redirect for page navigations - every privileged read/write re-checks here.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login/");
  }
  return session;
}
