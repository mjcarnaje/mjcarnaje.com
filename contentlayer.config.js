import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('contentlayer2/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blogs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    coverImage: {
      type: "string",
      required: true,
    },
    coverImageCaption: {
      type: "string",
    },
    authors: {
      type: "list",
      of: {
        type: "json",
      },
    },
    publishAt: {
      type: "date",
    },
  },
  computedFields,
}));

export const Projects = defineDocumentType(() => ({
  name: "Projects",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    coverImage: {
      type: "string",
      required: true,
    },
    websiteUrl: {
      type: "string",
    },
    playStoreUrl: {
      type: "string",
    },
    appStoreUrl: {
      type: "string",
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Projects],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine: (node) => {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: "  " }];
            }
          },
          onVisitHighlightedLine: (node) => {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord: (node) => {
            node.properties.className.push("word--highlighted");
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
