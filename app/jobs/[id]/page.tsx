import { getJobById } from "@/lib/actions/jobs";
import JobDetails from "@/components/BrowseJobs/JobDetails";
import { notFound } from "next/navigation";

export default async function PublicJobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  let job;
  try {
    job = await getJobById(resolvedParams.id);
  } catch (error) {
    notFound();
  }

  if (!job) notFound();

  return <JobDetails job={job} />;
}