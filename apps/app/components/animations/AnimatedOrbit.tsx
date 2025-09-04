"use client";

import React from "react";
import { motion } from "framer-motion";

const AnimatedOrbit = ({ direction }: { direction?: "LEFT" | "RIGHT" }) => {
  return (
    <motion.div
      animate={{ rotate: direction === "LEFT" ? -360 : 360 }}
      transition={{
        repeat: Infinity,
        duration: 6,
        ease: "linear",
      }}
      className="relative w-64 h-64 rounded-full"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400  to-indigo-600 blur-[2px]" />
    </motion.div>
  );
};

export default AnimatedOrbit;
