import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost } from "./actions";

export default async function AdminPostsList() {
  let posts: Awaited<ReturnType<typeof prisma.post.findMany>> = [];
  let dbError = false;
  try {
    posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    dbError = true;
  }

  return (
    <div>
      <h1>Articles de blog</h1>
      <p>
        <Link href="/admin/posts/new/">+ Nouvel article</Link>
      </p>
      {dbError ? (
        <p style={{ color: "#c0392b" }}>Base de données injoignable.</p>
      ) : (
        <table style={{ borderCollapse: "collapse", width: "100%", background: "#fff" }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}>Titre</th>
              <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}>Statut</th>
              <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{post.title}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                  {post.published ? "Publié" : "Brouillon"}
                </td>
                <td style={{ padding: 8, borderBottom: "1px solid #eee", display: "flex", gap: 12 }}>
                  <Link href={`/admin/posts/${post.id}/`}>Éditer</Link>
                  <form
                    action={async () => {
                      "use server";
                      await deletePost(post.id);
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
