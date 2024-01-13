import React, { memo } from "react";
import twemoji from "twemoji";

const Twemoji: React.FC<{ emoji: string; className?: string }> = ({
  emoji,
  className,
}) => (
  <span
    className="inline-block w-12 h-12"
    dangerouslySetInnerHTML={{
      __html: twemoji.parse(emoji, {
        folder: "svg",
        ext: ".svg",
      }),
    }}
  />
);

export default memo(Twemoji);
