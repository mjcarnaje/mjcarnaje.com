"use client";

import { allPosts } from "@/.contentlayer/generated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/nav/Navbar";
import dayjs from "dayjs";
import { ArrowLeftIcon, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Sort posts by date (newest first)
  const sortedPosts = useMemo(() => {
    return [...allPosts].sort((a, b) => {
      const dateA = a.publishAt ? new Date(a.publishAt).getTime() : 0;
      const dateB = b.publishAt ? new Date(b.publishAt).getTime() : 0;
      return dateB - dateA;
    });
  }, []);

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    allPosts.forEach((post) => {
      if (post.category) cats.add(post.category);
    });
    return Array.from(cats).sort();
  }, []);

  // Get all unique tags
  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    allPosts.forEach((post) => {
      if (post.tags) {
        post.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, []);

  // Filter posts based on search query, category, and tags
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
    <>
      <Navbar />
      <div className="w-full h-full max-w-6xl px-4 py-12 mx-auto md:py-24 md:px-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="no-underline">
              <Button variant="ghost" className="flex gap-2 px-0">
                <ArrowLeftIcon className="w-6 h-6" />
                Back
              </Button>
            </Link>
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              All Blog Posts
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-96"
              />
            </div>

            {/* Categories Filter */}
            {categories.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-gray-700">
                  Filter by Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category ? null : category
                        )
                      }
                      className={
                        selectedCategory === category
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : ""
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Tags Filter */}
            {tags.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-gray-700">
                  Filter by Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTags.includes(tag) ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => toggleTag(tag)}
                      className={
                        selectedTags.includes(tag)
                          ? "bg-gray-700 hover:bg-gray-800 text-white"
                          : ""
                      }
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </Button>
              </div>
            )}
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-lg text-gray-600">
                No blog posts found matching your criteria.
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-4"
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((blog) => (
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
                        <p className="text-sm group-hover:translate-x-1 transition duration-200 line-clamp-3">
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
          )}
        </div>
      </div>
    </>
  );
}
