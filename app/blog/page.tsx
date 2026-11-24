import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Blog - GF Expertise" };

export default async function BlogIndex() {
  let posts: Awaited<ReturnType<typeof prisma.post.findMany>> = [];
  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    posts = [];
  }

  return (
    <div className="blog-list">
      <h1>Blog</h1>
      {posts.length === 0 ? <p>Aucun article pour le moment.</p> : null}
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}/`} className="blog-list-item">
          {post.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverImageUrl} alt="" />
          ) : null}
          <div>
            <h2>{post.title}</h2>
            {post.excerpt ? <p>{post.excerpt}</p> : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
