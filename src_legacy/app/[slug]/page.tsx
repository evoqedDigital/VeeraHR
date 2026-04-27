import { CtaSection } from "@/components/CtaSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SubpageTopBar } from "@/components/SubpageTopBar";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: `Article by ${post.author} — ${post.dateLabel}`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <SubpageTopBar />
      <article className="bg-gradient-to-b from-amber-50/40 to-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-amber-900/80">
            quick contact:
          </p>
          <h1 className="mt-6 text-center font-display text-2xl font-bold text-brand-dark sm:text-3xl text-balance">
            {post.title}
          </h1>
          <p className="mt-3 text-center text-sm text-zinc-500">
            {post.author} {post.dateLabel}
          </p>
        </div>
        <div className="prose-legal mx-auto max-w-3xl space-y-4 px-4 pb-12 sm:px-6 lg:px-8">
          {post.content}
        </div>
        <p className="mx-auto max-w-3xl px-4 pb-8 text-sm sm:px-6 lg:px-8">
          <Link className="text-brand hover:underline" href="/#blog">
            ← Our Recent Blogs
          </Link>
        </p>
      </article>
      <CtaSection />
      <SiteFooter />
    </>
  );
}

export const dynamicParams = false;
