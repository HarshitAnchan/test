import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Bell, Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"; // Add this import
import SimpleComingSoon from "@/app/_components/CommingSoon";

function Header() {
  const { user }: any = useKindeBrowserClient();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Add this state

  return (
    <>
      <motion.div
        className="flex justify-between w-full items-center p-4 bg-white shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="flex-1 max-w-md" whileHover={{ scale: 1.02 }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 w-full rounded-full transition-all duration-300 ${
                isSearchFocused ? "bg-white shadow-md" : "bg-gray-100"
              }`}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </motion.div>

        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsDialogOpen(true)} // Open dialog on bell click
            >
              <Bell className="h-5 w-5" />

              <AnimatePresence>
                {notifications > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge
                      variant="destructive"
                      className="px-1 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full"
                    >
                      {notifications}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {user?.picture ? (
              <Image
                src={user.picture}
                alt="user"
                width={40}
                height={40}
                className="rounded-full border-2 border-gray-200"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 font-semibold">
                  {user?.given_name?.[0]}
                </span>
              </div>
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Dialog for "Coming Soon" */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="  max-h-[90vh]  p-6 bg-white text-black rounded-lg shadow-lg">
          <SimpleComingSoon />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;
