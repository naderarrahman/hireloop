import Link from "next/link";
import { ArrowLeft, Mail, Calendar, Users, CheckCircle2 } from "lucide-react";
import { jobApplicants } from "@/lib/api/get";
import ApplicationStatusSelect from "@/components/Dashboard/ApplicationStatusSelect";

interface Application {
  _id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: string;
  appliedAt: string;
}

const PIPELINE_STAGES = [
  "pending",
  "shortlisted",
  "interview",
  "offered",
  "hired",
  "rejected",
];

export default async function JobApplicantsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const applications: Application[] = await jobApplicants(id);
  const jobTitle = applications[0]?.jobTitle || "Job Listing";

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1200px] bg-[#050505] p-4 md:p-6">
      {/* Header & Back Button */}
      <div className="mb-8">
        <Link
          href="/dashboard/recruiter/jobs"
          className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Manage Jobs
        </Link>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-white md:text-3xl">
              Applicants for <span className="text-[#5A45FF]">{jobTitle}</span>
            </h1>
            <p className="mt-1 text-xs text-zinc-400 md:text-sm">
              Candidates who have applied for this job posting. Update their
              hiring stage below.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#0c0c0f] px-4 py-2.5 text-sm text-zinc-300">
            <Users className="h-4 w-4 text-[#5A45FF]" />
            <span>Total Applied:</span>
            <strong className="text-white">{applications.length}</strong>
          </div>
        </div>
      </div>

      {/* Pipeline Stage Summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {PIPELINE_STAGES.map((stage) => {
          const count = applications.filter(
            (app) => (app.status?.toLowerCase() || "pending") === stage
          ).length;

          return (
            <div
              key={stage}
              className="rounded-xl border border-zinc-800 bg-[#0a0a0a] p-3.5"
            >
              <p className="text-[11px] font-medium tracking-wider text-zinc-500 uppercase">
                {stage}
              </p>
              <p className="mt-1 text-xl font-bold text-white">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Applicants Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0a0a0a]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-800/80 bg-[#0c0c0f]">
                <th className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Candidate
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-4 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Applied Date
                </th>
                <th className="px-6 py-4 text-right text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Hiring Stage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className="transition-colors hover:bg-zinc-900/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5A45FF]/20 text-sm font-bold text-[#5A45FF] uppercase">
                        {app.userName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white capitalize">
                          {app.userName}
                        </p>
                        <p className="text-xs text-zinc-500">
                          ID: {app.userId.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <Mail className="h-3.5 w-3.5 text-zinc-500" />
                      {app.userEmail}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                      {new Date(app.appliedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <ApplicationStatusSelect
                      applicationId={app._id}
                      currentStatus={app.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {applications.length === 0 && (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <CheckCircle2 className="mb-3 h-10 w-10 text-zinc-700" />
            <h3 className="text-base font-semibold text-white">
              No applicants yet
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              Candidates who apply for this job will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}