"use client";

import { Edit3, Video, FileType, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const features = [
  {
    icon: Edit3,
    title: "Seamless Collaboration",
    description:
      "Real-time document editing and whiteboard collaboration for efficient teamwork.",
    gradient: "from-violet-500/10 to-purple-500/10",
  },
  {
    icon: Video,
    title: "Effortless Video Calls",
    description:
      "Crystal-clear video meetings integrated directly into your workflow.",
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: FileType,
    title: "Instant File Conversion",
    description:
      "Convert between file formats with a single click, right in your workspace.",
    gradient: "from-emerald-500/10 to-green-500/10",
  },
  {
    icon: Brain,
    title: "Smart AI Assistance",
    description:
      "AI-powered tools that streamline your workflow and boost productivity.",
    gradient: "from-orange-500/10 to-red-500/10",
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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  gradient,
}: (typeof features)[0]) => (
  <motion.div
    variants={itemVariants}
    className={`relative group p-8 rounded-2xl bg-gradient-to-br ${gradient} border border-white/10 backdrop-blur-sm`}
  >
    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-10 h-10 text-primary" />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="h-px w-12 bg-gradient-to-r from-primary/50 to-transparent"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export const FeatureSection = () => {
  return (
    <section
      id="features"
      className="w-full py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4" variant="secondary">
              Platform Features
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
          >
            Powerful features for
            <br />
            modern workflows
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to manage your workflow, collaborate with your
            team, and deliver projects faster than ever before.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
