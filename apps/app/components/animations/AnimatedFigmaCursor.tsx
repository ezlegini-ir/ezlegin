"use client";

import { figmaCursor } from "@/public";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AnimatedFigmaCursor() {
  return (
    <motion.div
      draggable={false}
      className="absolute pointer-events-none select-none"
      animate={{
        x: [0, 50, 30, -30, 0],
        y: [0, -50, 10, 10, 0],
        scale: [1, 0.9, 1, 0.9, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="w-[110px] lex flex-col">
        <Image alt="Figma" src={figmaCursor} width={25} height={27} />
        <div className="pl-5">
          <div className="bg-muted rounded-tl-none text-sm rounded-full border w-fit border-muted-foreground p-2">
            John Doe
          </div>
        </div>
      </div>
    </motion.div>
  );
}
