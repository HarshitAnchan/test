// "use client";

// import { useState, useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

// export default function Component() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const controls = useAnimation();

//   useEffect(() => {
//     const updateMousePosition = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", updateMousePosition);
//     return () => {
//       window.removeEventListener("mousemove", updateMousePosition);
//     };
//   }, []);

//   useEffect(() => {
//     controls.start({
//       background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
//     });
//   }, [mousePosition, controls]);

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <main className="flex-1 flex items-center justify-center relative overflow-hidden">
//         <motion.div
//           className="absolute inset-0 z-0"
//           animate={controls}
//           transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
//         />
//         <div className="relative z-10 text-center px-4 md:px-6 py-12 lg:py-32">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center rounded-full border border-indigo-500 px-3 py-1 text-sm font-semibold text-indigo-500 mb-6"
//           >
//             <motion.span
//               className="mr-2"
//               animate={{ rotate: [0, 360] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//             >
//               ✨
//             </motion.span>
//             Explore the potential of Trace.io
//           </motion.div>
//           <motion.h1
//             className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none mb-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             Unleash Your Creativity with
//             <motion.span
//               className="text-indigo-500"
//               animate={{ color: ["#4F46E5", "#818CF8", "#4F46E5"] }}
//               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             >
//               {" "}
//               Trace.io
//             </motion.span>
//           </motion.h1>
//           <motion.p
//             className="mx-auto max-w-[700px] text-gray-400 md:text-xl mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             Design and collaborate effortlessly with our advanced visual tools,
//             built to empower your creative projects.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <RegisterLink>
//               <Button
//                 className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors relative overflow-hidden group rounded-full"
//                 size="lg"
//               >
//                 <span className="relative z-10">Sign Up Now</span>
//                 <motion.div
//                   className="absolute inset-0 bg-indigo-400 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
//                   initial={false}
//                   animate={{ scale: [0.9, 1.1, 1] }}
//                   transition={{ repeat: Infinity, duration: 3 }}
//                 />
//               </Button>
//             </RegisterLink>
//           </motion.div>
//           <motion.div
//             className="mt-12"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.8 }}
//           >
//             <motion.div
//               className="relative rounded-t-3xl overflow-hidden mx-auto"
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 300, damping: 10 }}
//             >
//               <Image
//                 src="/dashboard.png"
//                 alt="Trace.io Dashboard preview"
//                 width={800}
//                 height={400}
//                 className="rounded-t-3xl mx-auto"
//               />
//             </motion.div>
//           </motion.div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Brush, Folder, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

const fonts = [
  "Arial, sans-serif",
  "Trebuchet MS, sans-serif",
  "Georgia, serif",
  "Palatino, serif",
  "Garamond, serif",
  "Brush Script MT, cursive",
  "Comic Sans MS, cursive",
];

export default function FontsNinja() {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const controls = useAnimation();
  const arrowControls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await controls.start({
        opacity: 0,
        y: -20,
        transition: { duration: 0.5, ease: "easeIn" },
      });
      setCurrentFontIndex((prevIndex) => (prevIndex + 1) % fonts.length);
      await controls.start({ opacity: 0, y: 20, transition: { duration: 0 } });
    };

    const interval = setInterval(animate, 1000);
    animate();

    return () => clearInterval(interval);
  }, [controls]);

  const AnimatedWord = () => (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      style={{
        fontFamily: fonts[currentFontIndex],
        display: "inline-block",
        fontSize: "1.0em",
        fontWeight: "bold",
        textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      Trace.io
    </motion.span>
  );

  const arrowVariants = {
    rest: { x: 0 },
    hover: {
      x: [0, 100],
      transition: {
        duration: 1,
        times: [0, 0.4, 0.4, 1],
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <nav className="py-4 px-6 flex items-center justify-around ">
        <div className="flex items-center flex-1">
          <Link href="/" className="flex items-center ml-5">
            <img
              src="/logo-black1.png"
              alt="Trace.io Logo"
              className="mr-2 h-8 w-auto"
            />
            <div className="relative">
              <span className="font-extrabold tracking-tighter text-2xl">
                Trace.io
              </span>
              <span className="ml-2 text-xs font-extrabold text-black bg-[#9FE5C8] absolute top-[-3px] left-[85px] px-0.5 pl-1 pr-1 py-0.4 rounded-full">
                BETA
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 ml-4"></div>
          <LoginLink>
            <motion.button
              className="  px-8 py-3 text-lg font-semibold text-white bg-black rounded-full border-2 border-black transition-colors duration-300 ease-in-out hover:bg-white hover:text-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Log in
            </motion.button>
          </LoginLink>
        </div>
      </nav>

      <main className="flex-grow pt-14 pr-14 flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto">
          <h1
            className="text-foreground  text-4xl sm:text-5xl md:text-5xl lg:text-[110px] 
          font-bold leading-tight sm:leading-tight md:leading-tight lg:leading-[114px] tracking-tight 
          mb-8 sm:mb-16 md:mb-24 lg:mb-40"
          >
            <Image
              src={
                "https://res.cloudinary.com/di2gmbyng/image/upload/v1728723275/wtmvre9ggmv1vdb84rkm.png"
              }
              alt="Discover"
              height={80}
              width={80}
              className="inline-block w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mr-2 align-middle"
            />
            Explore{" "}
            <span className="text-[#7ee0b8] inline-block">
              <AnimatedWord />
            </span>
            <motion.div
              className="inline-flex absolute top-40  items-center justify-center w-5 h-5 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-8 lg:h-8 bg-[#7ee0b8] 
              rounded-full ml-2 cursor-pointer overflow-hidden"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.div variants={arrowVariants}>
                <ArrowRight className="w-6 h-6 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-5 lg:h-5 text-black" />
              </motion.div>
            </motion.div>
            <br />
            Create, collaborate,
            <br />
            {/* <Folder className="inline-block w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-2 align-middle" /> */}
            and get things done.
          </h1>
          <div className="flex justify-center items-center ">
            <RegisterLink>
              <motion.button
                className=" mt-4 px-8 py-3 text-lg font-semibold text-white bg-black rounded-full border-2 border-black transition-colors duration-300 ease-in-out hover:bg-white hover:text-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </RegisterLink>
          </div>
        </div>
      </main>
    </div>
  );
}
