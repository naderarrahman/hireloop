import SearchAndFilter from "@/components/BrowseJobs/SearchAndFilter";
import FilterSidebar from "@/components/BrowseJobs/FilterSidebar";
import { JobData } from "@/lib/actions/jobs";
import get from "@/lib/api/get";
import { Briefcase, Bookmark } from "lucide-react";

export default async function BrowseJobPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams(params as Record<string, string>).toString();
  
  const jobs = await get(query);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-28 pb-10 bg-[#050505] min-h-screen text-white">
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
        <p className="text-zinc-400 text-sm">Discover opportunities that match your skills.</p>
      </div>

      <SearchAndFilter />

      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        
        <aside className="w-full lg:w-72 shrink-0">
          <FilterSidebar />
        </aside>

        <main className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Found {jobs.length} Professional Jobs
            </h2>
          </div>

          {jobs.length === 0 ? (
            <div className="bg-[#141414] border border-zinc-800 rounded-xl p-10 text-center">
              <p className="text-zinc-400">No jobs found matching your criteria.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {jobs.map((job: JobData) => (
                <div 
                  key={job._id} 
                  className="group bg-[#141414] hover:bg-[#1a1a1a] border border-zinc-800/80 rounded-xl p-5 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700/50">
                        <Briefcase className="w-6 h-6 text-zinc-500" />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-[#5A45FF] transition-colors">
                          {job.jobTitle}
                        </h3>
                        <p className="text-sm text-zinc-400 mt-1 flex items-center gap-2">
                          {job.companyName} <span className="w-1 h-1 rounded-full bg-zinc-600"></span> {job.location}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-4">
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-medium text-zinc-300">
                            €{job.minSalary} - €{job.maxSalary}
                          </span>
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-medium text-zinc-300">
                            <Briefcase className="w-3 h-3" />
                            {job.jobType}
                          </span>
                          {job.isRemote && (
                             <span className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-medium text-zinc-300">
                               Remote
                             </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button className="text-zinc-500 hover:text-white transition-colors p-2">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}