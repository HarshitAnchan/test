// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Save,
//   Link2,
//   Copy,
//   Check,
//   X,
//   Mail,
//   Share2,
//   ArrowLeft,
// } from "lucide-react";
// import Image from "next/image";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import Link from "next/link";

// export default function WorkspaceHeader({ onSave }: { onSave: () => void }) {
//   const { user }: any = useKindeBrowserClient();
//   const [isShareOpen, setIsShareOpen] = useState(false);
//   const [isCopied, setIsCopied] = useState(false);
//   const [shareMethod, setShareMethod] = useState<"link" | "email" | null>(null);
//   const url = typeof window !== "undefined" ? window.location.href : "";

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(url);
//     setIsCopied(true);
//     setTimeout(() => setIsCopied(false), 2000);
//   };

//   const shareViaEmail = () => {
//     const subject = encodeURIComponent("Check out this workspace");
//     const body = encodeURIComponent(
//       `I thought you might be interested in this workspace: ${url}`
//     );
//     window.location.href = `mailto:?subject=${subject}&body=${body}`;
//   };

//   return (
//     <div className="p-2 sm:p-4 border-b bg-white shadow-sm">
//       <div className="flex justify-between items-center  mx-auto relative">
//         {/* Back arrow positioned absolutely to the left */}
//         <div className="flex items-center gap-6">
//           <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
//             <ArrowLeft className="h-5 w-5" />
//           </Link>
//         </div>

//         {/* Centered workspace title */}
//         <div className="flex-1 flex  items-center gap-3">
//           <div className="flex gap-3 items-center">
//             <Image
//               src="/logo-black1.png"
//               alt="logo"
//               height={36}
//               width={36}
//               className="rounded-md"
//             />
//             <h2 className="text-xl font-semibold text-gray-800 hidden sm:inline">
//               Workspace
//             </h2>
//           </div>
//         </div>

//         {/* Right-aligned actions */}
//         <div className="flex items-center gap-4">
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="text-sm gap-2 border-gray-300 hover:bg-gray-100 hover:text-gray-900"
//                   onClick={onSave}
//                 >
//                   <Save className="h-4 w-4" />
//                   <span className="hidden sm:inline">Save</span>
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Save changes</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>

//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="text-sm gap-2 border-gray-300 hover:bg-gray-100 hover:text-gray-900"
//                   onClick={() => setIsShareOpen(true)}
//                 >
//                   <Share2 className="h-4 w-4" />
//                   <span className="hidden sm:inline">Share</span>
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Share workspace</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>

//           {user && (
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <div className="flex items-center gap-2 cursor-pointer">
//                     {user.picture ? (
//                       <Image
//                         src={user.picture}
//                         alt="User avatar"
//                         width={32}
//                         height={32}
//                         className="rounded-full border-2 border-gray-200"
//                       />
//                     ) : (
//                       <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//                         <span className="text-gray-600 font-semibold text-sm">
//                           {user.given_name?.[0]}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>{user.email}</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           )}
//         </div>
//       </div>

//       <AnimatePresence>
//         {isShareOpen && (
//           <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
//             <DialogContent className="sm:max-w-md">
//               <DialogHeader>
//                 <DialogTitle>Share Workspace</DialogTitle>
//               </DialogHeader>
//               <div className="flex flex-col gap-4">
//                 <div className="flex gap-2">
//                   <Button
//                     variant={shareMethod === "link" ? "default" : "outline"}
//                     className="flex-1"
//                     onClick={() => setShareMethod("link")}
//                   >
//                     <Link2 className="mr-2 h-4 w-4" />
//                     Link
//                   </Button>
//                   <Button
//                     variant={shareMethod === "email" ? "default" : "outline"}
//                     className="flex-1"
//                     onClick={() => setShareMethod("email")}
//                   >
//                     <Mail className="mr-2 h-4 w-4" />
//                     Email
//                   </Button>
//                 </div>

//                 <AnimatePresence mode="wait">
//                   {shareMethod === "link" && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       transition={{ duration: 0.2 }}
//                       className="flex items-center"
//                     >
//                       <Input value={url} readOnly className="flex-grow mr-2" />
//                       <Button
//                         size="icon"
//                         variant="outline"
//                         onClick={copyToClipboard}
//                         className="flex-shrink-0"
//                       >
//                         <motion.div
//                           animate={{
//                             scale: isCopied ? [1, 0.8, 1] : 1,
//                           }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           {isCopied ? (
//                             <Check className="h-4 w-4" />
//                           ) : (
//                             <Copy className="h-4 w-4" />
//                           )}
//                         </motion.div>
//                       </Button>
//                     </motion.div>
//                   )}

//                   {shareMethod === "email" && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <Input
//                         type="email"
//                         placeholder="Enter recipient's email"
//                         className="mb-2"
//                       />
//                       <Button onClick={shareViaEmail} className="w-full">
//                         Send Email
//                       </Button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </DialogContent>
//           </Dialog>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Save,
  Link2,
  Copy,
  Check,
  Mail,
  Share2,
  ArrowLeft,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

interface WorkspaceHeaderProps {
  onSave: () => void;
  onShare: () => void;
  onVideoCall: () => void;
}

export default function WorkspaceHeader({
  onSave,
  onShare,
  onVideoCall,
}: WorkspaceHeaderProps) {
  const { user }: any = useKindeBrowserClient();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [shareMethod, setShareMethod] = useState<"link" | "email" | null>(null);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent("Check out this workspace");
    const body = encodeURIComponent(
      `I thought you might be interested in this workspace: ${url}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="p-2 sm:p-4 border-b bg-white shadow-sm">
      <div className="flex justify-between items-center mx-auto relative">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>

        <div className="flex-1 flex items-center gap-3">
          <div className="flex gap-3 items-center">
            <Image
              src="/logo-black1.png"
              alt="logo"
              height={36}
              width={36}
              className="rounded-md"
            />
            <h2 className="text-xl font-semibold text-gray-800 hidden sm:inline">
              Workspace
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm gap-2 border-gray-300 hover:bg-gray-100 hover:text-gray-900"
                  onClick={onSave}
                >
                  <Save className="h-4 w-4" />
                  <span className="hidden sm:inline">Save</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save changes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm gap-2 border-gray-300 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setIsShareOpen(true)}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share workspace</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm gap-2 border-gray-300 hover:bg-gray-100 hover:text-gray-900"
                  onClick={onVideoCall}
                >
                  <Video className="h-4 w-4" />
                  <span className="hidden sm:inline">Video Call</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start video call</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {user && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    {user.picture ? (
                      <Image
                        src={user.picture}
                        alt="User avatar"
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-semibold text-sm">
                          {user.given_name?.[0]}
                        </span>
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.email}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isShareOpen && (
          <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share Workspace</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <Button
                    variant={shareMethod === "link" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setShareMethod("link")}
                  >
                    <Link2 className="mr-2 h-4 w-4" />
                    Link
                  </Button>
                  <Button
                    variant={shareMethod === "email" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setShareMethod("email")}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>

                <AnimatePresence mode="wait">
                  {shareMethod === "link" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center"
                    >
                      <Input value={url} readOnly className="flex-grow mr-2" />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={copyToClipboard}
                        className="flex-shrink-0"
                      >
                        <motion.div
                          animate={{
                            scale: isCopied ? [1, 0.8, 1] : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {isCopied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </motion.div>
                      </Button>
                    </motion.div>
                  )}

                  {shareMethod === "email" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Input
                        type="email"
                        placeholder="Enter recipient's email"
                        className="mb-2"
                      />
                      <Button onClick={shareViaEmail} className="w-full">
                        Send Email
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
