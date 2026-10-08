"use client";

import Link from "next/link";
import { useState} from "react";
import PledgeAmountInput from "../components/pledgeamountinput";


const PERSONAL_GOALS = [
  {
    label: "House Fund",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M6 22L24 6l18 16" /><rect x="10" y="22" width="28" height="20" rx="1" /><rect x="18" y="30" width="12" height="12" rx="1" />
      </svg>
    ),
  },
  {
    label: "Wedding Fund",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="16" cy="24" r="9" /><circle cx="32" cy="24" r="9" />
        <path d="M24 16c0-4-3-7-6-7" /><path d="M24 16c0-4 3-7 6-7" />
      </svg>
    ),
  },
  {
    label: "Honeymoon Fund",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M8 36c2-8 6-14 10-18" /><circle cx="32" cy="18" r="8" /><path d="M24 26c4 4 8 6 14 8" /><path d="M14 40h22" />
      </svg>
    ),
  },
  {
    label: "College Fund",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M24 8L4 18l20 10 20-10-20-10z" /><path d="M12 24v10c0 3 6 6 12 6s12-3 12-6V24" /><path d="M40 18v10" />
      </svg>
    ),
  },
  {
    label: "Baby Fund",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="24" cy="20" r="8" /><path d="M10 40c0-8 6-13 14-13s14 5 14 13" /><path d="M20 12c0-3 2-5 4-5" />
      </svg>
    ),
  },
  {
    label: "Car Fund",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M6 28l4-10h28l4 10" /><rect x="4" y="28" width="40" height="12" rx="3" /><circle cx="14" cy="40" r="3" /><circle cx="34" cy="40" r="3" /><path d="M4 32h40" />
      </svg>
    ),
  },
  {
    label: "Emergency Fund",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M24 6l18 32H6L24 6z" /><path d="M24 20v8" /><circle cx="24" cy="32" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Retirement Fund",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="24" cy="22" r="10" /><path d="M14 38c0-4 4-7 10-7s10 3 10 7" /><path d="M24 12V8" /><path d="M30 14l3-3" /><path d="M18 14l-3-3" />
      </svg>
    ),
  },
  {
    label: "Travel Fund",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M6 38L18 12l6 16 6-8 12 18" /><path d="M6 38h36" />
      </svg>
    ),
  },
];

const CHARITY_GOALS = [
  {
    label: "Youth Fitness",
    sub: "Girls on the Run",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="24" cy="12" r="5" /><path d="M16 24l4-8h8l4 8" /><path d="M14 40l4-10" /><path d="M34 40l-4-10" /><path d="M18 30h12" />
      </svg>
    ),
  },
  {
    label: "Hunger Relief",
    sub: "World Central Kitchen",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M12 8v16a8 8 0 0016 0V8" /><path d="M20 8v8" /><path d="M16 8v6" /><path d="M24 8v8" /><path d="M28 8c0 8 4 10 4 16a8 8 0 01-16 0" /><path d="M20 32v8" />
      </svg>
    ),
  },
  {
    label: "Environment",
    sub: "One Tree Planted",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M24 38V22" /><path d="M24 22c0-8 10-14 10-14s0 10-10 14" /><path d="M24 28c0-6-8-10-8-10s0 8 8 10" /><path d="M14 42h20" />
      </svg>
    ),
  },
  {
    label: "Education",
    sub: "Room to Read",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M8 10h32v28H8z" rx="1" /><path d="M24 10v28" /><path d="M8 18h16" /><path d="M24 18h16" /><path d="M8 26h16" /><path d="M24 26h16" />
      </svg>
    ),
  },
  {
    label: "Browse All Causes",
    sub: "40+ charities",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="24" cy="24" r="18" /><path d="M24 6v36" /><path d="M6 24h36" /><path d="M10 14c4 4 8 6 14 6s10-2 14-6" /><path d="M10 34c4-4 8-6 14-6s10 2 14 6" />
      </svg>
    ),
    isLink: true,
  },
];

