import Link from "next/link";
import { prisma } from "@/lib/prisma";
import routes from "@/lib/generated/site-routes.json";

export default async function AdminPagesList() {
  let overriddenSlugs = new Set<string>();
  try {
    const rows = await prisma.pageOverride.findMany({ select: { slug: true } });
    overriddenSlugs = new Set(rows.map((r) => r.slug));
  } catch {
    // DB unreachable - just show the list without override status.
  }

  return (
    <div>
      <h1>Pages ({routes.length})</h1>
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
          {routes.map((route) => (
            <tr key={route.slug}>
              <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{route.title}</td>
              <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{route.pathname}</td>
              <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                {overriddenSlugs.has(route.slug) ? "Personnalisée" : "Originale"}
              </td>
              <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                <Link href={`/admin/pages/${route.slug}/`}>Éditer →</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
