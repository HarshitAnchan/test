import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const navigationItems = [
  {
    title: "Product",
    items: [
      { title: "Features", href: "/features" },
      { title: "Integrations", href: "/integrations" },
      { title: "Pricing", href: "/pricing" },
      { title: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Blog", href: "/blog" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Documentation", href: "/docs" },
      { title: "Help Center", href: "/help" },
      { title: "Guides", href: "/guides" },
      { title: "API Reference", href: "/api" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Privacy", href: "/privacy" },
      { title: "Terms", href: "/terms" },
      { title: "Security", href: "/security" },
      { title: "Cookies", href: "/cookies" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Instagram, href: "https://instagram.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
];

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-bold text-white">
              Trace.io
            </Link>
            <p className="mt-4 text-sm">
              Transforming collaboration with AI-powered tools for real-time
              document editing, whiteboarding, and seamless communication.
            </p>
            <div className="mt-6 flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <span className="sr-only">{item.icon.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          {navigationItems.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-4">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-base hover:text-white transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} Trace.io. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/privacy"
              className="text-base hover:text-white transition-colors duration-200 mr-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-base hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
