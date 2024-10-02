"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    color: "#FF6B6B",
    title: "Real-Time Collaboration",
    description:
      "Work together on a shared canvas, with updates happening instantly.",
  },
  {
    color: "#4ECDC4",
    title: "Infinite Canvas",
    description: "A limitless workspace for your ideas, diagrams, and notes.",
  },
  {
    color: "#45B7D1",
    title: "Sticky Notes",
    description: "Create and arrange sticky notes for brainstorming sessions.",
  },
  {
    color: "#F7B731",
    title: "Drawing Tools",
    description: "Sketch freely with a variety of pen styles and colors.",
  },
  {
    color: "#5D5FEF",
    title: "Drag and Drop Images",
    description: "Easily add images and rearrange them anywhere on the canvas.",
  },
  {
    color: "#FF8A5B",
    title: "Export as PDF",
    description: "Save your work and share it as a high-quality PDF document.",
  },
];

const FeatureShape = ({ color, title, description, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  const shapeVariants = {
    initial: { pathLength: 0, fill: "rgba(0, 0, 0, 0)" },
    animate: {
      pathLength: 1,
      fill: color,
      transition: { duration: 2, ease: "easeInOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="w-full h-full relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          d={`M${20 + Math.random() * 60},${20 + Math.random() * 60} Q${
            Math.random() * 100
          },${Math.random() * 100} ${20 + Math.random() * 60},${
            20 + Math.random() * 60
          } T${20 + Math.random() * 60},${20 + Math.random() * 60}`}
          stroke={color}
          strokeWidth="2"
          fill="none"
          variants={shapeVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        />
      </svg>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 bg-black bg-opacity-80"
          >
            <h3 className="text-lg font-bold mb-2" style={{ color }}>
              {title}
            </h3>
            <p className="text-sm text-gray-300">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function AbstractArtFeatures() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      {/* Badge and Header Animation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <Badge
          variant="outline"
          className="mb-4 text-indigo-400 border-indigo-400"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Collaborative Features
          </motion.span>
        </Badge>
        <motion.h1
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-600"
          animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          Enhance Your Productivity
        </motion.h1>
        <motion.p
          className="text-xl text-gray-400 max-w-3xl mx-auto mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Unlock powerful tools for whiteboarding and teamwork, designed to make
          collaboration effortless and effective.
        </motion.p>
      </motion.div>

      <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="aspect-square relative"
          >
            <FeatureShape {...feature} index={index} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
