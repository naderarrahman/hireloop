

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default async function get(query?: string) {

  const url = query ? `${BASE_URL}/jobs?${query}` : `${BASE_URL}/jobs`;

  const res = await fetch(url, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return res.json();
}

export const appliedJobs = async (userId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/applications?userId=${userId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch applied jobs');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching applied jobs:', error);
    throw error;
  }
};

export const appliedJobsCount = async (userId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/applications/count?userId=${userId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch applied jobs');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching applied jobs:', error);
    throw error;
  }
};

export const jobApplicants = async (jobId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/applications?jobId=${jobId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch job applicants');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching job applicants:', error);
    throw error;
  }
};