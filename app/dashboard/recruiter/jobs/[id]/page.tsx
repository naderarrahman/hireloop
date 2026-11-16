import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobById } from "@/lib/actions/jobs";
import {
  ArrowLeft,
  Building2,
  MapPin,
  CalendarDays,
  Briefcase,
  Clock,
  Euro,
  CheckCircle2,
  FileText,
} from "lucide-react";

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  let job;
  try {
    job = await getJobById(resolvedParams.id);
  } catch (error) {
    notFound(); // 
  }

  const isExpired = new Date(job.deadline) < new Date();
  const status = isExpired ? "Expired" : "Active";

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-[#050505] min-h-screen">
      
      {/* Back Button */}
      <Link
        href="/dashboard/recruiter/jobs"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Manage Jobs
      </Link>

      {/* Main Card */}
      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 md:p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-zinc-800/80 pb-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 border border-zinc-700 flex items-center justify-center shrink-0">
              <Briefcase className="w-8 h-8 text-[#5A45FF]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{job.jobTitle}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" /> {job.companyName}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {job.location}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                  status === "Active"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${status === "Active" ? "bg-emerald-400" : "bg-red-400"}`} />
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Job Overview Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-[#0c0c0f] border border-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1"><Briefcase className="w-3 h-3" /> Job Type</p>
            <p className="text-sm font-medium text-white">{job.jobType}</p>
          </div>
          <div className="bg-[#0c0c0f] border border-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1"><Euro className="w-3 h-3" /> Salary</p>
            <p className="text-sm font-medium text-white">€{job.minSalary} - €{job.maxSalary}</p>
          </div>
          <div className="bg-[#0c0c0f] border border-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Frequency</p>
            <p className="text-sm font-medium text-white capitalize">{job.frequency}</p>
          </div>
          <div className="bg-[#0c0c0f] border border-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1"><CalendarDays className="w-3 h-3" /> Deadline</p>
            <p className="text-sm font-medium text-white">
              {new Date(job.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>

        {/* Description Sections */}
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#5A45FF]" /> Key Responsibilities
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">
              {job.responsibilities}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#5A45FF]" /> Qualifications & Requirements
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">
              {job.qualifications}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-10 pt-6 border-t border-zinc-800/80">
          <span className="text-xs text-zinc-500 mr-2">Tags:</span>
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-300 capitalize">
            {job.category}
          </span>
          {job.isRemote && (
            <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs text-indigo-400">
              Remote
            </span>
          )}
        </div>

      </div>
    </div>
  );
}