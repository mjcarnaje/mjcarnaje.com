"use client";

import React, { memo } from "react";
import twemoji from "@twemoji/api";
import { cn } from "@/lib/misc";

const Twemoji: React.FC<{ emoji: string; className?: string }> = ({
  emoji,
  className,
}) => (
  <span
    className={cn("inline-block w-12 h-12", className)}
    dangerouslySetInnerHTML={{
      __html: twemoji.parse(emoji, {
        folder: "svg",
        ext: ".svg",
      }),
    }}
  />
);

export default memo(Twemoji);
