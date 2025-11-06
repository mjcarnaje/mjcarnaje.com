"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import Image from "next/image";
import NetLogoSimulation from "./restricted-sir-model-with-vaccination-effect/NetLogoSimulation";

const components = {
  Image,
  NetLogoSimulation,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
