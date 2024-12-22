"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export const Hero = () => (
  <section id="home" className="relative w-full overflow-hidden bg-background">
    {/* Background Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

    {/* Content */}
    <div className="container relative z-10 mx-auto px-4">
      <motion.div
        className="flex flex-col items-center justify-center gap-8 py-20 lg:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <span className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
            Empowering Collaboration Everywhere
          </span>
        </motion.div>
        <motion.h1
          className="max-w-4xl text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Redefine Collaboration
          </span>{" "}
          with Trace.io
        </motion.h1>
        <motion.p
          className="max-w-2xl text-center text-lg text-muted-foreground sm:text-xl"
          variants={itemVariants}
        >
          Experience seamless teamwork with our AI-powered platform for
          real-time document editing, whiteboarding, and video calls. Simplify
          your workflows and boost productivity effortlessly.
        </motion.p>
        <RegisterLink>
          <motion.div variants={itemVariants}>
            <Button size="lg" className="group">
              Try Trace.io Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </RegisterLink>
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-muted-foreground"
          variants={itemVariants}
        >
          {/* Add additional details or logos here if needed */}
        </motion.div>
      </motion.div>
    </div>
  </section>
);
