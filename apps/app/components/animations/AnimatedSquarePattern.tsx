"use client";

import { squarePatternSquare } from "@/public";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const AnimatedSquarePattern = ({ className }: { className?: string }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 30,
      }}
      className={className}
    >
      <Image
        alt=""
        src={squarePatternSquare}
        width={320}
        height={320}
        className="scale-125"
      />
    </motion.div>
  );
};

export default AnimatedSquarePattern;
