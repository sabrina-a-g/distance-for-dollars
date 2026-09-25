"use client";

import { useState } from "react";
import CharitySearch from "./components/charitysearch";

// Colors: #56721c (olive dark), #698C22 (olive mid), #636B2F (olive),
//         #B4C78E (light olive), #FFBF00 (amber), #007EFF (blue), #f8f8f4 (off-white)

const NAV_LINKS = [
  { label: "How it Works", href: "#" },
  { label: "Goals", href: "#" },
  { label: "Charities", href: "#" },
  { label: "Pricing", href: "#" },
];

const STEPS = [
  {
    num: "1",
    title: "Connect your tracker",
    body: "Link Strava, Apple Health, or Garmin in 30 seconds. GPS-verified miles only.",
  },
  {
    num: "2",
    title: "Set your pledge",
    body: "Choose any amount from $0.10 to $5.00 per mile. Change it anytime, no penalties.",
  },
  {
    num: "3",
    title: "Pick your goal",
    body: "Save toward a personal milestone, donate to a charity, or split between both.",
  },
  {
    num: "4",
    title: "Watch it grow",
    body: "Every week DistanceForDollars tallies your miles and moves your pledge automatically.",
  },
];

const DISCOVER_CARDS = [
  {
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&auto=format",
    tag: "Wedding Fund",
    title: "Maya & Jordan's Big Day",
    detail: "94 mi logged",
    pct: 38,
  },
  {
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop&auto=format",
    tag: "Home Down Payment",
    title: "First Home by Spring 2027",
    detail: "320 mi this quarter",
    pct: 37,
  },
  {
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop&auto=format",
    tag: "Charity",
    title: "Running for Girls on the Run",
    detail: "188 mi logged",
    pct: 78,
  },
  {
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop&auto=format",
    tag: "Family Fund",
    title: "Baby on the Way",
    detail: "112 mi logged",
    pct: 22,
  },
];

const LIVE_FEED = [
  { name: "DeShawn W.", action: "logged 10.1 mi", goal: "Wedding Fund", time: "2m ago" },
  { name: "Sara R.", action: "logged 18.5 mi", goal: "Home Fund", time: "14m ago" },
  { name: "Alex K.", action: "logged 8.0 mi", goal: "Girls on the Run", time: "31m ago" },
  { name: "Priya N.", action: "logged 6.2 mi", goal: "Wedding Fund", time: "1h ago" },
  { name: "Marcus T.", action: "logged 22.0 mi", goal: "Home Fund", time: "2h ago" },
];

const CHARITIES = [
  { name: "Girls on the Run", category: "Youth Fitness", raised: "$2.4M", logo: "🏃‍♀️" },
  { name: "World Central Kitchen", category: "Hunger Relief", raised: "$1.1M", logo: "🍽️" },
  { name: "One Tree Planted", category: "Environment", raised: "$890K", logo: "🌲" },
  { name: "Room to Read", category: "Education", raised: "$640K", logo: "📚" },
  { name: "Back on My Feet", category: "Homelessness", raised: "$420K", logo: "👟" },
  { name: "Clean Air Fund", category: "Climate", raised: "$310K", logo: "🌬️" },
];

