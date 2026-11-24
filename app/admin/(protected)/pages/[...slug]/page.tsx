import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { getEffectiveBodyHtml } from "@/lib/page-content";
import { EDITOR_BRIDGE_SCRIPT } from "./editor-bridge";
import PageEditorClient from "./PageEditorClient";
import routes from "@/lib/generated/site-routes.json";

export default async function PageEditor({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugSegments } = await params;
  const slug = slugSegments.join("/");

  const route = routes.find((r) => r.slug === slug);
  if (!route) notFound();

  const contentDir = path.join(process.cwd(), "content", ...slugSegments);
  let headHtml: string;
  let bodyHtml: string;
  try {
    headHtml = fs.readFileSync(path.join(contentDir, "head.html"), "utf8");
    bodyHtml = fs.readFileSync(path.join(contentDir, "body.html"), "utf8");
  } catch {
    notFound();
  }

  const effectiveBodyHtml = await getEffectiveBodyHtml(slug, bodyHtml);

  const srcDoc = `<!doctype html>
<html lang="fr">
<head>${headHtml}</head>
<body>${effectiveBodyHtml}<script>${EDITOR_BRIDGE_SCRIPT}</script></body>
</html>`;

  return (
    <div>
      <h1>Éditer : {route.title}</h1>
      <p style={{ color: "#555" }}>
        Cliquez sur un texte pour le modifier, ou sur une image pour la remplacer. N&apos;oubliez
        pas d&apos;enregistrer.
      </p>
      <PageEditorClient slug={slug} srcDoc={srcDoc} />
    </div>
  );
}
