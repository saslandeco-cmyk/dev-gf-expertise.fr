import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { updatePost } from "../actions";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  const updatePostWithId = updatePost.bind(null, post.id);

  return (
    <div>
      <h1>Éditer : {post.title}</h1>
      <form action={updatePostWithId} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 720 }}>
        <label>
          Titre
          <input name="title" defaultValue={post.title} required style={{ display: "block", width: "100%", padding: 8 }} />
        </label>
        <label>
          Extrait (résumé court)
          <textarea name="excerpt" rows={2} defaultValue={post.excerpt ?? ""} style={{ display: "block", width: "100%", padding: 8 }} />
        </label>
        <label>
          Image de couverture
          <ImageUploadField name="coverImageUrl" initialUrl={post.coverImageUrl} />
        </label>
        <label>
          Contenu
          <RichTextEditor name="bodyHtml" initialHtml={post.bodyHtml} />
        </label>
        <label>
          <input type="checkbox" name="published" defaultChecked={post.published} /> Publié
        </label>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}
