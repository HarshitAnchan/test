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

function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const createTeam = useMutation(api.teams.createTeam);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const createNewTeam = () => {
    createTeam({
      teamName: teamName,
      createdBy: user?.email,
    }).then((resp) => {
      console.log(resp);
      if (resp) {
        router.push("/dashboard");
        toast("Team created successfully!!!");
      }
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="relative z-10 bg-black bg-opacity-80 p-8 rounded-lg shadow-2xl max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Image
            src="/logo-black1.png"
            alt="logo"
            width={150}
            height={150}
            className="invert mx-auto"
          />
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center">Create Your Team</h2>
          <p className="text-gray-300 text-center">
            Choose a name that represents your team's vision and goals.
          </p>
          <div>
            <label
              htmlFor="teamName"
              className="text-sm font-medium text-gray-300 block mb-2"
            >
              Team Name
            </label>
            <Input
              id="teamName"
              placeholder="Enter team name"
              className="bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder-gray-500"
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300"
              disabled={!(teamName && teamName?.length > 0)}
              onClick={() => createNewTeam()}
            >
              Create Team
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CreateTeam;
