"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  MapPin,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

export default function AddJobPage() {
  const [jobType, setJobType] = useState("Full-time");
  const [isRemote, setIsRemote] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const finalData = {
      ...data,
      jobType: jobType,
      isRemote: isRemote,
    };

    console.log("Form Data Submitted:", finalData);
    alert("Job posted successfully! Check the console for data.");
  };

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

  return (
    <div className="w-full max-w-5xl mx-auto pb-20 px-4 md:px-0 bg-[#050505]">
      <form id="add-job-form" onSubmit={handleSubmit} className="relative space-y-10">
        
        <div className="md:pr-40">
          <div className="flex items-center gap-2 text-[11px] md:text-xs text-zinc-500 mb-2 font-medium">
            <Link href="/dashboard/recruiter/jobs" className="hover:text-zinc-300 transition-colors">
              Manage Jobs
            </Link>
            <span>&gt;</span>
            <span className="text-zinc-300">Create New Listing</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Post a New Job</h1>
          <p className="text-xs md:text-sm text-zinc-400">
            Fill in the position specifications to attract qualified talent across our network.
          </p>
        </div>

        <div className="space-y-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5A45FF]"></span>
            1. Basic Information
          </h2>

          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="jobTitle"
                required
                placeholder="e.g. Frontend Developer"
                className="w-full bg-[#0c0c0f] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#5A45FF] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Your Company Name"
                    className="w-full bg-[#0c0c0f] border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#5A45FF] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">
                  Job Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="category"
                    required
                    defaultValue="engineering"
                    className="w-full bg-[#0c0c0f] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-[#5A45FF] transition-colors"
                  >
                    <option value="engineering">Engineering & Tech</option>
                    <option value="design">Design & UI/UX</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-medium text-zinc-300">
                Job Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setJobType(type)}
                    className={`py-3 rounded-xl text-xs md:text-sm font-medium transition-all ${
                      jobType === type
                        ? "bg-[#5A45FF]/10 border border-[#5A45FF] text-[#5A45FF]"
                        : "bg-[#0c0c0f] border border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5A45FF]"></span>
            2. Location, Compensation & Timeline
          </h2>

          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#0c0c0f] border border-zinc-800 rounded-xl p-4 gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-zinc-400" />
                  Remote Work Allowed (Optional)
                </span>
                <span className="text-xs text-zinc-500 mt-1 md:ml-6">
                  Enable worldwide or distributed candidate applications
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsRemote(!isRemote)}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                  isRemote ? "bg-[#5A45FF]" : "bg-zinc-700"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                    isRemote ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">
                  Job Location <span className="text-zinc-600">(location)</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. New York, USA"
                    className="w-full bg-[#0c0c0f] border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#5A45FF] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">
                  Application Deadline <span className="text-zinc-600">(deadline)</span>
                </label>
                <div className="relative">
                  <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="date"
                    name="deadline"
                    className="w-full bg-[#0c0c0f] border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#5A45FF] transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">Min Salary / Rate</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-medium">€</span>
                  <input
                    type="number"
                    name="minSalary"
                    placeholder="e.g. 25"
                    className="w-full bg-[#0c0c0f] border border-zinc-800 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#5A45FF] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">Max Salary / Rate</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-medium">€</span>
                  <input
                    type="number"
                    name="maxSalary"
                    placeholder="e.g. 40"
                    className="w-full bg-[#0c0c0f] border border-zinc-800 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#5A45FF] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300 hidden md:block opacity-0">Frequency</label>
                <div className="relative">
                  <select
                    name="frequency"
                    defaultValue="hour"
                    className="w-full bg-[#0c0c0f] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-[#5A45FF] transition-colors"
                  >
                    <option value="hour">per hour</option>
                    <option value="month">per month</option>
                    <option value="year">per year</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5A45FF]"></span>
            3. Requirements & Requirements
          </h2>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">
                Key Responsibilities <span className="text-red-500">*</span>
              </label>
              <textarea
                name="responsibilities"
                required
                rows={4}
                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction-rich products."
                className="w-full bg-[#0c0c0f] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#5A45FF] transition-colors resize-none"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">
                Qualifications & Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                name="qualifications"
                required
                rows={4}
                placeholder="• 3+ years of experience with React, TypeScript, and modern state architectures&#10;• Strong understanding of HTML/CSS and component-driven designs&#10;• Experience partnering closely with product teams and UI/UX designers"
                className="w-full bg-[#0c0c0f] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#5A45FF] transition-colors resize-none"
              ></textarea>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full md:w-auto mt-8 md:mt-0 md:absolute md:top-0 md:right-0 bg-[#5A45FF] hover:bg-[#4a36ee] text-white px-6 py-3 md:py-2.5 rounded-xl font-medium text-sm transition-colors whitespace-nowrap shadow-lg shadow-[#5A45FF]/20"
        >
          Publish Job
        </button>

      </form>
    </div>
  );
}