export default function GoalsPage() {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="min-h-full bg-white text-[#1a1a18]">

      <div className="max-w-6xl mx-auto px-5 lg:px-10">

        {/* HERO — text left, pledge illustration right */}
        <div className="pt-16 pb-14 flex flex-col lg:flex-row items-center gap-10">
          <div className="max-w-3xl">
            <p className="text-[#007EFF] text-xs font-mono-data font-medium tracking-widest mb-4">SET YOUR GOAL</p>
            <h1 className="font-display font-600 text-5xl md:text-6xl lg:text-7xl text-[#1a1a18] leading-[1.0] mb-5">
              Choose what you're 
              <em className="not-italic text-[#FFBF00]"> saving </em>for
            </h1>
            <p className="text-[#3d3d38] text-lg leading-relaxed mb-8 max-w-lg">
              Every run, ride, and hike moves you closer. Pick a personal milestone or a cause you believe in — your pledge does the rest automatically.
            </p>
            <Link href="#" className="inline-block bg-[#FFBF00] text-[#1a1a18] font-bold text-base px-8 py-4 rounded-full hover:bg-[#e6b400] transition-colors">
              Start going the distance
            </Link>
          </div>

          {/* Pledge illustration: a shared goal, a mile trail leading to it, people behind it */}
        </div>

        {/* DIVIDER */}
        <div className="border-t border-black/8 mb-16" />

        {/* ── PERSONAL GOALS ── */}
        <section className="mb-20">
          {/* Section header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#56721c] text-[#B4C78E] px-3 py-1 rounded-full text-xs font-mono-data font-medium mb-3">
                <span className="text-base">🎯</span>
                Personal Goals
              </div>
              <h2 className="font-display font-600 text-3xl md:text-4xl text-[#1a1a18]">
                Save toward your<br />next milestone.
              </h2>
            </div>
            <p className="hidden md:block text-sm text-[#6b6b63] max-w-xs text-right leading-relaxed">
              Your pledge, your timeline. Every mile you log moves money from your account to your goal automatically.
            </p>
          </div>

          {/* Icon grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {PERSONAL_GOALS.map((goal) => (
              <button
                key={goal.label}
                onClick={() => setSelectedGoal({ ...goal, type: "personal" })}
                className="group flex flex-col items-center gap-3 bg-[#f8f8f4] hover:bg-[#56721c] rounded-2xl p-5 transition-all duration-200 hover:shadow-md"
              >
                <span className="text-[#56721c] group-hover:text-[#B4C78E] transition-colors">
                  {goal.icon}
                </span>
                <span className="text-xs font-medium text-[#1a1a18] group-hover:text-white text-center leading-tight transition-colors">
                  {goal.label}
                </span>
              </button>
            ))}
          </div>

          {/* Sub-CTA */}
          <div className="mt-6 flex items-center gap-4">
            <p className="text-sm text-[#6b6b63]">Don't see your goal?</p>
            <Link href="#" className="text-sm font-semibold text-[#56721c] hover:underline">
              Create a custom goal →
            </Link>
          </div>
        </section>

        {selectedGoal?.type === "personal" && (
          <section className="mb-20 bg-[#f8f8f4] rounded-3xl p-8">
            <p className="text-[#007EFF] text-xs font-mono-data font-medium tracking-widest mb-3">
              YOUR GOAL
            </p>
            <h2 className="font-display font-600 text-2xl text-[#1a1a18] mb-6">
              {selectedGoal.label}
            </h2>

            {isSignedIn ? (
              <div className="text-[#3d3d38]">
                <PledgeAmountInput />
              </div>
            ) : (
              <div>
                <p className="text-[#3d3d38] mb-4">Sign in to set your pledge for this goal.</p>
                <button
                  onClick={() => setIsSignedIn(true)}
                  className="bg-[#56721c] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#698C22] transition-colors"
                >
                  Sign in
               </button>
             </div>
           )}
         </section>
      )}

        {/* DIVIDER */}
        <div className="border-t border-black/8 mb-16" />

        {/* ── GIVE TO A CAUSE ── */}
        <section className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FFBF00] text-[#1a1a18] px-3 py-1 rounded-full text-xs font-mono-data font-medium mb-3">
                <span className="text-base">❤️</span>
                Give to a Cause
              </div>
              <h2 className="font-display font-600 text-3xl md:text-4xl text-[#1a1a18]">
                Run for something<br />larger than yourself.
              </h2>
            </div>
            <p className="hidden md:block text-sm text-[#6b6b63] max-w-xs text-right leading-relaxed">
              Your miles fund real organizations doing real work. 100% of your pledge goes directly to the charity.
            </p>
          </div>

          {/* Charity icon tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CHARITY_GOALS.map((goal) => {
              const tileClasses = `group flex flex-col items-center gap-3 rounded-2xl p-6 transition-all duration-200 hover:shadow-md text-center ${
                goal.isLink ? "bg-[#56721c] hover:bg-[#698C22]" : "bg-[#f8f8f4] hover:bg-[#FFBF00]"
              }`;

              if (goal.isLink) {
                return (
                  <Link key={goal.label} href="/charities" className={tileClasses}>
                    <span className="text-[#B4C78E]">{goal.icon}</span>
                    <div>
                      <p className="text-sm font-semibold leading-tight text-white">{goal.label}</p>
                      <p className="text-xs mt-0.5 text-[#B4C78E]">{goal.sub}</p>
                   </div>
                  </Link>
                );
              }

              return (
                <button 
                  key={goal.label} 
                  onClick={() => setSelectedGoal({ ...goal, type: "charity" })}
                  className={tileClasses}
                >
                  <span className="text-[#56721c] group-hover:text-[#1a1a18]">{goal.icon}</span>
                  <div>
                    <p className="text-sm font-semibold leading-tight text-[#1a1a18]">{goal.label}</p>
                    <p className="text-xs mt-0.5 text-[#6b6b63] group-hover:text-[#3d3d38]">{goal.sub}</p>
                  </div>
                </button>
             );
           })}
          </div>

          <div className="mt-6">
            <Link href="/charities" className="text-sm font-semibold text-[#56721c] hover:underline">
              Browse all 40+ charities →
            </Link>
          </div>
        </section>
        
        {selectedGoal?.type === "charity" && (
          <section className="mb-20 bg-[#f8f8f4] rounded-3xl p-8">
            <p className="text-[#007EFF] text-xs font-mono-data font-medium tracking-widest mb-3">
              YOUR PLEDGE
            </p>
            <h2 className="font-display font-600 text-2xl text-[#1a1a18] mb-6">
              {selectedGoal.label}
            </h2>

            {isSignedIn ? (
              <div className="text-[#3d3d38]">
                <PledgeAmountInput />
              </div>
            ) : (
              <div>
                <p className="text-[#3d3d38] mb-4">Sign in to set your pledge for this goal.</p>
                <button
                  onClick={() => setIsSignedIn(true)}
                  className="bg-[#56721c] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#698C22] transition-colors"
                >
                  Sign in
               </button>
             </div>
           )}
         </section>
      )}

        {/* BOTTOM TRUST STRIP */}
        <div className="border-t border-black/8 py-14 mb-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { val: "$4.2M", label: "saved & donated by DistanceForDollars members", icon: "💰" },
              { val: "18,400", label: "active members running toward goals", icon: "🏃" },
              { val: "40+", label: "vetted charity partners to run for", icon: "❤️" },
            ].map((s) => (
              <div key={s.val} className="flex flex-col items-center gap-2">
                <span className="text-2xl">{s.icon}</span>
                <p className="font-display font-600 text-4xl text-[#56721c]">{s.val}</p>
                <p className="text-sm text-[#6b6b63] max-w-[180px] leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
