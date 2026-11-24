"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useEffect, useRef } from "react";

export default function RichTextEditor({
  name,
  initialHtml,
}: {
  name: string;
  initialHtml: string;
}) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [StarterKit, Image, Link.configure({ openOnClick: false })],
    content: initialHtml,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = editor.getHTML();
      }
    },
  });

  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = initialHtml;
    }
  }, [initialHtml]);

  async function insertImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file || !editor) return;
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) return;
      const { url } = (await res.json()) as { url: string };
      editor.chain().focus().setImage({ src: url }).run();
    };
    input.click();
  }

  return (
    <div>
      <input ref={hiddenInputRef} type="hidden" name={name} defaultValue={initialHtml} />
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()}>
          Gras
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()}>
          Italique
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
          Titre
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          Liste
        </button>
        <button type="button" onClick={insertImage}>
          Image
        </button>
      </div>
      <div style={{ border: "1px solid #ccc", borderRadius: 4, padding: 12, background: "#fff", minHeight: 240 }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
