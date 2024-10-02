"use client";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";
import GlassHeader from "./_components/Header";
import AbstractArtFeatures from "./_components/Feature";
import HowItWorks from "./_components/Works";
import InnovativeHowItWorks from "./_components/Works";
import UniqueFAQ from "./_components/Faq";
import AnimatedFooter from "./_components/Footer";

export default function Home() {
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log("--", user);
  }, [user]);
  return (
    <div>
      <GlassHeader />
      <Hero />
      <AbstractArtFeatures />
      <InnovativeHowItWorks />
      <UniqueFAQ />
      <AnimatedFooter />
    </div>
  );
}
