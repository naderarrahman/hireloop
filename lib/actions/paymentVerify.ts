const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const paymentVerify = async (sessionId: string) => {
    const res = await fetch(`${BASE_URL}/payment/verify-payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId }),
    });
    
    if (!res.ok) {
    console.error('Failed to verify payment:', res.statusText);
    return null;
  }

  return await res.json(); 

}
  