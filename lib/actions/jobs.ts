export interface JobData {
  _id?: string;
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
  jobId?: string; 
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

export const deleteJob = async (jobId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete job');
    }

    return res.json();
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

export const updateJob = async (jobId: string, updatedData: JobData) => {
  try {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error('Failed to update job');
    }

    return res.json();
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

export const getJobById = async (jobId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch job details');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
};