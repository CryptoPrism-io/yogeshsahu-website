"use client";

import { type ReactNode } from "react";
import Reveal from "./Reveal";

interface StaggeredBodyProps {
  paragraphs: string[];
  wrapper?: (children: ReactNode) => ReactNode;
}

export default function StaggeredBody({ paragraphs, wrapper }: StaggeredBodyProps) {
  const render = paragraphs.map((para, i) => (
    <Reveal key={i} delay={i * 0.04} y={10}>
      <p
        className="mb-5 text-[15.5px] leading-[1.85]"
        style={{ fontFamily: "var(--font-body)", color: "var(--ys-text)" }}
      >
        {para}
      </p>
    </Reveal>
  ));

  return wrapper ? wrapper(render) : <>{render}</>;
}
