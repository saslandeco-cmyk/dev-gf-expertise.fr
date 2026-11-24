"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { slugify } from "@/lib/slugify";
import { isReservedSlug } from "@/lib/reserved-slugs";

async function assertAvailableSlug(slug: string, ignoreId?: string) {
  if (!slug) throw new Error("L'adresse (slug) est requise.");
  if (isReservedSlug(slug)) {
    throw new Error(`"/${slug}/" est déjà utilisée par une page existante du site.`);
  }
  const existing = await prisma.page.findUnique({ where: { slug } });
  if (existing && existing.id !== ignoreId) {
    throw new Error(`"/${slug}/" est déjà utilisée par une autre page.`);
  }
}

function readForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "").trim() || title);
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const metaDescription = String(formData.get("metaDescription") ?? "").trim() || null;
  const coverImageUrl = String(formData.get("coverImageUrl") ?? "").trim() || null;
  const bodyHtml = String(formData.get("bodyHtml") ?? "");
  const published = formData.get("published") === "on";
  return { title, slug, excerpt, metaDescription, coverImageUrl, bodyHtml, published };
}

export async function createPage(formData: FormData) {
  await requireAdmin();
  const { title, slug, excerpt, metaDescription, coverImageUrl, bodyHtml, published } = readForm(formData);

  if (!title) throw new Error("Le titre est requis.");
  await assertAvailableSlug(slug);

  await prisma.page.create({
    data: { title, slug, excerpt, metaDescription, coverImageUrl, bodyHtml, published },
  });

  revalidatePath(`/${slug}`);
  redirect("/admin/custom-pages/");
}

export async function updatePage(id: string, formData: FormData) {
  await requireAdmin();
  const { title, slug, excerpt, metaDescription, coverImageUrl, bodyHtml, published } = readForm(formData);

  if (!title) throw new Error("Le titre est requis.");
  const existing = await prisma.page.findUniqueOrThrow({ where: { id } });
  await assertAvailableSlug(slug, id);

  await prisma.page.update({
    where: { id },
    data: { title, slug, excerpt, metaDescription, coverImageUrl, bodyHtml, published },
  });

  revalidatePath(`/${existing.slug}`);
  revalidatePath(`/${slug}`);
  redirect("/admin/custom-pages/");
}

export async function deletePage(id: string) {
  await requireAdmin();
  const existing = await prisma.page.delete({ where: { id } });
  revalidatePath(`/${existing.slug}`);
}
