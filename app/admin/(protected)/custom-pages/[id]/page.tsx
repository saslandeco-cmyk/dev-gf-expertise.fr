import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { updatePage } from "../actions";

export default async function EditCustomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();

  const updatePageWithId = updatePage.bind(null, page.id);

  return (
    <div>
      <h1>Éditer : {page.title}</h1>
      <form action={updatePageWithId} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 720 }}>
        <label>
          Titre
          <input name="title" defaultValue={page.title} required style={{ display: "block", width: "100%", padding: 8 }} />
        </label>
        <label>
          Adresse
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: "#777" }}>/</span>
            <input name="slug" defaultValue={page.slug} style={{ flex: 1, padding: 8 }} />
            <span style={{ color: "#777" }}>/</span>
          </div>
        </label>
        <label>
          Résumé (optionnel)
          <textarea name="excerpt" rows={2} defaultValue={page.excerpt ?? ""} style={{ display: "block", width: "100%", padding: 8 }} />
        </label>
        <label>
          Description pour les moteurs de recherche (optionnel)
          <textarea
            name="metaDescription"
            rows={2}
            defaultValue={page.metaDescription ?? ""}
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </label>
        <label>
          Image de couverture
          <ImageUploadField name="coverImageUrl" initialUrl={page.coverImageUrl} />
        </label>
        <label>
          Contenu
          <RichTextEditor name="bodyHtml" initialHtml={page.bodyHtml} />
        </label>
        <label>
          <input type="checkbox" name="published" defaultChecked={page.published} /> Publiée
        </label>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}
