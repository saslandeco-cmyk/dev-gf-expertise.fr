import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePage } from "./actions";

export default async function AdminCustomPagesList() {
  let pages: Awaited<ReturnType<typeof prisma.page.findMany>> = [];
  let dbError = false;
  try {
    pages = await prisma.page.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    dbError = true;
  }

  return (
    <div>
      <h1>Nouvelles pages</h1>
      <p style={{ color: "#555" }}>
        Pages publiées à une adresse qui n&apos;existe pas déjà sur le site (ex : /notre-equipe/).
      </p>
      <p>
        <Link href="/admin/custom-pages/new/">+ Nouvelle page</Link>
      </p>
      {dbError ? (
        <p style={{ color: "#c0392b" }}>Base de données injoignable.</p>
      ) : (
        <table style={{ borderCollapse: "collapse", width: "100%", background: "#fff" }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}>Titre</th>
              <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}>URL</th>
              <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}>Statut</th>
              <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}></th>
            </tr>
          </thead>
          <tbody>
            {pages.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: 8, color: "#777" }}>
                  Aucune page pour le moment.
                </td>
              </tr>
            ) : null}
            {pages.map((page) => (
              <tr key={page.id}>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{page.title}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>/{page.slug}/</td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                  {page.published ? "Publiée" : "Brouillon"}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee", display: "flex", gap: 12 }}>
                  <Link href={`/admin/custom-pages/${page.id}/`}>Éditer</Link>
                  <form
                    action={async () => {
                      "use server";
                      await deletePage(page.id);
                    }}
                  >
                    <button type="submit" style={{ color: "#c0392b", background: "none", border: "none", cursor: "pointer" }}>
                      Supprimer
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
