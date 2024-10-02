// "use client";

// import { Button } from "@/components/ui/button";
// import { Archive, Crown, Flag, Github } from "lucide-react";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import Constant from "@/app/_constant/Constant";
// import PricingDialog from "./PricingDialog";
// import { motion, AnimatePresence } from "framer-motion";

// function SideNavBottomSection({ onFileCreate, totalFiles }: any) {
//   const menuList = [
//     {
//       id: 1,
//       name: "Upgrade",
//       icon: Crown,
//       path: "",
//     },
//   ];
//   const [fileInput, setFileInput] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {menuList.map((menu, index) => (
//         <motion.h2
//           key={index}
//           className="flex gap-2 p-1 px-2 text-[14px]
//           hover:bg-gray-100 rounded-md cursor-pointer"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <menu.icon className="h-5 w-5" />
//           {menu.name}
//         </motion.h2>
//       ))}

//       {/* Add New File Button  */}
//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogTrigger className="w-full" asChild>
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Button
//               className="w-full bg-black
//               hover:bg-gray-700 justify-start mt-3"
//             >
//               New File
//             </Button>
//           </motion.div>
//         </DialogTrigger>
//         <AnimatePresence>
//           {isOpen && (
//             <DialogContent forceMount>
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <DialogHeader>
//                   <DialogTitle>Create New File</DialogTitle>
//                   <DialogDescription>
//                     <Input
//                       placeholder="Enter File Name"
//                       className="mt-3"
//                       onChange={(e) => setFileInput(e.target.value)}
//                     />
//                   </DialogDescription>
//                 </DialogHeader>
//                 <DialogFooter className="">
//                   <DialogClose asChild>
//                     <Button
//                       type="button"
//                       className="bg-black hover:bg-gray-700"
//                       disabled={!(fileInput && fileInput.length > 3)}
//                       onClick={() => onFileCreate(fileInput)}
//                     >
//                       Create
//                     </Button>
//                   </DialogClose>
//                 </DialogFooter>
//               </motion.div>
//             </DialogContent>
//           )}
//         </AnimatePresence>
//         {totalFiles >= Constant.MAX_FREE_FILE && <PricingDialog />}
//       </Dialog>

//       {/* Progress Bar  */}
//       <motion.div
//         className="h-4 w-full bg-gray-200 rounded-full mt-5"
//         initial={{ width: 0 }}
//         animate={{ width: "100%" }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         <motion.div
//           className="h-4 bg-gray-950 rounded-full"
//           initial={{ width: 0 }}
//           animate={{ width: `${(totalFiles / Constant.MAX_FREE_FILE) * 100}%` }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//         ></motion.div>
//       </motion.div>

//       <motion.h2
//         className="text-[12px] mt-3"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.7 }}
//       >
//         <strong>{totalFiles}</strong> out of{" "}
//         <strong>{Constant.MAX_FREE_FILE}</strong> files used
//       </motion.h2>
//       <motion.h2
//         className="text-[12px] mt-1"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.8 }}
//       >
//         Upgrade your plan for unlimited access.
//       </motion.h2>
//     </motion.div>
//   );
// }

// export default SideNavBottomSection;

import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Constant from "@/app/_constant/Constant";
import PricingDialog from "./PricingDialog";
import { motion, AnimatePresence } from "framer-motion";

function SideNavBottomSection({ onFileCreate, totalFiles }: any) {
  const menuList = [
    {
      id: 1,
      name: "Upgrade",
      icon: Crown,
      path: "",
    },
  ];

  const [fileInput, setFileInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false); // State to control PricingDialog

  useEffect(() => {
    // Update progress whenever totalFiles changes
    const calculatedProgress = (totalFiles / Constant.MAX_FREE_FILE) * 100;
    setProgress(calculatedProgress);
  }, [totalFiles]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {menuList.map((menu, index) => (
        <motion.h2
          key={index}
          className="flex gap-2 p-1 px-2 text-[14px] 
          hover:bg-gray-100 rounded-md cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPricingDialogOpen(true)} // Open PricingDialog on click
        >
          <menu.icon className="h-5 w-5" />
          {menu.name}
        </motion.h2>
      ))}

      {/* Add New File Button  */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="w-full" asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="w-full bg-black 
              hover:bg-gray-700 justify-start mt-3"
            >
              New File
            </Button>
          </motion.div>
        </DialogTrigger>
        <AnimatePresence>
          {isOpen && (
            <DialogContent forceMount>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <DialogHeader>
                  <DialogTitle>Create New File</DialogTitle>
                  <DialogDescription>
                    <Input
                      placeholder="Enter File Name"
                      className="mt-3"
                      onChange={(e) => setFileInput(e.target.value)}
                    />
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      className="bg-black hover:bg-gray-700"
                      disabled={!(fileInput && fileInput.length > 3)}
                      onClick={() => {
                        onFileCreate(fileInput);
                        setIsOpen(false); // Close the dialog after creating the file
                      }}
                    >
                      Create
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
        {totalFiles >= Constant.MAX_FREE_FILE && <PricingDialog />}
      </Dialog>

      {/* Progress Bar */}
      <motion.div
        className="h-4 w-full bg-gray-200 rounded-full mt-5"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="h-4 bg-gray-950 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, delay: 0.5 }}
        ></motion.div>
      </motion.div>

      <motion.h2
        className="text-[12px] mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <strong>{totalFiles}</strong> out of{" "}
        <strong>{Constant.MAX_FREE_FILE}</strong> files used
      </motion.h2>
      <motion.h2
        className="text-[12px] mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Upgrade your plan for unlimited access.
      </motion.h2>

      {/* Pricing Dialog */}
      {isPricingDialogOpen && (
        <Dialog
          open={isPricingDialogOpen}
          onOpenChange={setIsPricingDialogOpen}
        >
          <PricingDialog />
        </Dialog>
      )}
    </motion.div>
  );
}

export default SideNavBottomSection;
