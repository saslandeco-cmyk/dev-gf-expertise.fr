import Link from "next/link";
import { requireAdmin } from "@/lib/auth-guard";
import { signOutAction } from "@/app/admin/actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f4f4f5", minHeight: "100vh" }}>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "16px 24px",
          background: "#18181b",
          color: "#fff",
        }}
      >
        <strong>GF Expertise — Admin</strong>
        <Link href="/admin/" style={{ color: "#fff" }}>
          Tableau de bord
        </Link>
        <Link href="/admin/pages/" style={{ color: "#fff" }}>
          Pages du site
        </Link>
        <Link href="/admin/custom-pages/" style={{ color: "#fff" }}>
          Nouvelles pages
        </Link>
        <Link href="/admin/posts/" style={{ color: "#fff" }}>
          Articles
        </Link>
        <form action={signOutAction} style={{ marginLeft: "auto" }}>
          <button type="submit" style={{ color: "#fff", background: "none", border: "none", cursor: "pointer" }}>
            Déconnexion
          </button>
        </form>
      </nav>
      <main style={{ padding: 24 }}>{children}</main>
    </div>
  );
}
