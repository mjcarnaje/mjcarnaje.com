"use client";
import { Post } from "@/.contentlayer/generated";
import React from "react";
import {
  FacebookShare,
  LinkedinShare,
  PinterestShare,
  RedditShare,
  TwitterShare,
  WhatsappShare,
} from "react-share-kit";

interface ShareButtonsProps {
  blog: Post;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ blog }) => {
  const url = `https://www.mjcarnaje.com/${blog.slug}`;
  const title = blog.title;

  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <div>
        <h2 className="text-gray-700 font-medium">
          Share this article. Spread the word!
        </h2>
      </div>
      <div className="flex items-center w-full justify-center gap-2">
        <div data-tooltip-id="tooltip" data-tooltip-content="Share on Twitter">
          <TwitterShare url={url} title={title} round size={40} />
        </div>
        <div data-tooltip-id="tooltip" data-tooltip-content="Share on Facebook">
          <FacebookShare url={url} title={title} round size={40} />
        </div>
        <div data-tooltip-id="tooltip" data-tooltip-content="Share on Reddit">
          <RedditShare url={url} title={title} round size={40} />
        </div>
        <div data-tooltip-id="tooltip" data-tooltip-content="Share on Whatsapp">
          <WhatsappShare url={url} title={title} round size={40} />
        </div>
        <div
          data-tooltip-id="tooltip"
          data-tooltip-content="Share on Pinterest"
        >
          <PinterestShare
            url={url}
            title={title}
            round
            size={40}
            media={title}
          />
        </div>
        <div data-tooltip-id="tooltip" data-tooltip-content="Share on Linkedin">
          <LinkedinShare url={url} title={title} round size={40} />
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;
