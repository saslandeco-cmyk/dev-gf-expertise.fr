"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import routes from "@/lib/generated/site-routes.json";

function publicPathForSlug(slug: string): string {
  const route = routes.find((r) => r.slug === slug);
  return route?.pathname ?? "/";
}

export async function saveFieldOverrides(slug: string, changedFields: Record<string, string>) {
  await requireAdmin();
  if (Object.keys(changedFields).length === 0) return;

  const existing = await prisma.pageOverride.findUnique({ where: { slug } });
  const merged = {
    ...((existing?.fields as Record<string, string>) ?? {}),
    ...changedFields,
  };

  await prisma.pageOverride.upsert({
    where: { slug },
    update: { fields: merged },
    create: { slug, fields: merged },
  });

  revalidatePath(publicPathForSlug(slug));
}

export async function resetPage(slug: string) {
  await requireAdmin();
  await prisma.pageOverride.deleteMany({ where: { slug } });
  revalidatePath(publicPathForSlug(slug));
}
