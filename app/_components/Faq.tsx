"use client";

import { PhoneCall, Plus, Mail, Github, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export const FAQ = () => {
  return (
    <section
      id="faqs"
      className="w-full py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex text-center justify-center items-center gap-6 flex-col mb-16"
        >
          <Badge variant="outline" className="px-4 py-1">
            Frequently Asked Questions
          </Badge>
          <div className="flex gap-4 flex-col max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
            >
              Everything you need to know
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              Can't find the answer you're looking for? Reach out to our
              customer support team.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2" variant="outline" size="lg">
                  Contact Support
                  <PhoneCall className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Contact Support</DialogTitle>
                  <DialogDescription>
                    Get in touch with us through the following channels:
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <a
                      href="mailto:harshitanchan647@gmail.com"
                      className="text-sm font-medium hover:underline"
                    >
                      harshitanchan647@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Github className="h-5 w-5 text-muted-foreground" />
                    <a
                      href="https://github.com/HarshitAnchan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      HarshitAnchan
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Twitter className="h-5 w-5 text-muted-foreground" />
                    <a
                      href="https://twitter.com/harshit_anchan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      @harshit_anchan
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl w-full mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants} custom={index}>
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="hover:no-underline py-6 px-4 rounded-lg hover:bg-muted/50 data-[state=open]:bg-muted/50 transition-all gap-4">
                    <span className="text-left font-medium">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-6">
                    <div className="text-muted-foreground">{faq.answer}</div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
