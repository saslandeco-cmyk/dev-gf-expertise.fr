import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({ where: { slug } }).catch(() => null);
  if (!post || !post.published) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      {post.publishedAt ? (
        <p className="blog-meta">
          {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      ) : null}
      {post.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImageUrl} alt="" className="blog-cover" />
      ) : null}
      <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
    </article>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } }).catch(() => null);
  return { title: post ? `${post.title} - GF Expertise` : "Article" };
}
