"use client";

import { useState } from "react";

const CATEGORIES = ["All", "Youth Fitness", "Hunger Relief", "Environment", "Education", "Health", "Animals", "Disaster Relief"];

const FEATURED = {
  logo: "🏃‍♀️",
  logoColor: "#2d6a2d",
  name: "Girls on the Run",
  tagline: "Youth Fitness · National",
  bullets: [
    { icon: "📍", text: "Pledge any amount per mile — 100% goes to Girls on the Run programs" },
    { icon: "🏅", text: "Earn a RunFund digital badge when you hit 26.2 miles for this cause" },
    { icon: "📅", text: "Oct 1, 2026 to Dec 31, 2026" },
  ],
  raised: 241800,
  goal: 500000,
  runners: 1840,
  img: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200&h=600&fit=crop&auto=format",
};

const CHARITIES = [
  {
    id: 1,
    logo: "🏃‍♀️",
    logoColor: "#2d6a2d",
    name: "Girls on the Run",
    category: "Youth Fitness",
    goal: "26.2 miles for youth fitness",
    dates: "Oct 1 – Dec 31, 2026",
    runners: 1840,
    raised: 241800,
    target: 500000,
    img: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&h=340&fit=crop&auto=format",
    friends: 3,
  },
  {
    id: 2,
    logo: "🍽️",
    logoColor: "#b84a1a",
    name: "World Central Kitchen",
    category: "Hunger Relief",
    goal: "Log miles to fund meals",
    dates: "Oct 1 – Oct 31, 2026",
    runners: 920,
    raised: 110400,
    target: 250000,
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=340&fit=crop&auto=format",
    friends: 1,
  },
  {
    id: 3,
    logo: "🌲",
    logoColor: "#3D4127",
    name: "One Tree Planted",
    category: "Environment",
    goal: "1 tree planted per 10 miles",
    dates: "Sep 1 – Nov 30, 2026",
    runners: 2310,
    raised: 89000,
    target: 200000,
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=340&fit=crop&auto=format",
    friends: 5,
  },
  {
    id: 4,
    logo: "📚",
    logoColor: "#1a4a8a",
    name: "Room to Read",
    category: "Education",
    goal: "Fund literacy programs globally",
    dates: "Oct 1 – Dec 31, 2026",
    runners: 640,
    raised: 64000,
    target: 150000,
    img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=340&fit=crop&auto=format",
    friends: 2,
  },
  {
    id: 5,
    logo: "👟",
    logoColor: "#6b3a8a",
    name: "Back on My Feet",
    category: "Health",
    goal: "Run to fight homelessness",
    dates: "Oct 15 – Nov 15, 2026",
    runners: 420,
    raised: 42000,
    target: 100000,
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=340&fit=crop&auto=format",
    friends: 0,
  },
  {
    id: 6,
    logo: "🌬️",
    logoColor: "#0a6a8a",
    name: "Clean Air Fund",
    category: "Environment",
    goal: "Miles for clean air advocacy",
    dates: "Nov 1 – Nov 30, 2026",
    runners: 310,
    raised: 31000,
    target: 80000,
    img: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&h=340&fit=crop&auto=format",
    friends: 1,
  },
  {
    id: 7,
    logo: "🐾",
    logoColor: "#8a4a1a",
    name: "ASPCA",
    category: "Animals",
    goal: "Log miles to protect animals",
    dates: "Oct 1 – Dec 31, 2026",
    runners: 780,
    raised: 78000,
    target: 200000,
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=340&fit=crop&auto=format",
    friends: 2,
  },
  {
    id: 8,
    logo: "🏥",
    logoColor: "#8a1a1a",
    name: "Direct Relief",
    category: "Disaster Relief",
    goal: "Fund emergency medical aid",
    dates: "Oct 1 – Oct 31, 2026",
    runners: 510,
    raised: 51000,
    target: 120000,
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=340&fit=crop&auto=format",
    friends: 0,
  },
];

