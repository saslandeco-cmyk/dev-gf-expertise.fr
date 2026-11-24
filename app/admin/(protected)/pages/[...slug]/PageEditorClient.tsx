"use client";

import { useEffect, useRef, useState } from "react";
import { saveFieldOverrides, resetPage } from "./actions";

type BridgeMessage =
  | { type: "edit-text-changed"; editId: string; value: string }
  | { type: "edit-image-click"; editId: string };

export default function PageEditorClient({ slug, srcDoc }: { slug: string; srcDoc: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingImageEditId = useRef<string | null>(null);

  const [changedFields, setChangedFields] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    function handleMessage(event: MessageEvent<BridgeMessage>) {
      const data = event.data;
      if (!data || typeof data !== "object") return;

      if (data.type === "edit-text-changed") {
        setChangedFields((prev) => ({ ...prev, [data.editId]: data.value }));
        setStatus(null);
      }

      if (data.type === "edit-image-click") {
        pendingImageEditId.current = data.editId;
        fileInputRef.current?.click();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const editId = pendingImageEditId.current;
    e.target.value = "";
    if (!file || !editId) return;

    setStatus("Envoi de l'image...");
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    if (!res.ok) {
      setStatus("Échec de l'envoi de l'image.");
      return;
    }
    const { url } = (await res.json()) as { url: string };

    setChangedFields((prev) => ({ ...prev, [editId]: url }));
    iframeRef.current?.contentWindow?.postMessage({ type: "set-image-src", editId, url }, "*");
    setStatus("Image mise à jour (pensez à enregistrer).");
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    await saveFieldOverrides(slug, changedFields);
    setChangedFields({});
    setSaving(false);
    setStatus("Enregistré.");
  }

  async function handleReset() {
    if (!confirm("Réinitialiser cette page à sa version d'origine ?")) return;
    setSaving(true);
    await resetPage(slug);
    setChangedFields({});
    setSaving(false);
    setStatus("Page réinitialisée.");
  }

  const changedCount = Object.keys(changedFields).length;

  return (
    <div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <button onClick={handleSave} disabled={saving || changedCount === 0}>
          Enregistrer{changedCount > 0 ? ` (${changedCount})` : ""}
        </button>
        <button onClick={handleReset} disabled={saving}>
          Réinitialiser cette page
        </button>
        {status ? <span style={{ color: "#555" }}>{status}</span> : null}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileSelected}
      />
      <iframe
        ref={iframeRef}
        srcDoc={srcDoc}
        sandbox="allow-scripts allow-same-origin allow-forms"
        style={{ width: "100%", height: "80vh", border: "1px solid #ccc", background: "#fff" }}
      />
    </div>
  );
}
