import { allPosts } from "@/.contentlayer/generated";
import Image from "next/image";
import Twemoji from "../components/Twemoji";
import Link from "next/link";
import dayjs from "dayjs";

export default function Home() {
  return (
    <div className="w-full h-full max-w-5xl px-4 py-12 mx-auto md:py-24 md:px-8">
      <div className="w-full mx-auto">
        <div className="w-full">
          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-5xl text-inherit">
            <Twemoji className="w-5 h-5" emoji="💻" /> Web Developer, Mobile
            Developer, a Full-Stack Developer.
          </h1>

          <p className="mt-8 text-base max-w-3xl">
            Hello! I&apos;m{" "}
            <span className="text-lg font-semibold">Michael James Carnaje</span>
            , a proficient Web and Mobile Developer. I&apos;ve worked with
            Android and iOS Development using React Native, and Web Development
            using JavaScript, React, Next.js, Node.js, GraphQL, Python, Flask,
            C/C++, as well as database management using Firebase, Supabase, SQL,
            MySQL, PostgreSQL, and more.
          </p>
        </div>
        <div className="grid gap-6 my-16">
          <div className="flex gap-4">
            <Twemoji emoji="🎓️" />
            <div>
              <h2 className="mb-0.5 text-2xl font-bold">Education</h2>
              <p className="text-lg">
                Bachelors in <span className="font-bold">Computer Science</span>
              </p>
              <p>
                Mindanao State University - Iligan Instiute of Technology
                (MSU-IIT)
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Twemoji emoji="💼" />
            <div>
              <h2 className="mb-0.5 text-2xl font-bold">Linkedin</h2>
              <a
                href="https://www.linkedin.com/in/mjcarnaje/"
                className="text-lg underline"
                target="_blank"
              >
                linkedin.com/in/mjcarnaje
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <Twemoji emoji="📮" />
            <div>
              <h2 className="mb-0.5 text-2xl font-bold">Email</h2>
              <a
                href="mailto:carnaje.michaeljames@gmail.com"
                className="text-lg underline"
                target="_blank"
              >
                carnaje.michaeljames@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-12 border-t"></div>
      <div className="grid grid-cols-1 gap-12 mx-auto md:grid-cols-2">
        <div className="col-span-1 md:col-span-2">
          <h1 className="text-4xl font-bold tracking-tight">Blog Posts</h1>
        </div>
        {allPosts.map((blog) => (
          <article key={blog._id} className="flex flex-col gap-4 group">
            {blog.coverImage && (
              <Link href={blog.slug}>
                <div className="relative w-full overflow-hidden border rounded-2xl aspect-video bg-gray-50 border-gray-900/10">
                  <Image
                    src={blog.coverImage}
                    fill
                    className="object-cover transition-transform rounded-2xl group-hover:scale-105"
                    alt="Aritcle Cover Photo"
                  />
                </div>
              </Link>
            )}
            <div className="flex flex-col gap-2">
              <Link href={blog.slug}>
                <h2 className="text-xl font-bold cursor-pointer">
                  {blog.title}
                </h2>
              </Link>
              {blog.description && (
                <Link href={blog.slug}>
                  <p>{blog.description}</p>
                </Link>
              )}
              <Link href={blog.slug}>
                <p className="text-sm text-gray-500">
                  {dayjs(blog.publishAt).format("MMMM D, YYYY")}
                </p>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
