import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <h1>Nouvel article</h1>
      <form action={createPost} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 720 }}>
        <label>
          Titre
          <input name="title" required style={{ display: "block", width: "100%", padding: 8 }} />
        </label>
        <label>
          Extrait (résumé court)
          <textarea name="excerpt" rows={2} style={{ display: "block", width: "100%", padding: 8 }} />
        </label>
        <label>
          Image de couverture
          <ImageUploadField name="coverImageUrl" />
        </label>
        <label>
          Contenu
          <RichTextEditor name="bodyHtml" initialHtml="" />
        </label>
        <label>
          <input type="checkbox" name="published" defaultChecked /> Publier immédiatement
        </label>
        <button type="submit">Créer l&apos;article</button>
      </form>
    </div>
  );
}
