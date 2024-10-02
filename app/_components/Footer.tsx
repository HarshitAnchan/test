"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image"; // Import Next.js Image component

const socialLinks = [
  { icon: Github, href: "https://github.com/HarshitAnchan" },
  { icon: Twitter, href: "https://x.com/HarshitAnchan02" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/harshitanchan/" },
];

const FooterLink = ({ href, children }: any) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition-colors"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    {children}
  </motion.a>
);

export default function AnimatedFooter() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Replace SVG with Next.js Image component */}
          <motion.div
            className="mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/logo.png" // Update with your image path
              alt="Your Image Description" // Update with your image description
              width={40} // Set appropriate width
              height={40} // Set appropriate height
            />
          </motion.div>
          <motion.div
            className="flex space-x-4 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {socialLinks.map((link, index) => (
              <FooterLink key={index} href={link.href}>
                <link.icon size={24} />
              </FooterLink>
            ))}
          </motion.div>
          <motion.p
            className="text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            © {new Date().getFullYear()} Trace.io. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