const TESTIMONIALS = [
  {
    quote: "I've tried every savings app. DistanceForDollars is the only one that made me actually look forward to checking my balance.",
    name: "Maya Chen",
    detail: "Half marathon runner · 94 miles logged",
    avatar: "MC",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote: "Accountability changed everything. I know every mile I skip is a dollar not going to the cause I believe in.",
    name: "DeShawn Williams",
    detail: "Trail runner · 100 miles logged",
    avatar: "DW",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote: "We set $0.50/mile and didn't think much of it. We've contributed $1,100 to our home fund this year.",
    name: "Sara & Tom Reyes",
    detail: "Cycling couple · 2,200 miles logged",
    avatar: "SR",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format",
  },
];

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pledgeAmount, setPledgeAmount] = useState(0.5);
  const [milesExample, setMilesExample] = useState(80);

  const monthlyEarned = (pledgeAmount * milesExample).toFixed(0);
  const yearlyEarned = (pledgeAmount * milesExample * 12).toFixed(0);

  return (
    <div className="min-h-full bg-white text-[#1a1a18] overflow-x-hidden">
      
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-black/8">
        <div className="max-w-6xl mx-auto px-5 lg:px-10 h-16 grid grid-cols-3 items-center gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 justify-self-start">
            <span className="w-7 h-7 rounded-full bg-[#56721c] flex items-center justify-center">
              <span className="text-[#B4C78E] text-[10px] font-bold font-mono-data">DFD</span>
            </span>
            <span className="font-display font-600 text-base tracking-tight text-[#56721c]">DistanceForDollars</span>
          </a>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-6 justify-self-center">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-[#3d3d38] hover:text-[#56721c] transition-colors font-medium">
                {l.label}
              </a>
            ))}
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-2 justify-self-end">
            <a href="#" className="hidden md:block text-sm font-medium text-[#3d3d38] hover:text-[#56721c] px-3 py-2 transition-colors">
              Log in
            </a>
            <a href="#" className="bg-[#56721c] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#698C22] transition-colors">
              Start going the distance
            </a>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className="block w-5 h-0.5 bg-[#1a1a18] mb-1"></span>
              <span className="block w-5 h-0.5 bg-[#1a1a18] mb-1"></span>
              <span className="block w-5 h-0.5 bg-[#1a1a18]"></span>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-black/8 px-5 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-[#3d3d38] font-medium py-1">{l.label}</a>
            ))}
            <a href="#" className="text-sm text-[#3d3d38] font-medium py-1">Log in</a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="bg-white pt-16 pb-0">
        <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 border border-[#56721c]/20 bg-[#f8f8f4] px-3.5 py-1.5 rounded-full text-xs font-mono-data font-medium text-[#56721c] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFBF00]"></span>
            The #1 mileage-to-savings platform
          </div>

          <h1 className="font-display font-600 text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-[#FFBF00] mb-6">
            Every mile<br />
            <span className="text-[#1a1a18]"> funds what matters</span>
            <em className="not-italic text-[#FFBF00]"> most.</em>
          </h1>

          <p className="text-lg text-[#3d3d38] max-w-xl mx-auto leading-relaxed mb-10">
            Connect your activity app, set a per-mile pledge from your own money, and watch every run, ride, and step build toward your personal goal or a charity — automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <a href="#" className="bg-[#FFBF00] text-[#1a1a18] font-bold text-base px-8 py-4 rounded-full hover:bg-[#e6b400] transition-colors">
              Start going the distance — it's free
            </a>
            <a href="#" className="border border-black/15 text-[#1a1a18] font-semibold text-base px-8 py-4 rounded-full hover:bg-[#f8f8f4] transition-colors">
              See how it works
            </a>
          </div>

          {/* Stat bar */}
          <div className="flex items-center justify-center gap-8 pb-12 border-b border-black/8">
            {[
              { val: "$4.2M", label: "saved & donated" },
              { val: "18,400", label: "active members" },
              { val: "2.6M", label: "miles logged" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-display font-600 text-2xl text-[#56721c]">{s.val}</p>
                <p className="text-xs text-[#6b6b63] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live feed strip */}
        <div className="bg-[#56721c] py-3 overflow-hidden">
          <div className="flex gap-10 animate-none">
            <div className="flex gap-10 items-center px-6 flex-wrap lg:flex-nowrap">
              {LIVE_FEED.map((f, i) => (
                <div key={i} className="flex items-center gap-2 whitespace-nowrap shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFBF00]"></span>
                  <span className="text-white/70 text-xs font-mono-data">{f.name}</span>
                  <span className="text-white/40 text-xs">{f.action}</span>
                  <span className="text-[#007EFF] text-xs font-mono-data font-medium">→ {f.goal}</span>
                  <span className="text-white/25 text-xs">{f.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative h-[420px] md:h-[520px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1600&h=600&fit=crop&auto=format"
            alt="Runners on a trail at sunrise"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/0 to-white/0" />
        </div>
      </section>

      {/* ── BIG STAT CALLOUT ── */}
      <section className="bg-white py-20 text-center border-b border-black/8">
        <div className="max-w-4xl mx-auto px-5">
          <p className="font-display font-600 text-4xl md:text-5xl lg:text-6xl text-[#1a1a18] leading-tight">
            Members contribute an average of{" "}
            <span className="text-[#FFBF00]">$47 per week</span>{" "}
            toward their goals — just by moving like they already do.
          </p>
          <p className="text-[#6b6b63] text-sm mt-6">*Based on members logging 80+ miles/month at a $0.50/mile pledge</p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[#f8f8f4] py-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-[#007EFF] text-xs font-mono-data font-medium tracking-widest mb-3">HOW IT WORKS</p>
            <h2 className="font-display font-600 text-4xl md:text-5xl text-[#1a1a18]">Set it once. Move like normal.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col">
                <div className="w-10 h-10 rounded-full bg-[#56721c] flex items-center justify-center mb-5">
                  <span className="text-[#B4C78E] text-sm font-mono-data font-bold">{step.num}</span>
                </div>
                <h3 className="font-display font-600 text-xl text-[#1a1a18] mb-3">{step.title}</h3>
                <p className="text-[#3d3d38] text-sm leading-relaxed">{step.body}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCOVERY CARDS ── */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#007EFF] text-xs font-mono-data font-medium tracking-widest mb-3">ACTIVE GOALS</p>
              <h2 className="font-display font-600 text-4xl md:text-5xl text-[#1a1a18]">See what members<br />are building toward.</h2>
            </div>
            <a href="#" className="hidden md:block text-sm font-semibold text-[#56721c] hover:underline">
              Browse all →
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DISCOVER_CARDS.map((card, i) => (
              <div key={i} className="group cursor-pointer rounded-2xl overflow-hidden border border-black/8 hover:shadow-lg transition-shadow">
                <div className="relative h-44 overflow-hidden bg-[#e8e8e0]">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#FFBF00] text-[#1a1a18] text-xs font-semibold px-2.5 py-1 rounded-full">
                      {card.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-semibold text-[#1a1a18] text-sm mb-1">{card.title}</p>
                  <p className="text-[#6b6b63] text-xs mb-4">{card.detail}</p>
                  {/* Progress */}
                  <div className="w-full h-1.5 bg-black/8 rounded-full mb-1.5">
                    <div className="h-1.5 bg-[#007EFF] rounded-full" style={{ width: `${card.pct}%` }} />
                  </div>
                  <p className="text-[#007EFF] text-xs font-mono-data font-medium">{card.pct}% funded</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLEDGE CALCULATOR ── */}
      <section className="bg-[#56721c] py-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#B4C78E] text-xs font-mono-data font-medium tracking-widest mb-4">PLEDGE CALCULATOR</p>
              <h2 className="font-display font-600 text-4xl md:text-5xl text-white leading-tight mb-5">
                Small pledge.<br />Real progress.
              </h2>
              <p className="text-white/60 leading-relaxed mb-10">
                See exactly what your pledge adds up to without changing a single workout.
              </p>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-medium text-white/80">Per-mile pledge</label>
                    <span className="font-mono-data text-[#FFBF00] font-medium text-sm">${pledgeAmount.toFixed(2)} / mi</span>
                  </div>
                  <input type="range" min="0.10" max="5.00" step="0.05" value={pledgeAmount}
                    onChange={(e) => setPledgeAmount(parseFloat(e.target.value))}
                    className="w-full accent-[#FFBF00] cursor-pointer" />
                  <div className="flex justify-between text-xs text-white/30 mt-1"><span>$0.10</span><span>$5.00</span></div>
                </div>
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-medium text-white/80">Monthly miles (typical)</label>
                    <span className="font-mono-data text-[#FFBF00] font-medium text-sm">{milesExample} mi / mo</span>
                  </div>
                  <input type="range" min="10" max="300" step="5" value={milesExample}
                    onChange={(e) => setMilesExample(parseInt(e.target.value))}
                    className="w-full accent-[#FFBF00] cursor-pointer" />
                  <div className="flex justify-between text-xs text-white/30 mt-1"><span>10 mi</span><span>300 mi</span></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8">
              <p className="text-[#6b6b63] text-xs font-mono-data tracking-widest mb-8">YOUR PROJECTION</p>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-black/8 pb-6">
                  <div>
                    <p className="text-[#6b6b63] text-sm">Per month</p>
                    <p className="font-display font-600 text-4xl text-[#1a1a18] mt-1">${monthlyEarned}</p>
                  </div>
                  <span className="text-xs font-mono-data text-[#6b6b63] bg-[#f8f8f4] px-2 py-1 rounded-full">avg</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/8 pb-6">
                  <div>
                    <p className="text-[#6b6b63] text-sm">Per week</p>
                    <p className="font-display font-600 text-4xl text-[#1a1a18] mt-1">${(pledgeAmount * milesExample / 4).toFixed(2)}</p>
                  </div>
                  <span className="text-xs font-mono-data text-[#6b6b63] bg-[#f8f8f4] px-2 py-1 rounded-full">avg</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#6b6b63] text-sm">One year from today</p>
                    <p className="font-display font-600 text-5xl text-[#56721c] mt-1">${parseInt(yearlyEarned).toLocaleString()}</p>
                  </div>
                  <span className="text-xs font-mono-data text-[#007EFF] bg-[#007EFF]/10 px-2 py-1 rounded-full">total saved</span>
                </div>
              </div>
              <p className="text-[#6b6b63] text-xs mt-8">No commitment — change your pledge anytime. Money is yours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST / IMAGE BLOCK ── */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden h-[440px] bg-[#e8e8e0]">
                <img
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop&auto=format"
                  alt="Couple celebrating a milestone"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-4 lg:right-8 bg-[#56721c] text-white rounded-2xl px-6 py-5 shadow-xl">
                <p className="text-[#B4C78E] text-xs font-mono-data mb-1">THIS MONTH</p>
                <p className="font-display font-600 text-3xl">$112.00</p>
                <p className="text-white/50 text-xs mt-1">224 miles logged</p>
              </div>
            </div>
            <div className="pt-8 lg:pt-0">
              <p className="text-[#007EFF] text-xs font-mono-data font-medium tracking-widest mb-4">YOUR MONEY, YOUR RULES</p>
              <h2 className="font-display font-600 text-4xl md:text-5xl text-[#1a1a18] leading-tight mb-6">
                Nothing to lose.<br />Everything to gain.
              </h2>
              <div className="space-y-5 mb-10">
                {[
                  { icon: "✓", label: "Your pledge comes from your own account — not sponsors." },
                  { icon: "✓", label: "No money at risk. Unlike StepBet, you never lose a cent." },
                  { icon: "✓", label: "Change or pause your pledge anytime, for any reason." },
                  { icon: "✓", label: "GPS-verified miles via activity tracking. No manual entries count." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#FFBF00] flex items-center justify-center text-[#1a1a18] text-xs font-bold shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <p className="text-[#3d3d38] text-sm leading-relaxed">{item.label}</p>
                  </div>
                ))}
              </div>
              <a href="#" className="inline-block bg-[#56721c] text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-[#698C22] transition-colors">
                Make your move
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHARITIES ── */}
      <section className="bg-[#f8f8f4] py-24 border-t border-black/8">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#007EFF] text-xs font-mono-data font-medium tracking-widest mb-3">PARTNER CHARITIES</p>
              <h2 className="font-display font-600 text-4xl md:text-5xl text-[#1a1a18]">
                Go the
                <span className="text-[#FFBF00]"> distance</span>{" "} for something<br />
                <span className="text-[#FFBF00]">bigger</span>{" "} than yourself.
              </h2>
            </div>
            <a href="#" className="hidden md:block text-sm font-semibold text-[#56721c] hover:underline">
              Browse 40+ charities →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CHARITIES.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-black/8 hover:border-[#56721c]/30 hover:shadow-sm transition-all cursor-pointer group text-center">
                <div className="text-3xl mb-3">{c.logo}</div>
                <p className="font-semibold text-[#1a1a18] text-sm mb-1 leading-tight">{c.name}</p>
                <p className="text-[#6b6b63] text-xs mb-3">{c.category}</p>
                <p className="text-[#007EFF] text-xs font-mono-data font-medium">{c.raised} raised</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-white py-24 border-t border-black/8">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-[#007EFF] text-xs font-mono-data font-medium tracking-widest mb-3">MEMBER STORIES</p>
            <h2 className="font-display font-600 text-4xl md:text-5xl text-[#1a1a18]">The distance is real.<br />The impact is too.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-[#f8f8f4] rounded-3xl p-8 flex flex-col">
                <p className="font-display italic text-[#1a1a18] text-lg leading-relaxed mb-8 flex-1">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover bg-[#e8e8e0]" />
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a18]">{t.name}</p>
                    <p className="text-xs text-[#6b6b63]">{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#FFBF00] py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(135deg, rgb(26, 58, 42) 25%, transparent 25%), linear-gradient(225deg, rgb(26, 58, 42) 25%, transparent 25%)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="max-w-4xl mx-auto px-5 text-center relative">
          <h2 className="font-display font-600 text-5xl md:text-6xl lg:text-7xl text-[#1a1a18] leading-[0.95] mb-6">
            Your next activity<br />starts something.
          </h2>
          <p className="text-[#1a1a18]/70 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Connect activity app, set your pledge in 2 minutes, and your next workout starts building toward your goal automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#" className="bg-[#56721c] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#698C22] transition-colors">
              Connect with activity app — free
            </a>
            <a href="#" className="bg-[#1a1a18] text-white border border-black/15 px-8 py-4 rounded-full font-semibold text-base hover:bg-[#1a1a18]/80 transition-colors">
              Learn more
            </a>
          </div>
          <p className="text-[#1a1a18]/40 text-xs mt-8">No credit card. No risk. Cancel anytime.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a1a18] text-white/50 py-16">
        <div className="max-w-6xl mx-auto px-5 lg:px-10">
          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#56721c] flex items-center justify-center">
                  <span className="text-[#B4C78E] text-[10px] font-bold font-mono-data">DFD</span>
                </span>
                <span className="font-display font-600 text-white text-base">DistanceForDollars</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs mb-6">
                Mileage-to-savings and donation platform for people building toward what matters most.
              </p>
              <div className="flex items-center gap-2">
                <span className="border border-white/20 text-white/50 text-xs font-mono-data px-3 py-1 rounded-full">Strava</span>
                <span className="border border-white/20 text-white/50 text-xs font-mono-data px-3 py-1 rounded-full">Apple Health</span>
                <span className="border border-white/20 text-white/50 text-xs font-mono-data px-3 py-1 rounded-full">Garmin</span>
              </div>
            </div>
            {[
              { title: "Product", links: ["How it works", "Goals", "Charities", "Dashboard", "Pricing"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-white font-semibold text-sm mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between gap-4">
            <p className="text-xs">© 2026 DistanceForDollars Inc. All rights reserved.</p>
            <p className="text-xs">Built for people who mean it.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}