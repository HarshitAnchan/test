"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function UniqueHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const springConfig = { stiffness: 300, damping: 30, restDelta: 0.001 };

  const yRange = useTransform(scrollY, [0, 100], [0, 1]);
  const headerY = useSpring(yRange, springConfig);
  const headerBg = useTransform(
    headerY,
    [0, 1],
    ["rgba(0,0,0,0)", "rgba(255,255,255,0.1)"]
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const logoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-2 backdrop-blur-sm"
      style={{ backgroundColor: headerBg }}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </motion.div>
              <motion.span
                className="text-2xl font-bold text-white"
                whileHover={{ textShadow: "0 0 8px rgb(255, 255, 255)" }}
              >
                Trace.io
              </motion.span>
            </Link>
          </motion.div>
          <div className="flex items-center space-x-4">
            <LoginLink>
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="outline"
                  className="rounded-full border-2 border-indigo-500 bg-transparent hover:bg-indigo-500 hover:text-white transition-all duration-300"
                >
                  <span className="text-white">Sign In</span>
                </Button>
              </motion.div>
            </LoginLink>
            <RegisterLink>
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              ></motion.div>
            </RegisterLink>
          </div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.header>
  );
}
