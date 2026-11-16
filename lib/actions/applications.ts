const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface ApplicationData {
  jobId: string;
  jobTitle: string;
  companyName: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: string;
}

export const applyForApplication = async (applicationData: ApplicationData) => {
  try {
    const response = await fetch(`${BASE_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
      throw new Error('Failed to create application');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
};