
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Lock, CreditCard, HelpCircle, ShieldCheck 
} from "lucide-react";

export default function PaymentPage() {
  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/seeker/applications" className="p-2 bg-[#151515] rounded-full hover:bg-zinc-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </Link>
            <div className="p-2 bg-[#151515] rounded-full">
              <Lock className="w-4 h-4 text-zinc-400" />
            </div>
          </div>
          <div className="text-xs font-bold tracking-widest text-zinc-400 border border-zinc-700 px-3 py-1 rounded">
            SANDBOX
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          
          {/* Left Column: Order Summary */}
          <div className="space-y-8">
            <div>
              <p className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase mb-3">
                Choose a currency:
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrency("BDT")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                    currency === "BDT"
                      ? "bg-[#151515] border-white text-white"
                      : "bg-[#0a0a0a] border-zinc-800 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  <span>🇧🇩</span> BDT 2,553.33
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                    currency === "USD"
                      ? "bg-[#151515] border-white text-white"
                      : "bg-[#0a0a0a] border-zinc-800 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  <span>🇺🇸</span> $20.00
                </button>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                1 USD = 127.6665 BDT
              </p>
            </div>

            <div className="h-px bg-zinc-800/60 w-full" />

            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Hireloop Pro Plan</h2>
                <p className="text-sm text-zinc-400 mt-1">Access to all features</p>
              </div>
              <div className="text-lg font-bold text-white">
                {currency === "BDT" ? "BDT 2,553.33" : "$20.00"}
              </div>
            </div>
          </div>

          {/* Right Column: Payment Form */}
          <div className="space-y-6">
            
            {/* Link Button */}
            <button className="w-full bg-[#00d66f] hover:bg-[#00c264] text-black font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <div className="bg-black text-white text-xs px-2 py-1 rounded-sm font-black italic">link</div>
              <div className="bg-[#1a1a1a] text-white text-xs px-2 py-1 rounded-sm font-bold flex items-center gap-1">
                VISA <span className="text-[10px]">4242</span>
              </div>
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="h-px bg-zinc-800 flex-1" />
              <span className="text-xs text-zinc-500 font-medium">OR</span>
              <div className="h-px bg-zinc-800 flex-1" />
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">Contact information</h3>
              <div>
                <label className="text-[11px] font-medium text-zinc-400 mb-1 block">Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full bg-[#151515] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">Payment method</h3>
              
              <div className="bg-[#151515] border border-zinc-800 rounded-xl overflow-hidden">
                {/* Card Tab */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-[#1a1a1a]">
                  <CreditCard className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">Card</span>
                </div>

                <div className="p-4 space-y-4">
                  {/* Card Number */}
                  <div>
                    <label className="text-[10px] font-semibold text-zinc-400 tracking-wider uppercase mb-1.5 block">
                      Card Information
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234 1234 1234 1234"
                        className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-t-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <div className="w-6 h-4 bg-blue-600 rounded-sm text-[8px] flex items-center justify-center font-bold">VISA</div>
                        <div className="w-6 h-4 bg-red-500 rounded-sm text-[8px] flex items-center justify-center font-bold">MC</div>
                      </div>
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-1/2 bg-[#0a0a0a] border-x border-b border-zinc-800 rounded-bl-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors border-r-zinc-800/50"
                      />
                      <div className="relative w-1/2">
                        <input
                          type="text"
                          placeholder="CVC"
                          className="w-full bg-[#0a0a0a] border-r border-b border-zinc-800 rounded-br-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                        />
                        <HelpCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                      </div>
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="text-[10px] font-semibold text-zinc-400 tracking-wider uppercase mb-1.5 block">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Full name on card"
                      className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="text-[10px] font-semibold text-zinc-400 tracking-wider uppercase mb-1.5 block">
                      Country or Region
                    </label>
                    <select className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors appearance-none">
                      <option value="BD">Bangladesh</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="CA">Canada</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Info Checkbox */}
            <div className="flex items-start gap-3 bg-[#151515] border border-zinc-800 p-4 rounded-xl">
              <input 
                type="checkbox" 
                className="mt-1 w-4 h-4 rounded border-zinc-700 bg-[#0a0a0a] accent-blue-600 cursor-pointer" 
              />
              <div>
                <p className="text-sm font-medium text-zinc-300">Save my information for faster checkout</p>
                <p className="text-xs text-zinc-500 mt-0.5">Pay securely on this site and everywhere Link is accepted.</p>
              </div>
            </div>

            {/* Pay Button */}
            <button className="w-full bg-[#0070e0] hover:bg-[#005bb5] text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2">
              Pay
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 mt-4">
              <ShieldCheck className="w-4 h-4" /> Payments are secure and encrypted
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}