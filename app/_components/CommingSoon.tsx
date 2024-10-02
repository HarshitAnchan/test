"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SimpleComingSoon() {
  return (
    <div className=" bg-white text-black flex flex-col items-center justify-center p-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold mb-4 text-center"
      >
        Coming Soon
      </motion.h1>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-24 h-1 bg-white"
      />
    </div>
  );
}
