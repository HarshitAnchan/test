"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Trace.io?",
    answer:
      "Trace.io is a collaborative platform that integrates document editing, whiteboarding, and video calls, all enhanced by AI-powered tools to boost productivity.",
  },
  {
    question: "Can I use the whiteboard and document editor simultaneously?",
    answer:
      "Yes, Trace.io allows you to seamlessly use the document editor and whiteboard side by side, ensuring smooth collaboration and brainstorming.",
  },
  {
    question: "Does Trace.io support real-time collaboration?",
    answer:
      "Absolutely! You can collaborate in real-time with your team, edit documents, interact on the whiteboard, and communicate through video calls.",
  },
  {
    question: "What kind of files can I convert using Trace.io?",
    answer:
      "Trace.io supports file conversion for formats like JPG, JPEG, PNG, GIF, BMP, WEBP, ICO, TIF, TIFF, SVG, RAW, and TGA.",
  },
  {
    question: "How does the AI feature enhance my experience?",
    answer:
      "Our AI tools assist with tasks like document formatting, grammar checks, and creative suggestions, making collaboration and task execution more efficient.",
  },
  {
    question: "How does Trace.io ensure data security?",
    answer:
      "We prioritize your data's safety with end-to-end encryption and secure cloud storage, ensuring your files and conversations remain private and protected.",
  },
];

export default function EnhancedFAQ() {
  return (
    <section className="bg-white text-black py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-black"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer, index }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-lg overflow-hidden border border-gray-200"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.button
        className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
        whileTap={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      >
        <motion.span
          className="text-xl font-medium"
          animate={isHovered ? { x: 10 } : { x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {question}
        </motion.span>
        <motion.div
          animate={isOpen ? "open" : "closed"}
          className="relative w-6 h-6"
        >
          <motion.span
            variants={{
              open: { rotate: 45, y: 0 },
              closed: { rotate: 0, y: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center text-2xl font-bold"
          >
            +
          </motion.span>
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              className="p-4 pt-0"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-gray-600">{answer}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
