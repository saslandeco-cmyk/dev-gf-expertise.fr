"use client";

import { useState } from "react";

export default function ImageUploadField({
  name,
  initialUrl,
}: {
  name: string;
  initialUrl?: string | null;
}) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    setUploading(false);
    if (!res.ok) return;
    const data = (await res.json()) as { url: string };
    setUrl(data.url);
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} readOnly />
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" style={{ maxWidth: 240, display: "block", marginBottom: 8, borderRadius: 4 }} />
      ) : null}
      <input type="file" accept="image/*" onChange={handleChange} disabled={uploading} />
      {uploading ? <span style={{ marginLeft: 8, color: "#555" }}>Envoi...</span> : null}
    </div>
  );
}
