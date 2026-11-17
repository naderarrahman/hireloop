"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck, CreditCard, Loader2 } from "lucide-react";

export default function PaymentForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePay = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        credentials: "include", 
      });

      if (res.status === 401) {
        alert("You must be logged in to make a payment. Please sign in again.");
        setIsLoading(false);
        return;
      }

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; 
      } else {
        alert(data.error || "Failed to create checkout session");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans flex items-center justify-center">
      <div className="max-w-[500px] w-full bg-[#151515] border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl">
        
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard/seeker/applications" className="p-2 bg-[#0a0a0a] rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800">
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-400 border border-zinc-700 px-3 py-1 rounded">
            <Lock className="w-3 h-3" /> SANDBOX SECURE
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Upgrade to Pro</h1>
          <p className="text-sm text-zinc-400">Get unlimited applications and premium features.</p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-white">$20.00</span>
            <span className="text-zinc-500 text-sm mt-1">/ one-time</span>
          </div>
        </div>

        <div className="space-y-3 mb-8 bg-[#0a0a0a] border border-zinc-800/50 p-4 rounded-xl">
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Unlimited Job Applications
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Priority Support
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Early Access to New Jobs
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={isLoading}
          className="w-full bg-[#5A45FF] hover:bg-[#4a36ee] text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg shadow-lg shadow-[#5A45FF]/20"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <CreditCard className="w-5 h-5" /> Pay with Card
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 mt-6">
          <Lock className="w-3 h-3" /> Payments are processed securely via Stripe.
        </div>
      </div>
    </div>
  );
}