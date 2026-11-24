"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { slugify } from "@/lib/slugify";

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let slug = slugify(base) || "article";
  let i = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    i += 1;
    slug = `${slugify(base)}-${i}`;
  }
}

export async function createPost(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const coverImageUrl = String(formData.get("coverImageUrl") ?? "").trim() || null;
  const bodyHtml = String(formData.get("bodyHtml") ?? "");
  const published = formData.get("published") === "on";

  if (!title) throw new Error("Le titre est requis.");

  const slug = await uniqueSlug(title);

  await prisma.post.create({
    data: {
      title,
      slug,
      excerpt,
      coverImageUrl,
      bodyHtml,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/blog");
  redirect("/admin/posts/");
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const coverImageUrl = String(formData.get("coverImageUrl") ?? "").trim() || null;
  const bodyHtml = String(formData.get("bodyHtml") ?? "");
  const published = formData.get("published") === "on";

  if (!title) throw new Error("Le titre est requis.");

  const existing = await prisma.post.findUniqueOrThrow({ where: { id } });
  const slug = existing.title === title ? existing.slug : await uniqueSlug(title, id);

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      coverImageUrl,
      bodyHtml,
      published,
      publishedAt: published ? (existing.publishedAt ?? new Date()) : null,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/posts/");
}

export async function deletePost(id: string) {
  await requireAdmin();
  const existing = await prisma.post.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
}
