"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Component() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  useEffect(() => {
    controls.start({
      background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
    });
  }, [mousePosition, controls]);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          animate={controls}
          transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        />
        <div className="relative z-10 text-center px-4 md:px-6 py-12 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-indigo-500 px-3 py-1 text-sm font-semibold text-indigo-500 mb-6"
          >
            <motion.span
              className="mr-2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.span>
            Explore the potential of Trace.io
          </motion.div>
          <motion.h1
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Unleash Your Creativity with
            <motion.span
              className="text-indigo-500"
              animate={{ color: ["#4F46E5", "#818CF8", "#4F46E5"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {" "}
              Trace.io
            </motion.span>
          </motion.h1>
          <motion.p
            className="mx-auto max-w-[700px] text-gray-400 md:text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Design and collaborate effortlessly with our advanced visual tools,
            built to empower your creative projects.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <RegisterLink>
              <Button
                className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors relative overflow-hidden group rounded-full"
                size="lg"
              >
                <span className="relative z-10">Sign Up Now</span>
                <motion.div
                  className="absolute inset-0 bg-indigo-400 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                  initial={false}
                  animate={{ scale: [0.9, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
              </Button>
            </RegisterLink>
          </motion.div>
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.div
              className="relative rounded-t-3xl overflow-hidden mx-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Image
                src="/dashboard.png"
                alt="Trace.io Dashboard preview"
                width={800}
                height={400}
                className="rounded-t-3xl mx-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
