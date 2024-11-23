"use client";

import { useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Bell } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SimpleComingSoon from "@/app/_components/CommingSoon";

export default function Header() {
  const { user }: any = useKindeBrowserClient();
  const [notifications, setNotifications] = useState(3); // Example notification count
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between w-full items-center p-4 bg-white shadow-sm">
        <div className="flex-1 max-w-md">
          {/* This div is kept for layout purposes, you can remove it if not needed */}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsDialogOpen(true)}
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <div className="absolute -top-1 -right-1">
                <Badge
                  variant="destructive"
                  className="px-1 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full"
                >
                  {notifications}
                </Badge>
              </div>
            )}
          </Button>

          <div className="relative">
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
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] p-6 bg-white text-black rounded-lg shadow-lg">
          <SimpleComingSoon />
        </DialogContent>
      </Dialog>
    </>
  );
}
