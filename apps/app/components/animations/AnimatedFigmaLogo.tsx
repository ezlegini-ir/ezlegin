"use client";

import { figmaLogo } from "@/public";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AnimatedFigmaLogo() {
  return (
    <motion.div
      draggable={false}
      className="absolute pointer-events-none select-none"
      animate={{
        x: [0, 50, 15, 0],
        y: [0, -10, 50, 0],
        rotate: [0, 10, -10, 0],
        scale: [1, 0.8, 0.8, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Image alt="Figma" src={figmaLogo} width={25} height={38} />
    </motion.div>
  );
}
