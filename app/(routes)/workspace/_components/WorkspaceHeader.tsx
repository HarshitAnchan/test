"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, Link, Copy, Check, X, Mail } from "lucide-react";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function WorkspaceHeader({ onSave }: { onSave: () => void }) {
  const { user }: any = useKindeBrowserClient();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent("Check out this page");
    const body = encodeURIComponent(
      `I thought you might be interested in this: ${url}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`Check out this page: ${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="p-3 border-b">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image src="/logo-black1.png" alt="logo" height={40} width={40} />
          <h2 className="text-lg font-semibold">File Name</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="h-8 text-[12px] gap-2 bg-yellow-500 hover:bg-yellow-600 text-white"
            onClick={onSave}
          >
            <Save className="h-4 w-4" /> Save
          </Button>
          <Button
            className="h-8 text-[12px] gap-2 bg-black hover:bg-gray-800 text-white"
            onClick={() => setIsShareOpen(true)}
          >
            Share <Link className="h-4 w-4" />
          </Button>
          {user && (
            <div className="flex items-center gap-2">
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt="user"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-gray-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 font-semibold text-sm">
                    {user.given_name?.[0]}
                  </span>
                </div>
              )}
              {/* Removed the user's name display */}
              {/* <span className="text-sm font-medium hidden sm:inline">
                {user.given_name}
              </span> */}
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isShareOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Share this page
                </h3>
                <Button
                  className="h-8 w-8 p-0 bg-gray-100 hover:bg-gray-200 rounded-full"
                  onClick={() => setIsShareOpen(false)}
                >
                  <X className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
              <div className="bg-gray-100 rounded-md p-3 flex items-center mb-4">
                <div className="flex-grow mr-2 text-gray-700 text-sm truncate">
                  {url}
                </div>
                <Button
                  className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 rounded-md overflow-hidden"
                  onClick={copyToClipboard}
                >
                  <motion.div
                    animate={{
                      scale: isCopied ? [1, 0.8, 1] : 1,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : (
                      <Copy className="h-4 w-4 text-white" />
                    )}
                  </motion.div>
                </Button>
              </div>
              <div className="flex gap-3 mt-4">
                <Button
                  className="flex-1 h-10 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center gap-2"
                  onClick={shareViaWhatsApp}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </Button>
                <Button
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center gap-2"
                  onClick={shareViaEmail}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
