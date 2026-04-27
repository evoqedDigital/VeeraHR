import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { getBlogPosts } from "@/lib/data/blog-posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | HR News & Insights",
  openGraph: { title: "Blog | Veera HR Consultancy" },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <section className="px-4 py-14 sm:px-10 sm:pb-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-[14px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-all hover:translate-y-[-5px] hover:shadow-[0_12px_36px_rgba(108,99,255,0.14)]"
            >
              <Link href={post.href} className="no-underline">
              <div className="relative h-[200px]">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div
                  className={`absolute top-3.5 left-3.5 min-w-[46px] rounded-lg px-2.5 py-1.5 text-center leading-tight text-white ${
                    post.badge === "red" ? "bg-[#e53935]" : "bg-[#6c63ff]"
                  }`}
                >
                  <div className="text-xl font-extrabold">{post.day}</div>
                  <div className="text-[10px] font-semibold tracking-wider uppercase">{post.month}</div>
                </div>
              </div>
              <div className="px-5 py-4 pb-6">
                <h3 className="mb-2.5 text-base font-bold leading-snug text-[#1a1a3e]">
                  {post.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#777]">{post.excerpt}</p>
                <span className="mt-3.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6c63ff]">
                  Read More →
                </span>
              </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CtaBand
        label="Empower Your Business"
        title="Ready To Transform\nYour Workforce?"
        href="/contact"
        button="Get Started Today →"
      />
    </>
  );
}
