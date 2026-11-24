import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

// Catches any single-segment URL that isn't already a static route folder -
// Next.js always matches a literal folder (e.g. app/contact/) before this
// dynamic one, so existing pages can never be shadowed by a custom Page.
export default async function CustomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const page = await prisma.page.findUnique({ where: { slug } }).catch(() => null);
  if (!page || !page.published) notFound();

  return (
    <article>
      <h1>{page.title}</h1>
      {page.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={page.coverImageUrl} alt="" className="blog-cover" />
      ) : null}
      <div className="blog-body" dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
    </article>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } }).catch(() => null);
  if (!page) return {};
  return {
    title: `${page.title} - GF Expertise`,
    description: page.metaDescription ?? page.excerpt ?? undefined,
  };
}
