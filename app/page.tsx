import { allProjects } from "@/.contentlayer/generated";
import technologies from "@/components/technologies";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Twemoji from "../components/Twemoji";
import { cn } from "@/lib/misc";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Editorial Hero Section */}
        <section
          id="about"
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20 bg-grid-red-300/[0.1]"
        >
          {/* Large Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <h2 className="text-[15vw] md:text-[20vw] font-black text-gray-50/30 leading-none tracking-tighter uppercase whitespace-nowrap">
              CARNAJE<span className="text-primary/5">.</span>
            </h2>
          </div>

          {/* Floating Blobs with more movement */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-100/40 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-12">
                {/* Status Badge */}
                <div className="px-4 py-1.5 rounded-full border border-primary/10 bg-white/50 backdrop-blur-sm flex items-center gap-3 shadow-sm animate-fade-in">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                    Full-stack Software Engineer • Philippines
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-gray-900 leading-none uppercase hover:scale-[1.02] transition-transform duration-700 cursor-default">
                  MJ <span className="text-primary">CARNAJE</span>
                </h1>

                {/* Tagline */}
                <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-2xl leading-relaxed font-medium px-4 md:px-0">
                  Turning AI into products people actually use.
                </p>

                {/* Call to Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
                  <Link href="#projects" className="group relative">
                    <div className="absolute inset-0 bg-primary translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
                    <Button
                      size="lg"
                      className="relative h-14 sm:h-16 rounded-none px-8 sm:px-12 bg-gray-900 text-white text-base sm:text-lg font-black uppercase tracking-widest border-none"
                    >
                      Work Portfolio
                    </Button>
                  </Link>
                  <Link
                    href="/blogs"
                    className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-gray-500 hover:text-primary transition-all flex items-center gap-4 group"
                  >
                    <span>Journal</span>
                    <div className="w-8 sm:w-12 h-px bg-gray-300 group-hover:w-16 group-hover:bg-primary transition-all duration-500"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-gray-300 to-transparent"></div>
          </div>
        </section>

        {/* Bento Grid AI Expertise */}
        <section id="ai-expertise" className="py-32 relative bg-gray-50/50">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex items-center gap-8 mb-24">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase whitespace-nowrap">
                AI SPECIALIZATION
              </h2>
              <div className="h-px w-full bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 md:auto-rows-[280px]">
              {/* Massive Feature Card */}
              <div className="md:col-span-7 md:row-span-2 group relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-8 md:p-12 hover:shadow-2xl transition-all duration-700 bg-grid-small-black/[0.03]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                <div className="h-full flex flex-col justify-between">
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-red-50 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-inner shadow-primary/5 group-hover:rotate-12 transition-transform duration-500">
                      🤖
                    </div>
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-red-50 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-inner shadow-primary/5 group-hover:-rotate-12 transition-transform duration-500">
                      ⚡️
                    </div>
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-red-50 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-inner shadow-primary/5 group-hover:scale-110 transition-transform duration-500">
                      📈
                    </div>
                  </div>
                  <div className="max-w-md">
                    <h3 className="text-3xl md:text-4xl font-black mb-4 md:mb-6 tracking-tight">
                      Production-Ready AI Solutions
                    </h3>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                      Transforming business problems into AI-powered products —
                      from real-time streaming interfaces to intuitive
                      AI-assisted workflows.
                    </p>
                  </div>
                </div>
              </div>

              {/* Square Mastery Card */}
              <div className="md:col-span-5 md:row-span-1 group relative overflow-hidden rounded-[2.5rem] border border-primary/10 bg-primary/[0.02] p-8 md:p-10 hover:bg-primary/[0.05] transition-all duration-500 min-h-[200px]">
                <div className="flex flex-col h-full justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-primary/40 group-hover:text-primary transition-colors">
                    Core Mastery
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-none my-4 md:my-0">
                    Agentic & Multi-Model Systems
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "OpenAI",
                      "Anthropic",
                      "Google",
                      "Meta",
                      "Mistral",
                      "DeepSeek",
                    ].map((company) => (
                      <span
                        key={company}
                        className="text-[10px] font-bold px-3 py-1 bg-white border border-primary/10 rounded-full flex items-center gap-1.5 shadow-sm"
                      >
                        <span className="w-1 h-1 bg-primary rounded-full"></span>
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dark Context Card */}
              <div className="md:col-span-5 md:row-span-1 group relative overflow-hidden rounded-[2.5rem] bg-gray-900 text-white p-8 md:p-10 hover:bg-black transition-all duration-500 min-h-[200px]">
                <div className="absolute inset-0 bg-dot-white/[0.05] z-0"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center text-lg md:text-xl group-hover:rotate-12 transition-transform duration-500">
                      🔍
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center text-lg md:text-xl group-hover:-rotate-12 transition-transform duration-500">
                      📚
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center text-lg md:text-xl group-hover:scale-110 transition-transform duration-500">
                      🧠
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight">
                    RAG & Knowledge Retrieval
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Project Showcase */}
        <section
          id="projects"
          className="py-32 bg-gray-950 text-white overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] pointer-events-none"></div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-32">
              <div className="relative">
                <h2 className="text-8xl md:text-[12rem] font-black tracking-tighter opacity-10 leading-none">
                  WORK
                </h2>
                <h3 className="absolute bottom-4 left-2 text-4xl md:text-6xl font-black tracking-tight">
                  Featured Projects
                </h3>
              </div>
              <div className="md:pt-12">
                <p className="text-gray-400 max-w-xs text-xl leading-relaxed italic border-l-4 border-primary pl-6">
                  &ldquo;Building digital products that bridge the gap between
                  human needs and AI potential.&rdquo;
                </p>
              </div>
            </div>

            <div className="space-y-48">
              {allProjects.map((project, index) => (
                <div
                  key={project._id}
                  className={cn(
                    "flex flex-col lg:items-center gap-16 lg:gap-24",
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  )}
                >
                  <div className="w-full lg:w-3/5 group relative">
                    {/* Unique Project Image Treatment */}
                    <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-gray-100 border border-white/10 transition-all duration-700 group-hover:scale-[1.02] group-hover:-rotate-1 shadow-2xl shadow-black/20">
                      {project.coverImage && (
                        <Image
                          src={project.coverImage}
                          fill
                          className="object-cover transition-all duration-700"
                          alt={project.title}
                        />
                      )}
                    </div>
                  </div>

                  <div className="w-full lg:w-2/5 space-y-8">
                    <div className="space-y-4">
                      <span className="text-primary font-black text-xs uppercase tracking-[0.4em] block">
                        Case Study 0{index + 1}
                      </span>
                      <h4 className="text-5xl font-black tracking-tight leading-none group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                    </div>
                    <p className="text-xl text-gray-400 leading-relaxed font-medium">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3 py-2">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 border border-white/10 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pt-6">
                      {project.websiteUrl && (
                        <Link
                          href={project.websiteUrl}
                          target="_blank"
                          className="inline-block group/btn"
                        >
                          <button className="h-14 px-10 bg-white text-gray-900 font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-primary hover:text-white border-2 border-transparent hover:border-primary">
                            View Live System
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Minimalist Tech Stack */}
        <section
          id="skills"
          className="py-32 relative overflow-hidden bg-white"
        >
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-4 lg:sticky lg:top-32 mb-12 lg:mb-0">
                <h2 className="text-5xl font-black tracking-tighter mb-6 uppercase">
                  STACK
                </h2>
                <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                  I choose the right tools for the job, focusing on scalability
                  and user experience.
                </p>
                <div className="flex gap-4">
                  <div className="w-12 h-1.5 bg-primary"></div>
                  <div className="w-12 h-1.5 bg-gray-100"></div>
                  <div className="w-12 h-1.5 bg-gray-100"></div>
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex flex-col items-center justify-center p-6 md:p-8 border border-gray-50 rounded-[2rem] hover:border-primary/20 hover:bg-primary/[0.02] transition-all duration-500 group relative bg-white"
                  >
                    <div className="absolute inset-0 bg-grid-small-black/[0.02] rounded-[2rem]"></div>
                    <div className="relative z-10 w-10 h-10 mb-4 transform group-hover:scale-110 transition-transform duration-500">
                      <tech.icon className="w-full h-full" />
                    </div>
                    <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-900 transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Modern Call to Action */}
        <section className="py-48 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.1] pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-transparent"></div>
          <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
            <h2 className="text-6xl md:text-[10rem] font-black text-white tracking-[calc(-0.05em)] mb-16 leading-none uppercase">
              LET&apos;S <br />
              <span className="italic opacity-50">WORK</span> TOGETHER
            </h2>
            <a
              href="mailto:carnaje.michaeljames@gmail.com"
              className="group relative inline-block"
            >
              <div className="absolute inset-0 bg-white translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
              <Button
                size="lg"
                className="relative h-20 rounded-none px-16 bg-gray-900 text-white hover:bg-gray-800 transition-all text-xl font-black uppercase tracking-widest"
              >
                Connect Now
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
