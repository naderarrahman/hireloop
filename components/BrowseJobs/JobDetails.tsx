"use client";

import { useState } from "react";
import { 
  MapPin, Briefcase, DollarSign, Clock, Bookmark, CheckCircle2, 
  HeartPulse, Laptop, Infinity as InfinityIcon, Building2, Loader2
} from "lucide-react";
import { JobData } from "@/lib/actions/jobs";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { applyForApplication } from "@/lib/actions/applications";

export default function JobDetails({ job }: { job: JobData }) {
  const { data: session } = authClient.useSession();
  const user = session?.user as { id: string; name: string; email: string; role?: string } | undefined;
  const router = useRouter();

  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const experience = "5+ Years";
  const companySize = "250 - 500 Employees";
  const industry = "SaaS / Artificial Intelligence";
  const tags = ["Figma Expertise", "System Thinking", "UI/UX Design", "Basic Frontend"];

  const handleApply = async () => {
    if (!user) {
      router.push(`/sign-in?callbackUrl=/jobs/${job._id}`);
      return;
    }

    if (user.role !== "seeker") {
      alert("Only job seekers can apply for jobs.");
      return;
    }

    setIsApplying(true);

    try {
      const res = await applyForApplication({
        jobId: job._id as string,
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        status: "applied",
      });

      if (res.success) {
        setHasApplied(true);
        alert("Application submitted successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit application");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 md:p-6 mt-24 pb-12 bg-[#050505] min-h-screen text-white">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#141414] border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center shrink-0">
                <Building2 className="w-7 h-7 text-zinc-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">{job.jobTitle}</h1>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <span className="font-medium text-zinc-300">{job.companyName}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Verified Employer
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="p-2.5 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-colors">
                <Bookmark className="w-5 h-5 text-zinc-400" />
              </button>
              <button 
                className={`font-semibold px-6 py-2.5 rounded-xl transition-colors w-full md:w-auto flex items-center justify-center gap-2 ${
                  hasApplied 
                    ? "bg-emerald-600 text-white cursor-not-allowed" 
                    : "bg-white hover:bg-zinc-200 text-black"
                }`}
                onClick={handleApply}
                disabled={isApplying || hasApplied}
              >
                {isApplying && <Loader2 className="w-4 h-4 animate-spin" />}
                {hasApplied ? "Applied ✓" : isApplying ? "Applying..." : "Apply Now"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#141414] border border-zinc-800 p-4 rounded-xl">
              <span className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1"><DollarSign className="w-3.5 h-3.5" /> Salary Range</span>
              <p className="text-sm font-semibold text-white">€{job.minSalary} - €{job.maxSalary}</p>
            </div>
            <div className="bg-[#141414] border border-zinc-800 p-4 rounded-xl">
              <span className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1"><MapPin className="w-3.5 h-3.5" /> Location</span>
              <p className="text-sm font-semibold text-white truncate">{job.location} {job.isRemote && "(Remote)"}</p>
            </div>
            <div className="bg-[#141414] border border-zinc-800 p-4 rounded-xl">
              <span className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1"><Briefcase className="w-3.5 h-3.5" /> Job Type</span>
              <p className="text-sm font-semibold text-white">{job.jobType}</p>
            </div>
            <div className="bg-[#141414] border border-zinc-800 p-4 rounded-xl">
              <span className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1"><Clock className="w-3.5 h-3.5" /> Experience</span>
              <p className="text-sm font-semibold text-white">{experience}</p>
            </div>
          </div>

          <div className="bg-[#141414] border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-8">
            <section>
              <h2 className="text-lg font-bold text-white mb-4">Job Description</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We are building the next generation of infrastructure monitoring tools. We are looking for a {job.jobTitle} who is passionate about translating complex technical workflows into elegant, intuitive interfaces. You will be a key member of our design team, working closely with engineering and product leadership to define the vision for our core platform experience.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-4">Responsibilities</h2>
              <ul className="text-sm text-zinc-400 space-y-3 list-disc list-inside leading-relaxed">
                <li>Lead the end-to-end design process for major platform features, from discovery to high-fidelity implementation.</li>
                <li>Collaborate with cross-functional partners to understand user needs and translate them into functional design requirements.</li>
                <li>Maintain and evolve our design system, ensuring consistency and accessibility across the entire product suite.</li>
                <li>Conduct user research and usability testing to validate design decisions and iterate based on feedback.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-4">Requirements</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-zinc-800/80 border border-zinc-700/50 rounded-md text-xs font-medium text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>
              <ul className="text-sm text-zinc-400 space-y-3 list-disc list-inside leading-relaxed">
                <li>{job.qualifications}</li>
                <li>5+ years of experience designing complex B2B SaaS products or data-heavy applications.</li>
                <li>A strong portfolio showcasing your design process and problem-solving skills.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-4">Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/80 p-3 rounded-lg text-sm text-zinc-300">
                  <HeartPulse className="w-4 h-4 text-emerald-400" /> Full Health & Dental
                </div>
                <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/80 p-3 rounded-lg text-sm text-zinc-300">
                  <DollarSign className="w-4 h-4 text-yellow-400" /> Competitive 401k
                </div>
                <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/80 p-3 rounded-lg text-sm text-zinc-300">
                  <Laptop className="w-4 h-4 text-blue-400" /> Latest Hardware Stipend
                </div>
                <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/80 p-3 rounded-lg text-sm text-zinc-300">
                  <InfinityIcon className="w-4 h-4 text-purple-400" /> Unlimited PTO
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#141414] border border-zinc-800 rounded-2xl p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-white mb-4">Company Overview</h2>
            
            <div className="w-full h-40 bg-zinc-800 rounded-xl mb-6 overflow-hidden border border-zinc-700/50 relative">
              <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                 <Building2 className="w-10 h-10" />
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3">
                <span className="text-zinc-500">Size</span>
                <span className="text-zinc-300 font-medium">{companySize}</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3">
                <span className="text-zinc-500">Industry</span>
                <span className="text-zinc-300 font-medium text-right max-w-[150px]">{industry}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2.5 rounded-xl border border-zinc-700 transition-colors">
              Visit Website
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}