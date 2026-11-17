"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { updateApplicationStatus } from "@/lib/api/patch";

interface ApplicationStatusSelectProps {
  applicationId: string;
  currentStatus: string;
}

const APPLICATION_STAGES = [
  {
    value: "pending",
    label: "Pending",
    style: "border-zinc-700 bg-zinc-800/60 text-zinc-300",
  },
  {
    value: "shortlisted",
    label: "Shortlisted",
    style: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
  },
  {
    value: "interview",
    label: "Interview",
    style: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  },
  {
    value: "offered",
    label: "Offered",
    style: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  },
  {
    value: "hired",
    label: "Hired",
    style: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
  {
    value: "rejected",
    label: "Rejected",
    style: "border-red-500/30 bg-red-500/10 text-red-400",
  },
];

export default function ApplicationStatusSelect({
  applicationId,
  currentStatus,
}: ApplicationStatusSelectProps) {
  const [status, setStatus] = useState(currentStatus?.toLowerCase() || "pending");
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleChange = async (newStatus: string) => {
    const previousStatus = status;
    setStatus(newStatus);
    setIsUpdating(true);

    try {
      await updateApplicationStatus(applicationId, newStatus);
      router.refresh();
    } catch (error) {
      console.error(error);
      setStatus(previousStatus);
      alert("Failed to update status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const activeStage =
    APPLICATION_STAGES.find((stage) => stage.value === status) ||
    APPLICATION_STAGES[0];

  return (
    <div className="relative inline-block">
      <select
        value={status}
        disabled={isUpdating}
        onChange={(e) => handleChange(e.target.value)}
        className={`cursor-pointer appearance-none rounded-full border py-1.5 pr-8 pl-3.5 text-xs font-medium capitalize transition-all focus:outline-none ${
          activeStage.style
        } ${isUpdating ? "cursor-not-allowed opacity-50" : ""}`}
      >
        {APPLICATION_STAGES.map((stage) => (
          <option
            key={stage.value}
            value={stage.value}
            className="bg-[#0c0c0f] text-white"
          >
            {stage.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 opacity-70" />
    </div>
  );
}