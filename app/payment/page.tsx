import PaymentForm from "@/components/payment/PaymentForm";

export default async function PaymentPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ canceled?: string }> 
}) {
  const { canceled } = await searchParams;

  if (canceled) {
    console.log("Order canceled -- continue to shop around and check out when you're ready.");
  }

  return <PaymentForm />;
}