function formatMoney(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n}`;
}

export default function CharitiesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [pledged, setPledged] = useState<Set<number>>(new Set());

  const filtered = activeCategory === "All"
    ? CHARITIES
    : CHARITIES.filter(c => c.category === activeCategory);

  const togglePledge = (id: number) => {
    setPledged(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const featuredPct = Math.round((FEATURED.raised / FEATURED.goal) * 100);

  return (
    <div className="min-h-full bg-white text-[#1a1a18]">

      <div className="max-w-6xl mx-auto px-5 lg:px-10 py-10">

        {/* FEATURED HERO — Strava challenge layout */}
        <div className="flex flex-col lg:flex-row gap-0 rounded-3xl overflow-hidden border border-black/8 mb-10">
          {/* Left panel */}
          <div className="lg:w-72 shrink-0 p-8 bg-white flex flex-col">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-5"
              style={{ backgroundColor: FEATURED.logoColor + "20" }}>
              {FEATURED.logo}
            </div>
            <p className="text-[#007EFF] text-xs font-mono-data font-medium tracking-widest mb-1">FEATURED CAUSE</p>
            <h2 className="font-display font-600 text-2xl text-[#1a1a18] leading-tight mb-5">{FEATURED.name}</h2>

            <div className="space-y-3 mb-6 flex-1">
              {FEATURED.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-sm shrink-0 mt-0.5">{b.icon}</span>
                  <p className="text-xs text-[#3d3d38] leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mb-5">
              <div className="flex justify-between mb-1.5">
                <span className="font-display font-600 text-xl text-[#1a1a18]">{formatMoney(FEATURED.raised)}</span>
                <span className="text-xs text-[#6b6b63] self-end">of {formatMoney(FEATURED.goal)}</span>
              </div>
              <div className="w-full h-2 bg-black/8 rounded-full mb-1.5">
                <div className="h-2 bg-[#007EFF] rounded-full" style={{ width: `${featuredPct}%` }} />
              </div>
              <p className="text-xs text-[#6b6b63]">{FEATURED.runners.toLocaleString()} RunFund members running for this</p>
            </div>

            <button className="w-full bg-[#FFBF00] text-[#1a1a18] font-bold text-sm py-3 rounded-full hover:bg-[#e6b400] transition-colors">
              Pledge Miles to This Cause
            </button>
          </div>

          {/* Right hero image */}
          <div className="flex-1 relative min-h-[280px] lg:min-h-0">
            <img
              src={FEATURED.img}
              alt={FEATURED.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent lg:from-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div className="bg-[#56721c]/90 backdrop-blur-sm text-white rounded-2xl px-4 py-3">
                <p className="text-[#B4C78e] text-xs font-mono-data mb-0.5">MILES LOGGED THIS MONTH</p>
                <p className="font-display font-600 text-2xl">94,820 mi</p>
              </div>
              <div className="bg-[#FFBF00] text-[#1a1a18] rounded-2xl px-4 py-3 font-mono-data font-bold text-sm">
                {featuredPct}% funded
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all shrink-0 ${
                activeCategory === cat
                  ? "bg-[#56721c] text-white border-[#56721c]"
                  : "bg-white text-[#3d3d38] border-black/15 hover:border-[#56721c]/40 hover:text-[#56721c]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* RECOMMENDED HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#56721c] flex items-center justify-center">
            <span className="text-[#B4C78e] text-[10px] font-bold font-mono-data">DFD</span>
          </div>
          <div>
            <p className="font-semibold text-[#1a1a18] text-sm">
              {activeCategory === "All" ? "Causes your miles can fund" : activeCategory}
            </p>
            <p className="text-[#6b6b63] text-xs">Based on your activity and interests</p>
          </div>
        </div>

        {/* CHARITY CARD GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((charity) => {
            const pct = Math.round((charity.raised / charity.target) * 100);
            const isPledged = pledged.has(charity.id);
            return (
              <div key={charity.id} className="bg-white rounded-2xl border border-black/8 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                {/* Card header: badge + image side by side (Strava pattern) */}
                <div className="flex h-28">
                  <div className="w-20 shrink-0 flex items-center justify-center border-r border-black/6"
                    style={{ backgroundColor: charity.logoColor + "15" }}>
                    <span className="text-3xl">{charity.logo}</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <img
                      src={charity.img}
                      alt={charity.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <p className="font-semibold text-[#1a1a18] text-sm leading-tight mb-1">{charity.name}</p>

                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[#3d3d38] text-xs">{charity.goal}</span>
                  </div>
                  <p className="text-[#6b6b63] text-xs mb-3">{charity.dates}</p>

                  {/* GoFundMe progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-mono-data font-medium text-[#1a1a18]">{formatMoney(charity.raised)}</span>
                      <span className="text-[#6b6b63]">{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/8 rounded-full">
                      <div className="h-1.5 bg-[#007EFF] rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  {/* Social proof — Strava's "X friends joined" */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex -space-x-1">
                        {[...Array(Math.min(charity.friends, 3))].map((_, i) => (
                          <div key={i} className="w-5 h-5 rounded-full bg-[#B4C78e] border-2 border-white flex items-center justify-center">
                            <span className="text-[#56721c] text-[8px] font-bold">R</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[#6b6b63] text-xs">
                        {charity.friends > 0
                          ? `${charity.friends} friend${charity.friends > 1 ? "s" : ""} running`
                          : `${charity.runners.toLocaleString()} running`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-4 pb-4">
                  <button
                    onClick={() => togglePledge(charity.id)}
                    className={`w-full text-sm font-semibold py-2.5 rounded-full transition-all ${
                      isPledged
                        ? "bg-[#56721c] text-white"
                        : "bg-[#FFBF00] text-[#1a1a18] hover:bg-[#e6b400]"
                    }`}
                  >
                    {isPledged ? "✓ Miles Pledged" : "Pledge Miles"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load more */}
        <div className="text-center mt-12">
          <button className="border border-black/15 text-[#3d3d38] text-sm font-semibold px-8 py-3 rounded-full hover:border-[#3D4127] hover:text-[#3D4127] transition-colors">
            Browse all 40+ charities
          </button>
        </div>
      </div>
    </div>
  );
}