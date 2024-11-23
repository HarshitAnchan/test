"use client";

import { FileListContext } from "@/app/_context/FilesListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Trash2,
  FileText,
  Calendar,
  User,
  Search,
  Edit2,
  Plus,
  SortAsc,
  SortDesc,
  Grid,
  List,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export default function Component() {
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<FILE[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const deleteFile = useMutation(api.files.deleteFile);

  useEffect(() => {
    if (fileList_) {
      setFileList(fileList_);
    }
  }, [fileList_]);

  const handleDelete = async (fileId: string) => {
    try {
      await deleteFile({ _id: fileId } as any);
      toast.success("File deleted successfully!");
      setFileList(fileList.filter((file) => file._id !== fileId));
    } catch (error) {
      toast.error("Error while deleting file");
      console.error(error);
    }
  };

  const handleEdit = useMemo(
    () => (fileId: string) => {
      router.push(`/workspace/${fileId}`);
    },
    [router]
  );

  const filteredFiles = useMemo(
    () =>
      fileList
        .filter((file) =>
          file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          const dateA = new Date(a._creationTime).getTime();
          const dateB = new Date(b._creationTime).getTime();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        }),
    [fileList, searchTerm, sortOrder]
  );

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  return (
    <div className="p-6 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Your Files</h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleSortOrder}
                  >
                    {sortOrder === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleViewMode}
                  >
                    {viewMode === "grid" ? (
                      <List className="h-4 w-4" />
                    ) : (
                      <Grid className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{viewMode === "grid" ? "List View" : "Grid View"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <AnimatePresence>
          {filteredFiles.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-muted-foreground mt-10"
            >
              No files found. Try a different search term or create a new file.
            </motion.p>
          ) : (
            <motion.div
              className={
                viewMode === "grid"
                  ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "space-y-4"
              }
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {filteredFiles.map((file) => (
                <motion.div
                  key={file._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className={viewMode === "list" ? "flex" : ""}>
                    <div className={viewMode === "list" ? "flex-grow" : ""}>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center space-x-3 text-lg">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="truncate">{file.fileName}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          {moment(file._creationTime).format("DD MMM YYYY")}
                        </div>
                        {user && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="h-4 w-4 mr-2" />
                            <Image
                              src={user?.picture}
                              alt="user"
                              width={20}
                              height={20}
                              className="rounded-full mr-2"
                            />
                            <span>{user.given_name}</span>
                          </div>
                        )}
                      </CardContent>
                    </div>
                    <CardFooter className="flex justify-between items-center gap-2">
                      <div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(file._id)}
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to delete this file?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(file._id)}
                            >
                              Yes, delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
