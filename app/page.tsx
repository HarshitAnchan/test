"use client";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";

import UniqueFAQ from "./_components/Faq";
import FontsNinja from "./_components/Hero";
import { HeroVideoDialogDemo } from "./_components/Video";
import { WobbleCardDemo } from "./_components/Feature";
import { SparklesTextDemo } from "./_components/Box";
import JoinUsSection from "./_components/Footer";

export default function Home() {
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log("--", user);
  }, [user]);
  return (
    <div>
      <FontsNinja />
      <HeroVideoDialogDemo />
      <div className="flex justify-center items-center my-8">
        <SparklesTextDemo />
      </div>
      <WobbleCardDemo />
      <UniqueFAQ />
      <JoinUsSection />
    </div>
  );
}
