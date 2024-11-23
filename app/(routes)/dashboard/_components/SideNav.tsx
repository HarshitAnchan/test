// import { Archive, ChevronDown, Flag, Github } from "lucide-react";
// import Image from "next/image";
// import React, { useContext, useEffect, useState } from "react";
// import SideNavTopSection, { TEAM } from "./SideNavTopSection";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import SideNavBottomSection from "./SideNavBottomSection";
// import { useConvex, useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { toast } from "sonner";
// import { FileListContext } from "@/app/_context/FilesListContext";

// function SideNav() {
//   const { user }: any = useKindeBrowserClient();
//   const createFile = useMutation(api.files.createFile);
//   const [activeTeam, setActiveTeam] = useState<TEAM | any>();
//   const convex = useConvex();

//   // Use number type for totalFiles state
//   const [totalFiles, setTotalFiles] = useState<number>(0); // Initialize with 0
//   const { fileList_, setFileList_ } = useContext(FileListContext);

//   useEffect(() => {
//     if (activeTeam) {
//       getFiles();
//     }
//   }, [activeTeam]);

//   const onFileCreate = (fileName: string) => {
//     console.log(fileName);
//     createFile({
//       fileName: fileName,
//       teamId: activeTeam?._id,
//       createdBy: user?.email,
//       archive: false,
//       document: "",
//       whiteboard: "",
//     }).then(
//       (resp) => {
//         if (resp) {
//           getFiles();
//           toast("File created successfully!");
//         }
//       },
//       (e) => {
//         toast("Error while creating file");
//       }
//     );
//   };

//   const getFiles = async () => {
//     const result = await convex.query(api.files.getFiles, {
//       teamId: activeTeam?._id,
//     });
//     console.log(result);
//     setFileList_(result);
//     setTotalFiles(result?.length ?? 0); // Ensure totalFiles is always a number
//   };

//   return (
//     <div
//       className=" h-screen
//     fixed w-72 borde-r border-[1px] p-6
//     flex flex-col
//     "
//     >
//       <div className="flex-1">
//         <SideNavTopSection
//           user={user}
//           setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
//         />
//       </div>
//       //FileConverter Add
//       <div>
//         {/* Ensure totalFiles is passed as a number */}
//         <SideNavBottomSection
//           totalFiles={totalFiles}
//           onFileCreate={onFileCreate}
//         />
//       </div>
//     </div>
//   );
// }

// export default SideNav;
"use client";

import { Archive, ChevronDown, Flag, Github, Upload } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FilesListContext";
import FileUploadModal from "./file-upload-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function SideNav() {
  const { user }: any = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<TEAM | any>();
  const convex = useConvex();

  const [totalFiles, setTotalFiles] = useState<number>(0);
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    if (activeTeam) {
      getFiles();
    }
  }, [activeTeam]);

  const onFileCreate = (fileName: string) => {
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteboard: "",
    }).then(
      (resp) => {
        if (resp) {
          getFiles();
          toast("File created successfully!");
        }
      },
      () => {
        toast("Error while creating file");
      }
    );
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id,
    });
    setFileList_(result);
    setTotalFiles(result?.length ?? 0);
  };

  return (
    <div className="h-screen fixed w-72 border-r border-[1px] p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <Upload className="mr-2 h-4 w-4" />
              File Converter
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem
              onClick={() => {
                setIsUploadModalOpen(true);
              }}
            >
              <Upload className="mr-2 h-4 w-4" />
              <span>Upload file</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <SideNavBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
        />
      </div>
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          document.body.style.overflow = ""; // Ensure body styles are reset
        }}
      />
    </div>
  );
}

export default SideNav;
