"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What features are available for free users?",
    answer:
      "Free users can upload up to 5 files, use the document editor, and access real-time collaboration features. They can also share their work via email and WhatsApp.",
  },
  {
    question: "What additional benefits do premium users receive?",
    answer:
      "Premium users enjoy unlimited file uploads and advanced document editing capabilities, enhancing their overall experience and productivity.",
  },
  {
    question: "Is my data secure with your application?",
    answer:
      "Absolutely! We prioritize data security with end-to-end encryption and regular backups to ensure your information remains safe and accessible.",
  },
  {
    question: "What support options are available?",
    answer:
      "We offer 24/7 customer support via chat, email assistance, and an extensive help center to address all user inquiries effectively.",
  },
];

export default function EnhancedFAQ() {
  return (
    <section className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
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
      className="bg-black rounded-lg overflow-hidden border border-gray-800"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.button
        className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        whileTap={{ backgroundColor: "rgba(255,255,255,0.1)" }}
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
              <p className="text-gray-300">{answer}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="absolute inset-0 border-2 border-purple-500 rounded-lg pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
