export interface JobData {
  jobTitle: string;
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  responsibilities: string;
  qualifications: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default async function createJob(finalData: JobData) {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(finalData),
  });

  if (!res.ok) {
    throw new Error('Failed to create job');
  }

  return res.json();
}