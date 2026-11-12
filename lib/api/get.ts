const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default async  function get() {
  const res = await fetch(`${BASE_URL}/jobs`)
  return res.json()
  
  }
