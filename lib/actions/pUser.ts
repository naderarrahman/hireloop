const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const premiumUser = async ({ userId }: { userId: string }) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/isPremium`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch premium status');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching premium status:', error);
    return { isPremium: false }; 
};
}