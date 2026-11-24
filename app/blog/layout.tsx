import fs from "node:fs";
import path from "node:path";
import "./blog.css";

const SHARED_DIR = path.join(process.cwd(), "content", "__shared__");

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const headerHtml = fs.readFileSync(path.join(SHARED_DIR, "header.html"), "utf8");
  const footerHtml = fs.readFileSync(path.join(SHARED_DIR, "footer.html"), "utf8");

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: headerHtml }} />
      <main className="blog-article">{children}</main>
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </>
  );
}
