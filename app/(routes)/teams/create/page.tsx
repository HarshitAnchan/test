"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface User {
  email?: string;
  given_name?: string;
  family_name?: string;
}

function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const createTeam = useMutation(api.teams.createTeam);
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const createNewTeam = () => {
    if (user?.email) {
      setIsLoading(true);
      createTeam({
        teamName: teamName,
        createdBy: user.email,
      })
        .then((resp) => {
          if (resp) {
            router.push("/dashboard");
            toast.success("Team created successfully!");
          }
        })
        .catch((error) => {
          toast.error("Failed to create team. Please try again.");
          console.error("Team creation error:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error("User email not available. Please ensure you're logged in.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo-black1.png"
                alt="logo"
                width={100}
                height={100}
                className="mx-auto"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Create Your Team
            </CardTitle>
            <CardDescription className="text-center">
              Choose a name that represents your team's vision and goals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                placeholder="Enter team name"
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <Button
              className="w-full"
              disabled={!teamName.trim() || isLoading}
              onClick={createNewTeam}
            >
              {isLoading ? "Creating..." : "Create Team"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default CreateTeam;
