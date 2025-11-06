import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

import { Mdx } from "@/components/mdx-components";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

interface PostProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getPostFromParams(params: PostProps["params"]) {
  const { slug } = await params;
  const slugString = slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slugString);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: post.slug,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 660,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="w-full h-full max-w-4xl px-4 py-12 mx-auto prose md:py-24 md:px-8">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="no-underline">
          <Button variant="ghost" className="flex gap-2 px-0">
            <ArrowLeftIcon className="w-6 h-6" />
            Back
          </Button>
        </Link>
      </div>

      <div className="flex flex-col mb-8 gap-1">
        <div className="relative w-full border rounded-2xl aspect-video bg-gray-50 border-gray-900/10">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover mt-0 mb-0 rounded-2xl"
          />
        </div>
        {post.coverImageCaption && (
          <p className="text-sm text-slate-500">{post.coverImageCaption}</p>
        )}
      </div>

      <div>
        <h1>{post.title}</h1>
        <p className="text-xl text-slate-700">{post.description}</p>

        {post?.authors && (
          <div className="flex items-center gap-4 py-2">
            {post.authors.map((author) => (
              <div key={author.name} className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden aspect-square">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="rounded-xl not-prose border border-gray-900/5 aspect-square object-cover"
                  />
                </div>
                <span className="mr-2 text-sm">{author.name}</span>
              </div>
            ))}
          </div>
        )}
        <p>
          <time className="text-gray-500" dateTime={post.publishAt}>
            {dayjs(post.publishAt).format("MMMM D, YYYY")}
          </time>
        </p>
      </div>
      <hr className="my-8" />
      <div className="prose-img:rounded-xl prose-code:font-mono prose-pre:rounded-xl">
        <Mdx code={post.body.code} />
      </div>
    </article>
  );
}
