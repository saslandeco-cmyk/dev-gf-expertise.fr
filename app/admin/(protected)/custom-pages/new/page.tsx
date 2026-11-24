import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { createPage } from "../actions";

export default function NewCustomPage() {
  return (
    <div>
      <h1>Nouvelle page</h1>
      <form action={createPage} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 720 }}>
        <label>
          Titre
          <input name="title" required style={{ display: "block", width: "100%", padding: 8 }} />
        </label>
        <label>
          Adresse (laisser vide pour la générer depuis le titre)
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: "#777" }}>/</span>
            <input name="slug" placeholder="notre-equipe" style={{ flex: 1, padding: 8 }} />
            <span style={{ color: "#777" }}>/</span>
          </div>
        </label>
        <label>
          Résumé (optionnel)
          <textarea name="excerpt" rows={2} style={{ display: "block", width: "100%", padding: 8 }} />
        </label>
        <label>
          Description pour les moteurs de recherche (optionnel)
          <textarea name="metaDescription" rows={2} style={{ display: "block", width: "100%", padding: 8 }} />
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
        <button type="submit">Créer la page</button>
      </form>
    </div>
  );
}
