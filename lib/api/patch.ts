const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const updateApplicationStatus = async (applicationId: string, status: string) => {
  try {
    const res = await fetch(`${BASE_URL}/applications/${applicationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      throw new Error('Failed to update application status');
    }

    return res.json();
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};

export const updateUserRole = async (userId: string, role: string) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update user role');
    }

    return res.json();
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};