import { allPosts, allProjects } from "@/.contentlayer/generated";
import technologies from "@/components/technologies";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Navbar } from "@/components/nav/Navbar";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import Twemoji from "../components/Twemoji";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full h-full max-w-6xl px-4 py-12 mx-auto md:py-24 md:px-8">
        <div className="flex flex-col gap-16">
          <div id="about" className="w-full mx-auto pt-16">
            <div className="w-full">
              <TypewriterEffectSmooth
                className="mt-6 text-5xl font-bold tracking-tight sm:text-5xl text-inherit"
                words={[
                  {
                    text: "Hello",
                  },
                  {
                    text: "there!",
                  },
                  {
                    isEmoji: true,
                    className: "ml-2",
                    text: "👋",
                  },
                ]}
              />

              <p className="max-w-3xl mt-8 text-base">
                I&apos;m Michael James Carnaje, a software engineer from the
                Philippines with 4 years of experience. I enjoy building
                products that address real user needs—whether that&apos;s
                through web applications, mobile apps, or automation tools. My
                work often involves integrating AI-powered features; I&apos;ve
                built with models like GPT, Claude, and open-source options such
                as Llama and DeepSeek. I&apos;m always learning new technologies
                and aim to deliver solutions that make a practical difference.
              </p>
            </div>
            <div className="grid gap-6 mt-16">
              <div className="flex gap-4">
                <Twemoji emoji="🎓️" />
                <div>
                  <h2 className="mb-0.5 text-2xl font-bold">Education</h2>
                  <p className="text-lg">
                    Bachelors in{" "}
                    <span className="font-bold">Computer Science</span>
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
            <div className="flex gap-4 mt-16 mb-4">
              <Link href={`/Carnaje - Resume.pdf`} target="_blank">
                <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#333f4f,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  Resume
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full border-t"></div>
          <div id="skills" className="flex flex-col w-full gap-12">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Languages & Technologies <Twemoji emoji="💻" className="ml-2" />
              </h1>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="flex flex-col items-center max-w-xs p-4 space-y-2 transition-all duration-300 bg-white bg-grid-small-black/[.1] border-input border rounded-full shadow-sm cursor-pointer hover:scale-110">
                    <div className="w-12 h-12 aspect-square">
                      <tech.icon className="w-full h-full" />
                    </div>
                  </div>
                  <p className="font-mono text-sm font-medium text-center text-gray-700">
                    {tech.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full border-t"></div>
          <div id="ai-expertise" className="flex flex-col w-full gap-12">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                AI Integration Expertise <Twemoji emoji="🤖" className="ml-2" />
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <p className="text-base">
                I specialize in building production-ready AI systems that solve
                complex domain-specific challenges, with deep expertise in
                healthcare AI and multi-model integration architectures.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-white border rounded-xl bg-grid-small-black/[.1] border-input">
                  <h3 className="mb-3 text-xl font-bold">
                    Healthcare AI Systems
                  </h3>
                  <p>
                    Built 9 specialized AI services for geriatric care including
                    intelligent care plan generation, personalized meal
                    recommendations, medication management, cognitive activity
                    creation, and health observation analysis. Implemented
                    streaming responses with real-time progress tracking for
                    enhanced user experience.
                  </p>
                </div>
                <div className="p-6 bg-white border rounded-xl bg-grid-small-black/[.1] border-input">
                  <h3 className="mb-3 text-xl font-bold">
                    Multi-Model Integration
                  </h3>
                  <p>
                    Expert in architecting dual AI systems combining OpenAI
                    GPT-4 and Google Generative AI for complementary
                    capabilities. Seamless integration with commercial APIs
                    (OpenAI, Anthropic Claude) and open-source models (Llama,
                    DeepSeek, Mistral) for cost-effective, flexible solutions.
                  </p>
                </div>
                <div className="p-6 bg-white border rounded-xl bg-grid-small-black/[.1] border-input">
                  <h3 className="mb-3 text-xl font-bold">Domain-Specific AI</h3>
                  <p>
                    Developed AI-powered content generation across healthcare,
                    education, and entertainment domains. Experience with RAG
                    (Retrieval Augmented Generation), fine-tuning for
                    specialized use cases, e-book creation systems, and building
                    intuitive interfaces for complex AI workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-t"></div>
          <div
            id="projects"
            className="grid grid-cols-1 gap-12 mx-auto md:grid-cols-2"
          >
            <div className="col-span-1 md:col-span-2">
              <h1 className="text-4xl font-bold tracking-tight">
                Featured Projects <Twemoji emoji="🚀" className="ml-2" />
              </h1>
            </div>
            {allProjects.map((project) => (
              <article
                key={project._id}
                className="flex bg-grid-small-black/[.1] border-input group hover:shadow-xl flex-col gap-4 group rounded-xl transition duration-200 p-4 bg-white border"
              >
                {project.coverImage && (
                  <div className="relative w-full overflow-hidden border rounded-2xl aspect-video bg-gray-50 border-input">
                    <Image
                      src={project.coverImage}
                      fill
                      className="object-cover transition-transform rounded-2xl group-hover:scale-105"
                      alt="Aritcle Cover Photo"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold cursor-pointer group-hover:translate-x-1 transition duration-200">
                    {project.title}
                  </h2>
                  <p className="text-sm group-hover:translate-x-1 transition duration-200">
                    {project.description}
                  </p>
                </div>
                {project.tags && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <div key={tag}>
                        <span className="px-2 py-1 text-sm text-gray-800 bg-gray-200 rounded-md">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-4">
                  {project.websiteUrl && (
                    <Link target="_blank" href={project.websiteUrl}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex items-center gap-2 py-1 text-sm"
                      >
                        <Twemoji className="w-4 h-4" emoji="🔗" />
                        Website
                      </Button>
                    </Link>
                  )}
                  {project.playStoreUrl && (
                    <Link target="_blank" href={project.playStoreUrl}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex items-center gap-2 py-1 text-sm"
                      >
                        <Twemoji className="w-4 h-4" emoji="🔗" />
                        Play Store
                      </Button>
                    </Link>
                  )}
                  {project.appStoreUrl && (
                    <Link target="_blank" href={project.appStoreUrl}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex items-center gap-2 py-1 text-sm"
                      >
                        <Twemoji className="w-4 h-4" emoji="🔗" />
                        App Store
                      </Button>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="w-full border-t"></div>
          <div
            id="blog"
            className="grid grid-cols-1 gap-12 mx-auto md:grid-cols-2"
          >
            <div className="col-span-1 md:col-span-2 flex items-center justify-between">
              <h1 className="text-4xl font-bold tracking-tight">
                Blog Posts <Twemoji emoji="📝" className="ml-2" />
              </h1>
              <Link href="/blogs">
                <Button variant="ghost" className="text-base">
                  View all
                </Button>
              </Link>
            </div>
            {allPosts.slice(0, 4).map((blog) => (
              <article
                key={blog._id}
                className="flex bg-grid-small-black/[.1] border-input group hover:shadow-xl flex-col gap-4 rounded-xl transition duration-200 p-4 bg-white border"
              >
                {blog.coverImage && (
                  <Link href={blog.slug}>
                    <div className="relative w-full overflow-hidden border rounded-2xl aspect-[3/2] bg-gray-50 border-input">
                      <Image
                        src={blog.coverImage}
                        fill
                        className="object-cover transition-transform rounded-2xl group-hover:scale-105"
                        alt="Article Cover Photo"
                      />
                    </div>
                  </Link>
                )}
                <div className="flex flex-col gap-3">
                  {blog.category && (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="default"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
                      >
                        {blog.category}
                      </Badge>
                    </div>
                  )}
                  <Link href={blog.slug}>
                    <h2 className="text-xl font-bold cursor-pointer group-hover:translate-x-1 transition duration-200">
                      {blog.title}
                    </h2>
                  </Link>
                  {blog.description && (
                    <Link href={blog.slug}>
                      <p className="text-sm group-hover:translate-x-1 transition duration-200 line-clamp-2">
                        {blog.description}
                      </p>
                    </Link>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {dayjs(blog.publishAt).format("MMMM D, YYYY")}
                    </p>
                  </div>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-sm text-gray-800 bg-gray-200 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
