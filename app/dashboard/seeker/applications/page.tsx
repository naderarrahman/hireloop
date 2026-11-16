"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FileText, CheckCircle2, Clock, TrendingUp, Download, 
  Briefcase, Code2, Palette, Megaphone, Loader2
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { appliedJobs } from "@/lib/api/get";

interface Application {
  _id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  status: string;
  appliedAt: string;
}

export default function MyApplicationsPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as { id: string; name: string; email: string } | undefined;

  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (user?.id) {
        try {
          const data = await appliedJobs(user.id);
          setApplications(data);
        } catch (error) {
          console.error("Failed to load applications", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }, [user?.id]);

  const totalApplied = applications.length;
  const shortlisted = applications.filter(a => a.status.toLowerCase() === "shortlisted").length;
  const interviews = applications.filter(a => a.status.toLowerCase() === "interview").length;
  const offered = applications.filter(a => a.status.toLowerCase() === "offered").length;
  
  const successRate = totalApplied > 0 
    ? Math.round(((shortlisted + interviews + offered) / totalApplied) * 100) 
    : 0;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "applied": return "bg-zinc-800 text-zinc-300 border-zinc-700";
      case "review": case "under review": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "shortlisted": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "rejected": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "offered": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default: return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  const getJobIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("design")) return <Palette className="w-4 h-4 text-pink-400" />;
    if (t.includes("marketing")) return <Megaphone className="w-4 h-4 text-orange-400" />;
    if (t.includes("engineer") || t.includes("developer")) return <Code2 className="w-4 h-4 text-blue-400" />;
    return <Briefcase className="w-4 h-4 text-zinc-400" />;
  };

  // Relative time (2 hours ago)
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 60) return `${diffInMins} mins ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays === 1) return `1 day ago`;
    return `${diffInDays} days ago`;
  };

  if (isPending || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#5A45FF] mb-4" />
        <p className="text-zinc-400">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:p-6 bg-[#050505] min-h-screen text-white">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Applications</h1>
          <p className="text-zinc-400 text-sm">Track your job applications and interview progress in real-time.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-[#141414] border border-zinc-800 rounded-lg p-1">
            <button className="px-4 py-1.5 text-sm font-medium bg-zinc-800 text-white rounded-md transition-colors">Active</button>
            <button className="px-4 py-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors">Archived</button>
          </div>
          <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#141414] border border-zinc-800 rounded-xl p-5">
          <p className="text-xs text-zinc-500 mb-2">Total Applied</p>
          <p className="text-3xl font-bold text-white">{totalApplied}</p>
        </div>
        <div className="bg-[#141414] border border-zinc-800 rounded-xl p-5">
          <p className="text-xs text-zinc-500 mb-2">Shortlisted</p>
          <p className="text-3xl font-bold text-white">{shortlisted}</p>
        </div>
        <div className="bg-[#141414] border border-zinc-800 rounded-xl p-5">
          <p className="text-xs text-zinc-500 mb-2">Interviews</p>
          <p className="text-3xl font-bold text-white">{interviews}</p>
        </div>
        <div className="bg-[#141414] border border-zinc-800 rounded-xl p-5">
          <p className="text-xs text-zinc-500 mb-2">Success Rate</p>
          <p className="text-3xl font-bold text-emerald-400">{successRate}%</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#141414] border border-zinc-800 rounded-2xl overflow-hidden">
        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <Briefcase className="w-12 h-12 text-zinc-700 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-1">No applications yet</h3>
            <p className="text-sm text-zinc-500 mb-6">You haven&apos;t applied to any jobs yet.</p>
            <Link href="/browse-jobs" className="bg-[#5A45FF] hover:bg-[#4a36ee] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="border-b border-zinc-800 bg-[#0c0c0f]">
                  <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Job Title</th>
                  <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Company</th>
                  <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Applied</th>
                  <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                          {getJobIcon(app.jobTitle)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{app.jobTitle}</p>
                          <p className="text-xs text-zinc-500">Full-time • Remote</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-300">{app.companyName}</td>
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {getRelativeTime(app.appliedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/jobs/${app.jobId}`}
                        className="text-sm text-zinc-400 hover:text-white transition-colors"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}