import Link from "next/link";
import { prisma } from "@/lib/prisma";
import routes from "@/lib/generated/site-routes.json";

export default async function AdminDashboard() {
  let overrideCount = 0;
  let postCount = 0;
  let customPageCount = 0;
  let dbError = false;

  try {
    [overrideCount, postCount, customPageCount] = await Promise.all([
      prisma.pageOverride.count(),
      prisma.post.count(),
      prisma.page.count(),
    ]);
  } catch {
    dbError = true;
  }

  return (
    <div>
      <h1>Tableau de bord</h1>
      {dbError ? (
        <p style={{ color: "#c0392b" }}>
          Base de données injoignable. Le site public continue de fonctionner normalement
          (affichage du contenu statique), mais les modifications admin sont indisponibles pour
          le moment.
        </p>
      ) : (
        <ul>
          <li>{routes.length} pages existantes au total</li>
          <li>{overrideCount} page(s) personnalisée(s)</li>
          <li>{customPageCount} nouvelle(s) page(s) créée(s)</li>
          <li>{postCount} article(s) de blog</li>
        </ul>
      )}
      <p>
        <Link href="/admin/pages/">Gérer les pages du site →</Link>
      </p>
      <p>
        <Link href="/admin/custom-pages/">Gérer les nouvelles pages →</Link>
      </p>
      <p>
        <Link href="/admin/posts/">Gérer les articles →</Link>
      </p>
    </div>
  );
}
