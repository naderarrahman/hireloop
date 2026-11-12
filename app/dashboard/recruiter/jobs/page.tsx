import Link from "next/link";
import get from "@/lib/api/get";
import {
  Plus,
  Briefcase,
  MapPin,
  Building2,
  Users,
  Pencil,
  Trash2,
  MoreVertical,
  Code2,
  Palette,
  Megaphone,
  TrendingUp,
} from "lucide-react";

interface Job {
  _id: string;
  jobTitle: string;
  companyName: string;
  category: string;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  responsibilities: string;
  qualifications: string;
  jobType: string;
  isRemote: boolean;
  applicants?: number;
  createdAt?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "engineering":
      return <Code2 className="w-5 h-5 text-blue-400" />;
    case "design":
      return <Palette className="w-5 h-5 text-pink-400" />;
    case "marketing":
      return <Megaphone className="w-5 h-5 text-orange-400" />;
    case "sales":
      return <TrendingUp className="w-5 h-5 text-green-400" />;
    default:
      return <Briefcase className="w-5 h-5 text-zinc-400" />;
  }
};

export default async function ManageJobs() {
  const jobs: Job[] = await get();

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:p-6 bg-[#050505] min-h-screen">
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2 font-medium">
            <Link href="/dashboard/recruiter" className="hover:text-zinc-300 transition-colors">
              Manage Jobs
            </Link>
            <span>&gt;</span>
            <span className="text-zinc-300">Job Listings & Postings</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Manage Jobs Posts</h1>
          <p className="text-xs md:text-sm text-zinc-400">
            Review live listings, monitor applicants, and update job details across your organization.
          </p>
        </div>
        <Link
          href="/dashboard/recruiter/jobs/new"
          className="bg-[#5A45FF] hover:bg-[#4a36ee] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          New Job Post
        </Link>
      </div>

      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl overflow-hidden">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-zinc-800/80 bg-[#0c0c0f]">
                <th className="py-4 px-6 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Job Title & Dept</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Company & Location</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Type</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Compensation</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Applicants</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Deadline</th>
                <th className="py-4 px-6 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {jobs.map((job) => {
                const applicants = job.applicants || 0;
                const isExpired = new Date(job.deadline) < new Date();
                const status = isExpired ? "Expired" : "Active";
                
                const postedDate = job.createdAt 
                  ? new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  : "Recently";

                return (
                  <tr key={job._id} className="hover:bg-zinc-900/30 transition-colors group">
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center shrink-0">
                          {getCategoryIcon(job.category)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-[#5A45FF] transition-colors">
                            {job.jobTitle}
                          </p>
                          <p className="text-xs text-zinc-500 capitalize">{job.category}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-sm text-zinc-300">
                          <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                          {job.companyName}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                          <MapPin className="w-3.5 h-3.5" />
                          {job.location}
                          {job.isRemote && (
                            <span className="ml-1 text-[10px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded-md border border-indigo-500/20">
                              Remote
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                        {job.jobType}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <p className="text-sm text-zinc-300 font-medium">
                        €{job.minSalary} - €{job.maxSalary} <span className="text-xs text-zinc-500 font-normal">/ {job.frequency}</span>
                      </p>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Users className="w-4 h-4" />
                        {applicants} Candidates
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${status === "Active" ? "bg-emerald-400" : "bg-red-400"}`} />
                        {status}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <p className="text-sm text-zinc-300">
                        {new Date(job.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">Posted {postedDate}</p>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                          <Pencil className="w-3 h-3" />
                          Edit
                        </button>
                        <button className="p-2 text-zinc-500 hover:text-red-400 bg-zinc-900 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-zinc-500 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors border border-transparent">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {jobs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <Briefcase className="w-12 h-12 text-zinc-700 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-1">No jobs found</h3>
            <p className="text-sm text-zinc-500 mb-6 max-w-sm">
              You haven&apos;t posted any jobs yet. Create your first job listing to start receiving applications.
            </p>
            <Link
              href="/dashboard/recruiter/jobs/new"
              className="bg-[#5A45FF] hover:bg-[#4a36ee] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              Post a New Job
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}