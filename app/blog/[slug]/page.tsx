import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { getBlogPosts } from "@/lib/data/blog-posts";
import type { Metadata } from "next";

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((item) => item.slug === slug);
  if (!post) return { title: "Blog" };
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <>
      <article className="px-4 py-14 sm:px-10 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <Link href="/blog" className="mb-6 inline-flex text-sm font-semibold text-[#1239D6] no-underline">
            ← Back to blog
          </Link>
          <div className="relative mb-8 h-[240px] overflow-hidden rounded-2xl sm:h-[360px]">
            <Image src={post.image} alt={post.title} fill className="object-cover" sizes="100vw" />
          </div>
          <h1 className="text-3xl font-extrabold leading-tight text-[#111] sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-[#555]">{post.excerpt}</p>
          <div className="mt-8 space-y-5">
            {post.content.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-relaxed text-[#444]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
      <CtaBand
        label="Need HR Support?"
        title="Let’s Build Your\nIdeal Workforce"
        href="/contact"
        button="Talk to Our Team →"
      />
    </>
  );
}
