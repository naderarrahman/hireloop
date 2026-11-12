"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, MapPin, CalendarDays, ChevronDown } from "lucide-react"
import createJob from "@/lib/actions/jobs"

export default function AddJobPage() {
  const [jobType, setJobType] = useState("Full-time")
  const [isRemote, setIsRemote] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const finalData = {
      jobTitle: data.jobTitle as string,
      companyName: data.companyName as string,
      category: data.category as string,
      jobType: jobType,
      isRemote: isRemote,
      location: data.location as string,
      deadline: data.deadline as string,
      minSalary: data.minSalary as string,
      maxSalary: data.maxSalary as string,
      frequency: data.frequency as string,
      responsibilities: data.responsibilities as string,
      qualifications: data.qualifications as string,
    }

    try {
      await createJob(finalData)
      alert("Job posted successfully!")
    } catch (error) {
      console.error(error)
      alert("Failed to post job.")
    }
  }

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

  return (
    <div className="mx-auto w-full max-w-5xl bg-[#050505] px-4 pb-20 md:px-0">
      <form
        id="add-job-form"
        onSubmit={handleSubmit}
        className="relative space-y-10"
      >
        <div className="md:pr-40">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-zinc-500 md:text-xs">
            <Link
              href="/dashboard/recruiter/jobs"
              className="transition-colors hover:text-zinc-300"
            >
              Manage Jobs
            </Link>
            <span>&gt;</span>
            <span className="text-zinc-300">Create New Listing</span>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-white md:text-3xl">
            Post a New Job
          </h1>
          <p className="text-xs text-zinc-400 md:text-sm">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>

        <div className="space-y-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5A45FF]"></span>
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
                className="w-full rounded-xl border border-zinc-800 bg-[#0c0c0f] px-4 py-3 text-sm text-white transition-colors placeholder:text-zinc-600 focus:border-[#5A45FF] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Your Company Name"
                    className="w-full rounded-xl border border-zinc-800 bg-[#0c0c0f] py-3 pr-4 pl-11 text-sm text-white transition-colors placeholder:text-zinc-600 focus:border-[#5A45FF] focus:outline-none"
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
                    className="w-full appearance-none rounded-xl border border-zinc-800 bg-[#0c0c0f] px-4 py-3 text-sm text-white transition-colors focus:border-[#5A45FF] focus:outline-none"
                  >
                    <option value="engineering">Engineering & Tech</option>
                    <option value="design">Design & UI/UX</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-medium text-zinc-300">
                Job Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setJobType(type)}
                    className={`rounded-xl py-3 text-xs font-medium transition-all md:text-sm ${
                      jobType === type
                        ? "border border-[#5A45FF] bg-[#5A45FF]/10 text-[#5A45FF]"
                        : "border border-zinc-800 bg-[#0c0c0f] text-zinc-400 hover:border-zinc-700"
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
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5A45FF]"></span>
            2. Location, Compensation & Timeline
          </h2>

          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-col justify-between gap-4 rounded-xl border border-zinc-800 bg-[#0c0c0f] p-4 md:flex-row md:items-center">
              <div className="flex flex-col">
                <span className="flex items-center gap-2 text-sm font-medium text-white">
                  <MapPin className="h-4 w-4 text-zinc-400" />
                  Remote Work Allowed (Optional)
                </span>
                <span className="mt-1 text-xs text-zinc-500 md:ml-6">
                  Enable worldwide or distributed candidate applications
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsRemote(!isRemote)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  isRemote ? "bg-[#5A45FF]" : "bg-zinc-700"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    isRemote ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">
                  Job Location <span className="text-zinc-600">(location)</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. New York, USA"
                    className="w-full rounded-xl border border-zinc-800 bg-[#0c0c0f] py-3 pr-4 pl-11 text-sm text-white transition-colors placeholder:text-zinc-600 focus:border-[#5A45FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">
                  Application Deadline{" "}
                  <span className="text-zinc-600">(deadline)</span>
                </label>
                <div className="relative">
                  <CalendarDays className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="date"
                    name="deadline"
                    className="w-full rounded-xl border border-zinc-800 bg-[#0c0c0f] py-3 pr-4 pl-11 text-sm text-white [color-scheme:dark] transition-colors placeholder:text-zinc-600 focus:border-[#5A45FF] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">
                  Min Salary / Rate
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-sm font-medium text-zinc-500">
                    €
                  </span>
                  <input
                    type="number"
                    name="minSalary"
                    placeholder="e.g. 25"
                    className="w-full rounded-xl border border-zinc-800 bg-[#0c0c0f] py-3 pr-4 pl-9 text-sm text-white transition-colors placeholder:text-zinc-600 focus:border-[#5A45FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-300">
                  Max Salary / Rate
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-sm font-medium text-zinc-500">
                    €
                  </span>
                  <input
                    type="number"
                    name="maxSalary"
                    placeholder="e.g. 40"
                    className="w-full rounded-xl border border-zinc-800 bg-[#0c0c0f] py-3 pr-4 pl-9 text-sm text-white transition-colors placeholder:text-zinc-600 focus:border-[#5A45FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="hidden text-xs font-medium text-zinc-300 opacity-0 md:block">
                  Frequency
                </label>
                <div className="relative">
                  <select
                    name="frequency"
                    defaultValue="hour"
                    className="w-full appearance-none rounded-xl border border-zinc-800 bg-[#0c0c0f] px-4 py-3 text-sm text-white transition-colors focus:border-[#5A45FF] focus:outline-none"
                  >
                    <option value="hour">per hour</option>
                    <option value="month">per month</option>
                    <option value="year">per year</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5A45FF]"></span>
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
                className="w-full resize-none rounded-xl border border-zinc-800 bg-[#0c0c0f] px-4 py-3 text-sm text-white transition-colors placeholder:text-zinc-600 focus:border-[#5A45FF] focus:outline-none"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-300">
                Qualifications & Requirements{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="qualifications"
                required
                rows={4}
                placeholder="• 3+ years of experience with React, TypeScript, and modern state architectures&#10;• Strong understanding of HTML/CSS and component-driven designs&#10;• Experience partnering closely with product teams and UI/UX designers"
                className="w-full resize-none rounded-xl border border-zinc-800 bg-[#0c0c0f] px-4 py-3 text-sm text-white transition-colors placeholder:text-zinc-600 focus:border-[#5A45FF] focus:outline-none"
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full rounded-xl bg-[#5A45FF] px-6 py-3 text-sm font-medium whitespace-nowrap text-white shadow-lg shadow-[#5A45FF]/20 transition-colors hover:bg-[#4a36ee] md:absolute md:top-0 md:right-0 md:mt-0 md:w-auto md:py-2.5"
        >
          Publish Job
        </button>
      </form>
    </div>
  )
}
