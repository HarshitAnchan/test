import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export interface TEAM {
  createdBy: String;
  teamName: String;
  _id: String;
}

function SideNavTopSection({ user, setActiveTeamInfo }: any) {
  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
  ];
  const router = useRouter();
  const convex = useConvex();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [teamList, setTeamList] = useState<TEAM[]>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    user && getTeamList();
  }, [user]);

  useEffect(() => {
    activeTeam ? setActiveTeamInfo(activeTeam) : null;
  }, [activeTeam]);

  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    console.log("TeamList", result);
    setTeamList(result);
    setActiveTeam(result[0]);
  };

  const onMenuClick = (item: any) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <motion.div
            className="flex items-center gap-3 hover:bg-slate-200 p-3 rounded-lg cursor-pointer transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src="/logo-black1.png" alt="logo" width={40} height={40} />
            <h2 className="flex gap-2 items-center font-bold text-[17px]">
              {activeTeam?.teamName}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown />
              </motion.div>
            </h2>
          </motion.div>
        </PopoverTrigger>
        <PopoverContent className="ml-7 p-4 w-64 shadow-lg rounded-xl">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Team Section */}
                <div className="space-y-1 mb-2">
                  {teamList?.map((team, index) => (
                    <motion.h2
                      key={index}
                      className={`p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200 ${
                        activeTeam?._id == team._id
                          ? "bg-gray-200 font-semibold"
                          : ""
                      }`}
                      onClick={() => setActiveTeam(team)}
                      whileHover={{ x: 5 }}
                    >
                      {team.teamName}
                    </motion.h2>
                  ))}
                </div>
                <Separator className="my-2" />
                {/* Option Section */}
                <div className="space-y-1 mb-2">
                  {menu.map((item, index) => (
                    <motion.h2
                      key={index}
                      className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm transition-colors duration-200"
                      onClick={() => onMenuClick(item)}
                      whileHover={{ x: 5 }}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </motion.h2>
                  ))}
                  <LogoutLink>
                    <motion.h2
                      className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm transition-colors duration-200"
                      whileHover={{ x: 5 }}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </motion.h2>
                  </LogoutLink>
                </div>
                <Separator className="my-2" />
                {/* User Info Section */}
                {user && (
                  <motion.div
                    className="mt-2 flex gap-2 items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Image
                      src={user?.picture}
                      alt="user"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <div>
                      <h2 className="text-[14px] font-bold">
                        {user?.given_name} {user?.family_name}
                      </h2>
                      <h2 className="text-[12px] text-gray-500">
                        {user?.email}
                      </h2>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </PopoverContent>
      </Popover>

      {/* All File Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Button
          variant="outline"
          className="w-full justify-start gap-2 font-bold mt-8 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <LayoutGrid className="h-5 w-5" />
          All Files
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default SideNavTopSection;
