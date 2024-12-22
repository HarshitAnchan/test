"use client";
import Image from "next/image";
import Header from "./_components/Header";
// import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";

import { FAQ } from "./_components/Faq";
import { Hero } from "./_components/Hero";
import { HeroVideoDialogDemo } from "./_components/Video";
import { FeatureSection } from "./_components/Feature";
import { Footer } from "./_components/Footer";
import Navbar from "./_components/Navbar";

export default function Home() {
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log("--", user);
  }, [user]);
  return (
    <div>
      <Navbar />
      <Hero />
      <HeroVideoDialogDemo />

      <FeatureSection />
      <FAQ />
      <Footer />
      {/* <JoinUsSection /> */}
    </div>
  );
}
