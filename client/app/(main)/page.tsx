import Link from "next/link";
import ProductSVG from "../UI/ProductSVG";
import ProblemSVG from "../UI/ProblemSVG";
import SolutionSVG from "../UI/SolutionSVG";
import BenefitSVG from "../UI/BenefitSVG";
import SutraDivider from "../UI/SutraDivider";
import PortViewWrapper from "../UI/PortViewWrapper";


/* HERO SECTION */
function HeroSection() {
  return (
    <section id="home" className="
      relative min-h-screen flex flex-col items-center justify-center
      overflow-hidden pt-16
      bg-gradient-to-br from-amber-50 via-white to-orange-50
      dark:from-black dark:via-black dark:to-black
    ">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(245,158,11,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.15) 1px, transparent 1px)`,
          backgroundSize: "48px 48px"
        }}
      />
      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-amber-300/20 dark:bg-amber-500/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full bg-orange-300/20 dark:bg-orange-600/10 blur-3xl animate-pulse [animation-delay:1.5s]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        <h1 className="
          text-5xl md:text-7xl font-black leading-[1.05] mb-6 tracking-tight
          text-slate-900 dark:text-white
          animate-[fadeInUp_0.7s_ease_0.1s_both]
        ">
          Meet your{" "}
          <span className="
            relative inline-block
            text-transparent bg-clip-text
            bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400
          ">
            Tax Suthradhar
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" preserveAspectRatio="none">
              <path d="M0,8 Q75,0 150,6 Q225,12 300,4" stroke="url(#underlineGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
              <defs>
                <linearGradient id="underlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p className="
          text-xl md:text-2xl text-slate-500 dark:text-slate-300 mb-4 font-light
          leading-relaxed max-w-2xl mx-auto
          animate-[fadeInUp_0.7s_ease_0.25s_both]
        ">
          The bridge between your <strong className="text-slate-700 dark:text-white font-semibold">Pay</strong> and your{" "}
          <strong className="text-slate-700 dark:text-white font-semibold">Peace of Mind.</strong>
        </p>
        <p className="
          text-base text-slate-400 dark:text-slate-400 mb-10 max-w-xl mx-auto
          animate-[fadeInUp_0.7s_ease_0.35s_both]
        ">
          In an era of complex tax codes and shifting regimes, you deserve more than just a calculator.
          You deserve a <em className="text-amber-500 not-italic font-medium">translator</em>.
        </p>

        <div className="
          flex flex-col sm:flex-row gap-4 justify-center
          animate-[fadeInUp_0.7s_ease_0.45s_both]
        ">
          <Link href="/auth/signup">
            <button className="
            px-8 py-4 rounded-2xl font-bold text-base
            bg-gradient-to-r from-amber-400 to-orange-500
            hover:from-amber-500 hover:to-orange-600
            text-white shadow-xl shadow-amber-300/40 dark:shadow-amber-500/20
            hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer
          ">
              Upload Your Payslip →
            </button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="
          mt-16 flex flex-wrap gap-8 justify-center
          text-center
          animate-[fadeInUp_0.7s_ease_0.55s_both]
        ">
          {[
            { value: "99%", label: "Parse Accuracy" },
            { value: "30s", label: "Full Analysis" },
            { value: "DPDP", label: "Act 2026 Compliant" },
            { value: "Free", label: "Beta Access" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl font-black text-amber-500">{value}</div>
              <div className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Section1Product() {
  return (
    <section id="product" className="
      py-28 px-6
      bg-white dark:bg-black
    ">
      <PortViewWrapper>
        <div className={`
        max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center
        transition-all duration-700
      `}>
          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6">
              The bridge between your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Pay
              </span>{" "}
              and your Peace of Mind.
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-300 leading-relaxed mb-6">
              Tax Suthradhar is an <strong className="text-slate-700 dark:text-white">AI-native financial companion</strong> built for the modern Indian employee. We don't just "calculate" numbers — we decode your payslip, translate tax jargon into human language, and suggest you to file the correct ITR form.
            </p>
            <p className="text-base text-slate-400 dark:text-slate-400 leading-relaxed border-l-4 border-amber-400 pl-5 italic">
              It's not just a tool — it's the <strong className="not-italic text-amber-500">thread (Sutra)</strong> that holds your financial compliance together.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: "🔍", title: "Decode", desc: "Every payslip line explained" },
                { icon: "🗺️", title: "Navigate", desc: "Right ITR form, always" },
                { icon: "🌐", title: "Translate", desc: "Tax jargon → plain English" },
                { icon: "🔒", title: "Protect", desc: "DPDP Act 2026 compliant" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="
                flex items-start gap-3 p-4 rounded-xl
                bg-amber-50/60 dark:bg-neutral-950/40
                border border-amber-100 dark:border-neutral-800
                hover:border-1 hover:border-amber-300 dark:hover:border-amber-600
                transition-all duration-200 group
              ">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-white text-sm">{title}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SVG */}
          <div className="
          relative rounded-3xl overflow-hidden
          bg-gradient-to-br from-slate-50 to-amber-50/50
          dark:from-black dark:to-black
          border border-slate-200 dark:border-neutral-800
          p-6 shadow-2xl shadow-amber-100/30 dark:shadow-black/30
        ">
            <ProductSVG />
          </div>
        </div>
      </PortViewWrapper>
    </section >
  );
}


function Section2Problem() {
  return (
    <section id="problem" className="
      py-28 px-6
      bg-gradient-to-b from-red-50/30 to-white
      dark:from-black dark:to-black
    ">
      <PortViewWrapper>
        <div className={`
        max-w-6xl mx-auto
        transition-all duration-700
      `}>
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 max-w-3xl mx-auto">
              Why did we build this? Because your Payslip{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500">
                shouldn't be a puzzle.
              </span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              The Income Tax Act 2025 is here, with a new language of deductions. Most employees see TDS or HRA on their slip but have <strong className="text-red-500">no idea why</strong> that amount was deducted.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* SVG */}
            <div className="
            relative rounded-3xl overflow-hidden
            bg-gradient-to-br from-red-50 to-orange-50/40
            dark:from-black dark:to-black
            border border-red-100/80 dark:border-red-900/30
            p-6 shadow-2xl shadow-red-100/30 dark:shadow-black/30
          ">
              <ProblemSVG />
            </div>

            {/* Pain points */}
            <div className="space-y-6">
              {[
                {
                  icon: "🔐",
                  tag: "The Jargon Trap",
                  color: "red",
                  desc: "Sections 80C, 10(14), and 24(b) feel like secret codes written in an alien language. Most employees just… give up.",
                },
                {
                  icon: "📝",
                  tag: "The ITR Guesswork",
                  color: "orange",
                  desc: "Filing ITR-1 when you actually need ITR-2 leads to dreaded tax notices and sleepless nights of panic-googling.",
                },
                {
                  icon: "🕶️",
                  tag: "The Blind Spot",
                  color: "amber",
                  desc: "You only realize you could have saved more tax when it's already too late in March — the audit clock has stopped.",
                },
              ].map(({ icon, tag, color, desc }) => (
                <div key={tag} className={`
                flex gap-5 p-6 rounded-2xl
                bg-white dark:bg-black
                border border-neutral-200 dark:border-neutral-800
                shadow-sm hover:shadow-md
                hover:-translate-y-0.5
                transition-all duration-200
              `}>
                  <div className={`
                  w-12 h-12 rounded-xl flex-shrink-0
                  bg-${color}-100 dark:bg-black
                  flex items-center justify-center text-2xl
                `}>
                    {icon}
                  </div>
                  <div>
                    <div className={`font-bold text-${color}-600 dark:text-${color}-400 text-sm mb-1`}>{tag}</div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PortViewWrapper>
    </section>
  );
}


function Section3Solution() {
  return (
    <section id="solution" className="
      py-28 px-6
      bg-gradient-to-b from-emerald-50/30 via-white to-white
      dark:from-black dark:via-black dark:to-black
    ">
      <PortViewWrapper>

        <div className={`
        max-w-6xl mx-auto
        transition-all duration-700
      `}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 max-w-2xl mx-auto">
              Your Payslip,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                Finally Transparent.
              </span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Upload any PDF. Our multimodal AI reads every line and hands you back clarity, not confusion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Features grid */}
            <div className="grid gap-5">
              {[
                {
                  num: "01",
                  icon: "⚡",
                  title: "Instant AI Parsing",
                  desc: "Upload any PDF. Our multimodal AI reads every line — from Basic Pay to obscure allowances — with 99% accuracy.",
                  color: "amber",
                },
                {
                  num: "02",
                  icon: "💬",
                  title: "Contextual Insights",
                  desc: "We explain the \"Why.\" If your TDS is high, we tell you exactly which component triggered it.",
                  color: "blue",
                },
                {
                  num: "03",
                  icon: "🎯",
                  title: "ITR Matching Engine",
                  desc: "Based on your unique income components (Arrears, Foreign Income, Capital Gains), we tell you exactly which form to file.",
                  color: "purple",
                },
                {
                  num: "04",
                  icon: "🔒",
                  title: "Privacy First",
                  desc: "Built on the DPDP Act 2026 framework. We process data in real-time and never store your sensitive PDFs.",
                  color: "emerald",
                },
              ].map(({ num, icon, title, desc, color }) => (
                <div key={title} className={`
                flex gap-5 p-5 rounded-2xl
                bg-white dark:bg-black
                border border-neutral-200 dark:border-neutral-800
                shadow-sm hover:shadow-lg hover:-translate-y-1
                transition-all duration-300 group cursor-default
              `}>
                  <div className={`
                  relative flex-shrink-0 w-12 h-12 rounded-xl
                  bg-white dark:bg-black
                  flex items-center justify-center text-xl
                  group-hover:scale-110 transition-transform duration-200
                `}>
                    {icon}
                    <span className={`
                    absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full
                    bg-amber-500 text-white text-[9px] font-black
                    flex items-center justify-center
                  `}>{num}</span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-white mb-1">{title}</div>
                    <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* SVG */}
            <div className="
            relative rounded-3xl overflow-hidden
            bg-gradient-to-br from-emerald-50 to-teal-50/30
            dark:from-black dark:to-black
            border border-emerald-100/80 dark:border-emerald-800/30
            p-6 shadow-2xl shadow-emerald-100/40 dark:shadow-black/30
          ">
              <SolutionSVG />
            </div>
          </div>
        </div>
      </PortViewWrapper>

    </section>
  );
}

function Section4Benefits() {
  return (
    <section id="benefits" className="
      py-28 px-6
      bg-gradient-to-b from-amber-50/30 via-white to-amber-50/20
      dark:from-black dark:via-black dark:to-black
    ">
      <PortViewWrapper>
        <div className={`
        max-w-6xl mx-auto
        transition-all duration-700
      `}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 max-w-2xl mx-auto">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Accuracy
              </span>{" "}
              for the App,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Authority
              </span>{" "}
              for You.
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              The emotional and practical win for every modern Indian professional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* SVG */}
            <div className="
            relative rounded-3xl overflow-hidden
            bg-gradient-to-br from-amber-50/60 to-yellow-50/40
            dark:from-black dark:to-black
            border border-amber-100 dark:border-amber-900/30
            p-6 shadow-2xl shadow-amber-100/40 dark:shadow-black/30
          ">
              <BenefitSVG />
            </div>

            {/* Benefit list */}
            <div className="space-y-6">
              {[
                {
                  emoji: "😌",
                  title: "Zero Anxiety",
                  desc: "No more 'Did I file the wrong form?' sleepless nights. Our engine explains everything before you submit.",
                  stat: "0 Tax Notices",
                  color: "indigo",
                },
                {
                  emoji: "💡",
                  title: "Smart Savings",
                  desc: "Identify tax-saving opportunities you didn't know existed in your own salary structure.",
                  stat: "Avg. ₹4,200 saved",
                  color: "emerald",
                },
                {
                  emoji: "⏱️",
                  title: "Time Reclaimed",
                  desc: "What used to take hours of googling and calling your 'tax guy' now takes just 30 seconds.",
                  stat: "30 sec analysis",
                  color: "amber",
                },
                {
                  emoji: "🧑‍💼",
                  title: "Expert Clarity, For Free",
                  desc: "Get the power of a tax consultant in your pocket while we are in our beta testing phase.",
                  stat: "Free Beta Access",
                  color: "rose",
                },
              ].map(({ emoji, title, desc, stat, color }) => (
                <div key={title} className={`
                flex gap-5 p-5 rounded-2xl
                bg-white dark:bg-black
                border border-neutral-200 dark:border-neutral-800
                shadow-sm hover:shadow-lg hover:-translate-y-1
                transition-all duration-300
              `}>
                  <div className={`
                  flex-shrink-0 w-12 h-12 rounded-xl
                  bg-white dark:bg-black
                  flex items-center justify-center text-2xl
                `}>
                    {emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-slate-800 dark:text-white">{title}</div>
                      <span className={`text-xs font-bold text-${color}-600 dark:text-${color}-400 bg-${color}-50 dark:bg-${color}-900/20 px-2 py-0.5 rounded-full`}>
                        {stat}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PortViewWrapper>
    </section>
  );
}

/* PAGE STYLES (keyframes injected inline) */
const keyframeStyles = `
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

export default function MainPage() {
  return (
    <>
      <style>{keyframeStyles}</style>
      <div className="min-h-screen bg-white dark:bg-[#0a0f1e] text-slate-900 dark:text-white transition-colors duration-300">
        <main>
          <HeroSection />
          <SutraDivider />
          <Section1Product />
          <SutraDivider />
          <Section2Problem />
          <SutraDivider />
          <Section3Solution />
          <SutraDivider />
          <Section4Benefits />
        </main>
      </div>
    </>
  );
}