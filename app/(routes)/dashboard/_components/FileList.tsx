// import { FileListContext } from "@/app/_context/FilesListContext";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import { Archive, MoreHorizontal, File } from "lucide-react";
// import moment from "moment";
// import Image from "next/image";
// import React, { useContext, useEffect, useState } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// export interface FILE {
//   archive: boolean;
//   createdBt: string;
//   document: string;
//   fileName: string;
//   teamId: string;
//   whiteboard: string;
//   _id: string;
//   _creationTime: number;
// }

// function FileList() {
//   const { fileList_, setFileList_ } = useContext(FileListContext);
//   const [fileList, setFileList] = useState<any>();
//   const { user }: any = useKindeBrowserClient();
//   const router = useRouter();

//   useEffect(() => {
//     fileList_ && setFileList(fileList_);
//     console.log(fileList_);
//   }, [fileList_]);

//   const tableVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 },
//   };

//   return (
//     <motion.div
//       className="mt-10 bg-white rounded-lg shadow-lg overflow-hidden"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.table
//         className="min-w-full divide-y divide-gray-200"
//         variants={tableVariants}
//         initial="hidden"
//         animate="show"
//       >
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               File Name
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Created At
//             </th>

//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Author
//             </th>
//           </tr>
//         </thead>

//         <tbody className="bg-white divide-y divide-gray-200">
//           {fileList &&
//             fileList.map((file: FILE, index: number) => (
//               <motion.tr
//                 key={index}
//                 className="hover:bg-gray-50 transition-colors duration-150 ease-in-out cursor-pointer"
//                 onClick={() => router.push("/workspace/" + file._id)}
//                 variants={itemVariants}
//               >
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <File className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
//                     <div className="text-sm font-medium text-gray-900">
//                       {file.fileName}
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {moment(file._creationTime).format("DD MMM YYYY")}
//                 </td>

//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {user && (
//                     <div className="flex items-center">
//                       <Image
//                         src={user?.picture}
//                         alt="user"
//                         width={30}
//                         height={30}
//                         className="rounded-full mr-2"
//                       />
//                       <div className="text-sm text-gray-900">
//                         {user.given_name}
//                       </div>
//                     </div>
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger className="text-gray-400 hover:text-gray-500">
//                       <MoreHorizontal className="h-5 w-5" />
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem className="flex items-center gap-2 text-gray-700 hover:bg-gray-100">
//                         <Archive className="h-4 w-4" /> Archive
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </td>
//               </motion.tr>
//             ))}
//         </tbody>
//       </motion.table>
//     </motion.div>
//   );
// }

// export default FileList;

import { FileListContext } from "@/app/_context/FilesListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { MoreHorizontal, File, Trash } from "lucide-react"; // Import Trash icon
import moment from "moment";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}

function FileList() {
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  // Mutation to delete a file
  const deleteFile = useMutation(api.files.deleteFile);

  useEffect(() => {
    fileList_ && setFileList(fileList_);
    console.log(fileList_);
  }, [fileList_]);

  const handleDelete = async (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await deleteFile({ _id: fileId } as any); // Cast to any
      toast("File deleted successfully!");

      // Optionally update the file list locally after deletion
      setFileList(fileList?.filter((file: FILE) => file._id !== fileId));
    } catch (error) {
      toast("Error while deleting file");
      console.error(error);
    }
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="mt-10 bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.table
        className="min-w-full divide-y divide-gray-200"
        variants={tableVariants}
        initial="hidden"
        animate="show"
      >
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              File Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {fileList &&
            fileList.map((file: FILE, index: number) => (
              <motion.tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-150 ease-in-out cursor-pointer"
                onClick={() => router.push("/workspace/" + file._id)} // Navigate to file workspace
                variants={itemVariants}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <File className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                    <div className="text-sm font-medium text-gray-900">
                      {file.fileName}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {moment(file._creationTime).format("DD MMM YYYY")}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {user && (
                    <div className="flex items-center">
                      <Image
                        src={user?.picture}
                        alt="user"
                        width={30}
                        height={30}
                        className="rounded-full mr-2"
                      />
                      <div className="text-sm text-gray-900">
                        {user.given_name}
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-gray-400 hover:text-gray-500">
                      <MoreHorizontal className="h-5 w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="flex items-center gap-2 text-gray-700 hover:bg-gray-100"
                        onClick={(e) => handleDelete(file._id, e)} // Handle delete
                      >
                        <Trash className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </motion.tr>
            ))}
        </tbody>
      </motion.table>
    </motion.div>
  );
}

export default FileList;
