import Image from "next/image";
import { Search, MapPin, Briefcase, Building2, Users, Star, Flame } from "lucide-react";

export default function Hero() {
  const trendingTags = ["Product Designer", "AI Engineering", "DevOps Engineer"];
  const stats = [
    { icon: Briefcase, value: "50K", label: "Active Jobs" },
    { icon: Building2, value: "12K", label: "Companies" },
    { icon: Users, value: "2M", label: "Job Seekers" },
    { icon: Star, value: "97%", label: "Satisfaction Rate" },
  ];

  return (
    <section className="w-full bg-[#050505]">
      <div className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-16 bg-zinc-800"></div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 tracking-widest uppercase">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-white font-bold">50,000+</span> NEW JOBS THIS MONTH
            </div>
            <div className="h-px w-16 bg-zinc-800"></div>
          </div>

          <h1 className="text-4xl md:text-[56px] font-bold text-white tracking-tight mb-4 leading-tight">
            Find Your Dream Job Today
          </h1>
          <p className="text-zinc-400 max-w-2xl text-sm md:text-[15px] mb-8 leading-relaxed">
            HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
          </p>

          <div className="w-full max-w-[760px] bg-[#0c0c0f] border border-zinc-800/80 rounded-2xl p-2 flex flex-col md:flex-row items-center gap-2 mb-6 shadow-2xl">
            <div className="flex-1 flex items-center px-4 py-3 w-full border-b md:border-b-0 md:border-r border-zinc-800/80">
              <Search className="w-5 h-5 text-zinc-500 mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Job title, skill, or company"
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-zinc-500"
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-3 w-full">
              <MapPin className="w-5 h-5 text-zinc-500 mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Location or Remote"
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-zinc-500"
              />
            </div>
            <button className="w-full md:w-auto bg-[#5A45FF] hover:bg-[#4a36ee] text-white p-3.5 rounded-xl transition-all flex items-center justify-center">
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className="text-xs text-zinc-500 mr-2">Trending Position</span>
            {trendingTags.map((tag) => (
              <button
                key={tag}
                className="px-4 py-1.5 rounded-full bg-[#0c0c0f] border border-zinc-800/80 text-xs text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full min-h-[800px] flex flex-col justify-end overflow-hidden pb-12">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] max-w-[150vw] aspect-square pointer-events-none z-0">
          <Image
            src="/hero/globe.png"
            alt="Globe Background"
            fill
            sizes="(max-width: 768px) 150vw, 1200px"
            className="object-contain object-bottom mix-blend-screen opacity-95"
            priority
          />
          <div className="absolute top-0 left-0 w-full h-[35%] bg-[#050505] z-10" />
        </div>

        <div className="relative z-20 text-center w-full px-4 mb-20 pointer-events-none">
          <h2 className="text-[28px] md:text-[36px] font-medium text-white max-w-2xl mx-auto leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            Assisting over <span className="text-[#5A45FF] font-semibold">15,000</span> job seekers<br className="hidden md:block" /> find their dream positions.
          </h2>
        </div>

        <div className="relative z-30 w-full max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#0a0a0f]/80 backdrop-blur-md border border-zinc-800/60 rounded-2xl p-6 flex flex-col hover:border-zinc-600 transition-colors shadow-2xl"
              >
                <div className="mb-10">
                  <stat.icon className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}