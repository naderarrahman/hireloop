"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Loader2 } from "lucide-react";
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
import { updateJob } from "@/lib/actions/jobs";

interface Job {
  _id: string;
  jobTitle: string;
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  responsibilities: string;
  qualifications: string;
}

export function EditJobDialog({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const finalData = {
      ...job,
      ...data,
      isRemote: formData.get("isRemote") === "on",
    };

    try {
      await updateJob(job._id, finalData);
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update job");
    } finally {
      setIsUpdating(false);
    }
  };

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const categories = ["engineering", "design", "marketing", "sales"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogTrigger 
        render={
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            title="Edit Job"
          >
            <Pencil className="w-3 h-3" />
            Edit
          </button>
        }
      />
      
      <DialogContent className="bg-[#0c0c0f] border-zinc-800 text-white sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Job Post</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Update the details for this job listing.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleUpdate} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Job Title</label>
              <input type="text" name="jobTitle" required defaultValue={job.jobTitle} className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5A45FF]" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Company Name</label>
              <input type="text" name="companyName" required defaultValue={job.companyName} className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5A45FF]" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Category</label>
              <select name="category" defaultValue={job.category} className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5A45FF]">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Job Type</label>
              <select name="jobType" defaultValue={job.jobType} className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5A45FF]">
                {jobTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Location</label>
              <input type="text" name="location" defaultValue={job.location} className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5A45FF]" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Deadline</label>
              <input type="date" name="deadline" defaultValue={job.deadline?.split('T')[0]} className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5A45FF] [color-scheme:dark]" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Min Salary (€)</label>
              <input type="number" name="minSalary" defaultValue={job.minSalary} className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5A45FF]" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Max Salary (€)</label>
              <input type="number" name="maxSalary" defaultValue={job.maxSalary} className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5A45FF]" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">Frequency</label>
              <select name="frequency" defaultValue={job.frequency} className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5A45FF]">
                <option value="hour">per hour</option>
                <option value="month">per month</option>
                <option value="year">per year</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 mt-6">
              <input type="checkbox" name="isRemote" defaultChecked={job.isRemote} className="w-4 h-4 accent-[#5A45FF]" />
              <label className="text-sm font-medium text-zinc-300">Remote Work Allowed</label>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">Key Responsibilities</label>
            <textarea name="responsibilities" rows={3} defaultValue={job.responsibilities} className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5A45FF] resize-none" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">Qualifications</label>
            <textarea name="qualifications" rows={3} defaultValue={job.qualifications} className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5A45FF] resize-none" />
          </div>

          <DialogFooter className="mt-6 gap-3 sm:gap-0 border-t border-zinc-800/50 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isUpdating}
              className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="bg-[#5A45FF] hover:bg-[#4a36ee] text-white"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}