import { allPosts, allProjects } from "@/.contentlayer/generated";
import technologies from "@/components/technologies";
import { Button } from "@/components/ui/button";
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
                I&apos;m Michael James Carnaje, a Software Engineer based in the
                Philippines. I&apos;m passionate about building software that
                solves real-world problems and improves the lives of those around
                me. I&apos;m an expert in AI integration with various models including GPT, Claude, and open-source AI like Llama and DeepSeek.
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
                <div key={tech.name} className="flex flex-col items-center gap-3">
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
                I specialize in integrating various AI models into applications and systems, turning cutting-edge AI capabilities into practical solutions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border rounded-xl bg-grid-small-black/[.1] border-input">
                  <h3 className="mb-3 text-xl font-bold">Large Language Models</h3>
                  <p>Expert integration with commercial APIs like OpenAI GPT and Anthropic Claude, as well as open-source models like Llama, DeepSeek, and Mistral.</p>
                </div>
                <div className="p-6 bg-white border rounded-xl bg-grid-small-black/[.1] border-input">
                  <h3 className="mb-3 text-xl font-bold">AI Application Development</h3>
                  <p>Building AI-powered applications with RAG (Retrieval Augmented Generation), fine-tuning for specific domains, and creating intuitive AI interfaces.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-t"></div>
          <div id="projects" className="grid grid-cols-1 gap-12 mx-auto md:grid-cols-2">
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
          <div id="blog" className="grid grid-cols-1 gap-12 mx-auto md:grid-cols-2">
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
      </div>
    </>
  );
}
