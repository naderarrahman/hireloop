import Link from "next/link";
import get from "@/lib/api/get";
import {
  Plus,
  Briefcase,
  MapPin,
  Building2,
  Users,
  MoreVertical,
  Code2,
  Palette,
  Megaphone,
  TrendingUp,
  Eye,
} from "lucide-react";
import { DeleteJobDialog } from "@/components/Dashboard/DeleteJobDialog";
import { EditJobDialog } from "@/components/Dashboard/EditJobDialog";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/core/session";

interface Job {
  _id: string;
  jobTitle: string;
  companyName: string;
  recruiterId?: string;
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
      return <Code2 className="h-5 w-5 text-blue-400" />;
    case "design":
      return <Palette className="h-5 w-5 text-pink-400" />;
    case "marketing":
      return <Megaphone className="h-5 w-5 text-orange-400" />;
    case "sales":
      return <TrendingUp className="h-5 w-5 text-green-400" />;
    default:
      return <Briefcase className="h-5 w-5 text-zinc-400" />;
  }
};

export default async function ManageJobs() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const jobs: Job[] = await get(`recruiterId=${session.user.id}`);

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1400px] bg-[#050505] p-4 md:p-6">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-500">
            <Link
              href="/dashboard/recruiter"
              className="transition-colors hover:text-zinc-300"
            >
              Manage Jobs
            </Link>
            <span>&gt;</span>
            <span className="text-zinc-300">Job Listings & Postings</span>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-white md:text-3xl">
            Manage Jobs Posts
          </h1>
          <p className="text-xs text-zinc-400 md:text-sm">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>
        <Link
          href="/dashboard/recruiter/jobs/new"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#5A45FF] px-5 py-2.5 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-[#4a36ee]"
        >
          <Plus className="h-4 w-4" />
          New Job Post
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0a0a0a]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-800/80 bg-[#0c0c0f]">
                <th className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Job Title & Dept
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Company & Location
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Compensation
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Applicants
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Deadline
                </th>
                <th className="px-6 py-4 text-right text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {jobs.map((job) => {
                const applicants = job.applicants || 0;
                const isExpired = new Date(job.deadline) < new Date();
                const status = isExpired ? "Expired" : "Active";
                const postedDate = job.createdAt
                  ? new Date(job.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "Recently";

                return (
                  <tr
                    key={job._id}
                    className="group transition-colors hover:bg-zinc-900/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700/50 bg-zinc-800/50">
                          {getCategoryIcon(job.category)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white transition-colors group-hover:text-[#5A45FF]">
                            {job.jobTitle}
                          </p>
                          <p className="text-xs text-zinc-500 capitalize">
                            {job.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-sm text-zinc-300">
                          <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                          {job.companyName}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                          {job.isRemote && (
                            <span className="ml-1 rounded-md border border-indigo-500/20 bg-indigo-500/20 px-1.5 py-0.5 text-[10px] text-indigo-400">
                              Remote
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-md border border-zinc-700/50 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300">
                        {job.jobType}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-zinc-300">
                        €{job.minSalary} - €{job.maxSalary}{" "}
                        <span className="text-xs font-normal text-zinc-500">
                          / {job.frequency}
                        </span>
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Users className="h-4 w-4" />
                        {applicants} Candidates
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                          status === "Active"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border-red-500/20 bg-red-500/10 text-red-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            status === "Active" ? "bg-emerald-400" : "bg-red-400"
                          }`}
                        />
                        {status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-zinc-300">
                        {new Date(job.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        Posted {postedDate}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/recruiter/jobs/${job._id}`}
                          className="rounded-lg border border-transparent bg-zinc-900 p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <Link
                          href={`/dashboard/recruiter/jobs/${job._id}/applicants`}
                          className="flex items-center gap-1.5 rounded-lg border border-[#5A45FF]/30 bg-[#5A45FF]/10 px-2.5 py-2 text-xs font-medium text-[#5A45FF] transition-colors hover:bg-[#5A45FF] hover:text-white"
                          title="View Applicants"
                        >
                          <Users className="h-4 w-4" />
                          <span>Applicants</span>
                        </Link>

                        <EditJobDialog job={job} />
                        <DeleteJobDialog job={job} />

                        <button className="rounded-lg border border-transparent bg-zinc-900 p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white">
                          <MoreVertical className="h-4 w-4" />
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
          <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
            <Briefcase className="mb-4 h-12 w-12 text-zinc-700" />
            <h3 className="mb-1 text-lg font-semibold text-white">
              No jobs found
            </h3>
            <p className="mb-6 max-w-sm text-sm text-zinc-500">
              You haven&apos;t posted any jobs yet. Create your first job
              listing to start receiving applications.
            </p>
            <Link
              href="/dashboard/recruiter/jobs/new"
              className="rounded-xl bg-[#5A45FF] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4a36ee]"
            >
              Post a New Job
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}