"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Dropzone from "./Dropzone";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FileUploadModal({
  isOpen,
  onClose,
}: FileUploadModalProps) {
  useEffect(() => {
    // Reset body styles when the component unmounts or when the modal closes
    return () => {
      document.body.style.pointerEvents = "";
    };
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      // Delay resetting pointer-events to ensure the modal is fully closed
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      }, 100);
    } else {
      // Prevent clicks on the body when the modal is open
      document.body.style.pointerEvents = "none";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-[850px]"
        style={{
          pointerEvents: "auto", // Ensure the modal content is clickable
        }}
      >
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <Dropzone />
      </DialogContent>
    </Dialog>
  );
}
