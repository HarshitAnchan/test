import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

const JoinUsSection: React.FC = () => {
  const signInNow = () => {
    // Implement sign in functionality here
    console.log("Sign in clicked");
  };

  return (
    <>
      <section className="bg-white">
        <div className="max-w-lg bg-white px-4 pt-24 py-8 mx-auto text-left md:max-w-none md:text-center">
          <h1 className="text-3xl font-extrabold leading-10 tracking-tight text-left text-black text-center sm:leading-none md:text-6xl text-4xl lg:text-7xl">
            <span className="inline md:block">Kickstart</span>
            <br />
            <span className="mt-2 md:inline-block">
              {" "}
              Your Collaboration
              <span className="bg-clip-text text-transparent bg-gradient-to-r bg-black">
                {" "}
                <br />
                Journey Today!
              </span>{" "}
            </span>
          </h1>
          <div className="flex justify-center items-center ">
            <RegisterLink>
              <motion.button
                className=" mt-9 px-8 py-3 text-lg font-semibold text-white bg-black rounded-full border-2 border-black transition-colors duration-300 ease-in-out hover:bg-white hover:text-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </RegisterLink>
          </div>
        </div>
      </section>

      <hr className="border-gray-300 mx-5" />

      <footer className="bg-white pb-5">
        <div className="max-w-screen-xl px-4 pt-8 mx-auto sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-black sm:justify-start">
              <img
                className="rounded-full"
                src="/logo-black1.png"
                width="40"
                height="40"
                alt="logo"
              />
              <span className="p-2 font-bold tracking-tighter text-xl">
                Trace.io
              </span>
            </div>

            <p className="mt-4 text-sm text-center text-gray-600 lg:text-right lg:mt-0">
              T&C &nbsp; Career &nbsp; Privacy & Policy &nbsp; Developers
            </p>
          </div>
          <p className="mt-4 text-sm text-center text-gray-600 lg:mt-2">
            © 2024 Trace.io. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default JoinUsSection;
