"use client";

import Image from "next/image";
import Link from "next/link";
import { nanoid } from "nanoid";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

const Navbar = () => {
  return (
    <Card className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-card/80 backdrop-blur-sm py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5 max-w-7xl w-[95%] z-50">
      <div className="flex items-center gap-2">
        <Image
          src="/logo-black1.png"
          alt="logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <span className="font-semibold text-lg">Trace.io</span>
      </div>
      <ul className="hidden md:flex items-center justify-center flex-1 gap-10 text-card-foreground">
        <li className="text-primary font-medium">
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#features">Features</a>
        </li>

        <li>
          <a href="#faqs">FAQs</a>
        </li>
      </ul>

      <div className="flex items-center">
        <LoginLink>
          <Button variant="secondary" className="hidden md:block px-2">
            Login
          </Button>
        </LoginLink>
        <RegisterLink>
          <Button className="hidden md:block ml-2 mr-2">Get Started</Button>
        </RegisterLink>
        <div className="flex md:hidden mr-2 items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="py-2 px-2 bg-gray-100 rounded-md">Pages</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              {landings.map((page) => (
                <DropdownMenuItem key={page.id}>
                  <Link href={page.route}>{page.title}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5 rotate-0 scale-100" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <a href="#home">Home</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#features">Features</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#pricing">Pricing</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#faqs">FAQs</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="secondary" className="w-full text-sm">
                  Login
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button className="w-full text-sm">Get Started</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};

const landings = [
  {
    id: nanoid(),
    title: "Landing 01",
    route: "/project-management",
  },
  {
    id: nanoid(),
    title: "Landing 02",
    route: "/crm-landing",
  },
  {
    id: nanoid(),
    title: "Landing 03",
    route: "/ai-content-landing",
  },
  {
    id: nanoid(),
    title: "Landing 04",
    route: "/new-intro-landing",
  },
  {
    id: nanoid(),
    title: "Landing 05",
    route: "/about-us-landing",
  },
  {
    id: nanoid(),
    title: "Landing 06",
    route: "/contact-us-landing",
  },
  {
    id: nanoid(),
    title: "Landing 07",
    route: "/faqs-landing",
  },
  {
    id: nanoid(),
    title: "Landing 08",
    route: "/pricing-landing",
  },
  {
    id: nanoid(),
    title: "Landing 09",
    route: "/career-landing",
  },
];

export default Navbar;