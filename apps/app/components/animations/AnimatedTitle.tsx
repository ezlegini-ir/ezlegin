"use client";

import { motion } from "framer-motion";

interface AnimatedTitleProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  duration?: number;
}

const AnimatedTitle = ({
  title,
  highlight,
  subtitle,
  duration = 0.5,
}: AnimatedTitleProps) => {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <motion.div
        className="w-fit"
        initial={{ scale: 0, opacity: 0, y: 40 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration }}
      >
        <h2 className="text-3xl">
          {highlight ? (
            <>
              {title.split(highlight)[0]}
              <span className="title-gradient">{highlight}</span>
              {title.split(highlight)[1]}
            </>
          ) : (
            title
          )}
        </h2>
      </motion.div>

      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration, delay: 0.3, ease: "easeInOut" }}
        >
          <p className="text-muted-foreground">{subtitle}</p>
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedTitle;
