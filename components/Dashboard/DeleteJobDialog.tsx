"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteJob } from "@/lib/actions/jobs";

interface Job {
  _id: string;
  jobTitle: string;
}

export function DeleteJobDialog({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteJob(job._id);
      setOpen(false); 
      router.refresh(); 
    } catch (error) {
      console.error(error);
      alert("Failed to delete job");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="p-2 text-zinc-500 hover:text-red-400 bg-zinc-900 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
          title="Delete Job"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </DialogTrigger>
      
      <DialogContent className="bg-[#0c0c0f] border-zinc-800 text-white sm:max-w-[425px]">
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <DialogTitle className="text-xl">Delete Job Post</DialogTitle>
          <DialogDescription className="text-zinc-400 pt-2 leading-relaxed">
            Are you sure you want to delete <span className="text-white font-medium">&quot;{job.jobTitle}&quot;</span>? 
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="mt-6 gap-3 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
            className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}