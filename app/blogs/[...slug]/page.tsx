import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

import { Mdx } from "@/components/mdx-components";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

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

export async function generateStaticParams(): Promise<PostProps["params"][]> {
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

      <div className="relative w-full mb-8 border rounded-2xl aspect-video bg-gray-50 border-gray-900/10">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover mt-0 mb-0 rounded-2xl"
        />
      </div>

      <div>
        <h1>{post.title}</h1>
        <p className="text-xl text-slate-700">{post.description}</p>
      </div>
      <hr className="my-8" />
      <Mdx code={post.body.code} />
    </article>
  );
}
