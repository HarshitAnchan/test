"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import PricingDialog from "./PricingDialog";

const MAX_FREE_FILES = 5; // Replace with actual constant from Constant.MAX_FREE_FILE

interface SideNavBottomSectionProps {
  onFileCreate: (fileName: string) => void;
  totalFiles: number;
}

export default function SideNavBottomSection({
  onFileCreate,
  totalFiles,
}: SideNavBottomSectionProps) {
  const [fileInput, setFileInput] = useState("");
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false);
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculatedProgress = (totalFiles / MAX_FREE_FILES) * 100;
    setProgress(calculatedProgress);
  }, [totalFiles]);

  const handleFileCreate = () => {
    if (fileInput.length > 3) {
      onFileCreate(fileInput);
      setFileInput("");
      setIsNewFileDialogOpen(false);
    }
  };

  const menuList = [
    {
      id: 1,
      name: "Upgrade",
      icon: Crown,
      action: () => setIsPricingDialogOpen(true),
    },
  ];

  return (
    <Card className="mt-auto">
      <CardContent className="p-4 space-y-4">
        {menuList.map((menu) => (
          <Button
            key={menu.id}
            variant="ghost"
            className="w-full justify-start"
            onClick={menu.action}
          >
            <menu.icon className="mr-2 h-4 w-4" />
            {menu.name}
          </Button>
        ))}

        <Dialog
          open={isNewFileDialogOpen}
          onOpenChange={setIsNewFileDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="w-full">New File</Button>
          </DialogTrigger>
          <AnimatePresence>
            {isNewFileDialogOpen && (
              <DialogContent forceMount>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <DialogHeader>
                    <DialogTitle>Create New File</DialogTitle>
                    <DialogDescription>
                      Enter a name for your new file.
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    placeholder="Enter File Name"
                    value={fileInput}
                    onChange={(e) => setFileInput(e.target.value)}
                    className="my-4"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      onClick={handleFileCreate}
                      disabled={fileInput.length <= 3}
                    >
                      Create
                    </Button>
                  </DialogFooter>
                </motion.div>
              </DialogContent>
            )}
          </AnimatePresence>
        </Dialog>

        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            <strong>{totalFiles}</strong> out of{" "}
            <strong>{MAX_FREE_FILES}</strong> files used
          </p>
          <p className="text-sm text-muted-foreground">
            Upgrade your plan for unlimited access.
          </p>
        </div>

        <Dialog
          open={isPricingDialogOpen}
          onOpenChange={setIsPricingDialogOpen}
        >
          <PricingDialog />
        </Dialog>
      </CardContent>
    </Card>
  );
}
