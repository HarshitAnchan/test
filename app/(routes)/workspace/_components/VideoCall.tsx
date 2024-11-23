"use client";

import React, { useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DailyCall } from "@daily-co/daily-js";
import DailyIframe from "@daily-co/daily-js";

interface VideoCallProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoCall({ isOpen, onClose }: VideoCallProps) {
  const videoCallRef = useRef<HTMLDivElement>(null);

  // Get the room URL from the environment variable
  const roomUrl = process.env.NEXT_PUBLIC_DAILY_ROOM_URL;

  useEffect(() => {
    if (isOpen && videoCallRef.current && roomUrl) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@daily-co/daily-js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.DailyIframe) {
          const frame = window.DailyIframe.createFrame(videoCallRef.current, {
            iframeStyle: {
              position: "relative",
              width: "100%",
              height: "100%",
              border: "0",
              zIndex: 1,
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          });

          // Use the room URL from the environment variable
          (frame as DailyCall).join({ url: roomUrl });
        }
      };

      // Clean up script when component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen, roomUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Rnd
        default={{
          x: window.innerWidth / 2 - 400,
          y: window.innerHeight / 2 - 300,
          width: 800,
          height: 600,
        }}
        minWidth={320}
        minHeight={240}
        bounds="window"
        dragHandleClassName="video-call-drag-handle"
        className="pointer-events-auto"
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full h-full flex flex-col">
          <div className="video-call-drag-handle flex justify-between items-center p-2 bg-gray-100 cursor-move">
            <span className="font-semibold">Video Call</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-grow" ref={videoCallRef}></div>
        </div>
      </Rnd>
    </div>
  );
}
