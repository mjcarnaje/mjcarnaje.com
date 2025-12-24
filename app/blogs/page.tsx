"use client";

import { allPosts } from "@/.contentlayer/generated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/Footer";
import dayjs from "dayjs";
import { ArrowLeftIcon, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { cn } from "@/lib/misc";

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const sortedPosts = useMemo(() => {
    return [...allPosts].sort((a, b) => {
      const dateA = a.publishAt ? new Date(a.publishAt).getTime() : 0;
      const dateB = b.publishAt ? new Date(b.publishAt).getTime() : 0;
      return dateB - dateA;
    });
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    allPosts.forEach((post) => {
      if (post.category) cats.add(post.category);
    });
    return Array.from(cats).sort();
  }, []);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    allPosts.forEach((post) => {
      if (post.tags) {
        post.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, []);

  const filteredPosts = useMemo(() => {
    return sortedPosts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;

      const matchesTags =
        selectedTags.length === 0 ||
        (post.tags &&
          selectedTags.every((tag) => post.tags?.includes(tag)));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [sortedPosts, searchQuery, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedTags([]);
  };

  const hasActiveFilters =
    searchQuery !== "" || selectedCategory !== null || selectedTags.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <Link href="/" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-6 group">
                <ArrowLeftIcon className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6">
                JOURNAL<span className="text-primary">.</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
                Reflections on engineering, AI integration, and the general craft of building.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <span className="text-6xl font-black opacity-10">{filteredPosts.length}</span>
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">Published Posts</span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20 items-start">
            <div className="lg:col-span-4 space-y-8 lg:space-y-10 lg:sticky lg:top-32 order-2 lg:order-1">
              {/* Search */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Search journal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 rounded-none border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-lg font-medium"
                />
              </div>

              {/* Categories */}
              {categories.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                        className={cn(
                          "px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all border",
                          selectedCategory === category
                            ? "bg-primary border-primary text-white"
                            : "bg-white border-gray-100 text-gray-500 hover:border-primary/30"
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "px-3 py-1 text-xs font-bold transition-all rounded-full border",
                          selectedTags.includes(tag)
                            ? "bg-gray-900 border-gray-900 text-white"
                            : "bg-white border-gray-100 text-gray-400 hover:border-gray-300"
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-primary font-bold uppercase tracking-widest text-xs h-auto p-0 hover:bg-transparent"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Posts Grid */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              {filteredPosts.length === 0 ? (
                <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl bg-dot-black/[0.02]">
                  <p className="text-xl font-bold text-gray-400">No matches found for your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-12 lg:gap-16">
                  {filteredPosts.map((blog) => (
                    <article
                      key={blog._id}
                      className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start pb-12 border-b border-gray-100 last:border-0"
                    >
                      <div className="md:col-span-4 lg:col-span-5 relative aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 bg-grid-small-black/[0.03] border border-gray-50">
                        {blog.coverImage && (
                          <Image
                            src={blog.coverImage}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            alt={blog.title}
                          />
                        )}
                      </div>
                      <div className="md:col-span-8 lg:col-span-7 space-y-4">
                        <div className="flex items-center gap-4">
                           <span className="text-xs font-black uppercase tracking-widest text-primary">
                             {blog.category}
                           </span>
                           <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                           <span className="text-xs font-bold text-gray-400">
                             {dayjs(blog.publishAt).format("MMM D, YYYY")}
                           </span>
                        </div>
                        <Link href={blog.slug}>
                          <h2 className="text-3xl font-black tracking-tight group-hover:text-primary transition-colors leading-tight">
                            {blog.title}
                          </h2>
                        </Link>
                        {blog.description && (
                          <p className="text-lg text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                            {blog.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {blog.tags?.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border border-gray-100 rounded bg-gray-50 text-gray-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
