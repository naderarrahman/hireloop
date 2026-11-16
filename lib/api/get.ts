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