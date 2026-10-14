import React from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  Calendar,
  MapPin,
  Trophy,
  Users,
  Clock,
  ArrowRight,
  Code2,
  Cpu,
  Shield,
  HeartPulse,
  Leaf,
  Coins,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  Terminal,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate, settings } = useHackathon();

  const tracks = [
    {
      icon: <Cpu className="w-4 h-4 text-[#3b82f6]" />,
      title: 'AI & Machine Learning',
      desc: 'On-device vision, assistive AI, spatial navigation, and lightweight inference models.',
    },
    {
      icon: <Coins className="w-4 h-4 text-emerald-400" />,
      title: 'FinTech & Micro-Finance',
      desc: 'Zero-fee settlement protocols, offline tabs, and informal merchant credit scoring.',
    },
    {
      icon: <HeartPulse className="w-4 h-4 text-rose-400" />,
      title: 'Healthcare & Diagnostics',
      desc: 'Rural clinic triage, ABDM FHIR interoperability, and low-bandwidth EHR systems.',
    },
    {
      icon: <Leaf className="w-4 h-4 text-teal-400" />,
      title: 'Sustainability & Climate',
      desc: 'Campus microgrid balancing, crop pest vision detectors, and carbon ledgers.',
    },
    {
      icon: <Shield className="w-4 h-4 text-amber-400" />,
      title: 'Cybersecurity & Systems',
      desc: 'eBPF kernel telemetry, zero-trust detection, and smart contract vulnerability analysis.',
    },
    {
      icon: <Code2 className="w-4 h-4 text-purple-400" />,
      title: 'Open Innovation',
      desc: 'Autonomous logistics, civic tech, smart campus mobility, and decentralized software.',
    },
  ];

  const timeline = [
    { time: '10 Feb – 10 Apr', title: 'Applications Open', desc: 'Online profile & GitHub repository screening round.' },
    { time: '12 April 2026', title: 'Screening Results & Shortlist', desc: '500 top applicants selected across Karnataka & pan-India.' },
    { time: '15 April 2026', title: 'Fee Confirmation & Team Lock', desc: 'Seat confirmation (₹500 fee) and team formation (2–4 members).' },
    { time: '18 April, 08:00 AM', title: 'On-Campus Check-in', desc: 'Badge printing, Wi-Fi credentials, and opening ceremony.' },
    { time: '18 April, 10:00 AM', title: '24-Hour Hacking Sprint', desc: 'Sprint begins with mentor checkpoints throughout the night.' },
    { time: '19 April, 08:00 AM', title: 'Code Freeze & Submissions', desc: 'Submissions locked for repository and video validation.' },
    { time: '19 April, 09:00 AM', title: 'Jury Evaluation & Pitching', desc: '100-point rubric assessment by faculty and industry judges.' },
    { time: '19 April, 12:30 PM', title: 'Valedictory & ₹1,00,000 Awards', desc: 'Grand results reveal and podium presentation.' },
  ];

  const faqs = [
    {
      q: 'Who is eligible to participate in NexHack 2026?',
      a: 'Any undergraduate or postgraduate college student from any engineering discipline or university is eligible. Teams consist of 2 to 4 members.',
    },
    {
      q: 'Is there a registration fee?',
      a: 'Applying for screening is 100% free. Only shortlisted participants pay a nominal fee of ₹500 to cover 24h venue hospitality, meals, Wi-Fi, and event kits.',
    },
    {
      q: 'Can members be from different colleges?',
      a: 'Yes. Inter-college teams are fully permitted. Every member must complete screening individually or join using their team invite code.',
    },
    {
      q: 'Will hardware and cloud credits be provided?',
      a: 'Yes. Cloud sandbox credits, high-speed campus LAN/Wi-Fi, and IoT testing rigs will be provided on-site.',
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#111113] border border-[#27272a] text-xs font-mono text-[#a1a1aa]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
            <span>NEXHACK 2026 • ANNUAL UNIVERSITY HACKATHON</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#fafafa] uppercase">
              24 Hours. <br />
              500 Builders. <br />
              One Campus.
            </h1>
            <p className="text-base text-[#a1a1aa] leading-relaxed pt-2">
              A college hackathon for students building real-world solutions across AI, cybersecurity, fintech, sustainability, and open innovation.
            </p>
          </div>

          {/* Key Event Badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#71717a] pt-1">
            <div className="flex items-center gap-1.5 text-[#a1a1aa]">
              <Calendar className="w-3.5 h-3.5 text-[#71717a]" />
              <span>18–19 April 2026</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-[#a1a1aa]">
              <MapPin className="w-3.5 h-3.5 text-[#71717a]" />
              <span>XYZ Institute of Technology, Bengaluru</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Trophy className="w-3.5 h-3.5" />
              <span>₹1,00,000 Prize Pool</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shadow-sm"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => navigate('/problems')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#111113] hover:bg-[#18181b] border border-[#27272a] text-xs font-medium text-[#fafafa] transition-colors"
            >
              <span>View Problem Statements</span>
            </button>

            {settings.isResultsPublished && (
              <button
                onClick={() => navigate('/results')}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-md text-xs font-medium text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10 transition-colors"
              >
                <span>Official Results ↗</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4 Core Stat Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-1">
            <p className="text-[11px] font-mono uppercase text-[#71717a]">Participants</p>
            <p className="text-2xl font-semibold text-[#fafafa] font-mono">500+</p>
            <p className="text-[11px] text-[#71717a]">Selected through screening</p>
          </div>

          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-1">
            <p className="text-[11px] font-mono uppercase text-[#71717a]">Duration</p>
            <p className="text-2xl font-semibold text-[#fafafa] font-mono">24 Hours</p>
            <p className="text-[11px] text-[#71717a]">Non-stop hacking on campus</p>
          </div>

          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-1">
            <p className="text-[11px] font-mono uppercase text-[#71717a]">Problem Tracks</p>
            <p className="text-2xl font-semibold text-[#fafafa] font-mono">10+ Problems</p>
            <p className="text-[11px] text-[#71717a]">Sponsored industry briefs</p>
          </div>

          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-1">
            <p className="text-[11px] font-mono uppercase text-[#71717a]">Prize Pool</p>
            <p className="text-2xl font-semibold text-emerald-400 font-mono">₹1,00,000</p>
            <p className="text-[11px] text-[#71717a]">Cash awards & sponsor bounties</p>
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section id="tracks" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-[#fafafa] tracking-tight">Hackathon Tracks</h2>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            Select from 6 focused problem tracks designed in partnership with technical clubs and faculty departments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-2 hover:border-[#3f3f46] transition-colors"
            >
              <div className="flex items-center gap-2">
                {track.icon}
                <h3 className="text-xs font-semibold text-[#fafafa]">{track.title}</h3>
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">{track.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-[#fafafa] tracking-tight">Schedule & Timeline</h2>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            Key operational milestones from application screening to the final award ceremony.
          </p>
        </div>

        <div className="bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden divide-y divide-[#18181b]">
          {timeline.map((item) => (
            <div
              key={item.title}
              className="p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs"
            >
              <div className="flex items-start sm:items-center gap-3">
                <span className="font-mono text-[11px] text-[#3b82f6] w-36 shrink-0">{item.time}</span>
                <div>
                  <span className="font-medium text-[#fafafa]">{item.title}</span>
                  <p className="text-[11px] text-[#71717a] mt-0.5 sm:mt-0">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rules & Eligibility */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-[#fafafa] tracking-tight">Rules & Code of Conduct</h2>
          <p className="text-xs text-[#a1a1aa] mt-0.5">Core principles for fair evaluation and academic integrity.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-1.5">
            <h3 className="font-semibold text-[#fafafa]">Original Code Only</h3>
            <p className="text-[#a1a1aa] leading-relaxed">
              All production code, schemas, and configurations must be authored during the 24-hour sprint. Open-source libraries are permitted.
            </p>
          </div>

          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-1.5">
            <h3 className="font-semibold text-[#fafafa]">Team Sizes (2 to 4)</h3>
            <p className="text-[#a1a1aa] leading-relaxed">
              Individual solo participants are not permitted. Every team must consist of 2 to 4 registered participants.
            </p>
          </div>

          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-1.5">
            <h3 className="font-semibold text-[#fafafa]">Standard Rubric</h3>
            <p className="text-[#a1a1aa] leading-relaxed">
              Judged on Innovation (20), Tech Execution (25), Problem Relevance (20), UX (15), Scalability (10), and Pitch (10).
            </p>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717a]">
          Industry Partners & Track Sponsors
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono text-[#a1a1aa]">
          <div className="p-3 rounded-md bg-[#111113] border border-[#27272a]">Google Cloud</div>
          <div className="p-3 rounded-md bg-[#111113] border border-[#27272a]">PhonePe & NPCI</div>
          <div className="p-3 rounded-md bg-[#111113] border border-[#27272a]">GitHub Education</div>
          <div className="p-3 rounded-md bg-[#111113] border border-[#27272a]">Intel Developer Zone</div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-[#fafafa] tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-[#111113] border border-[#27272a] rounded-lg p-4 space-y-1.5">
              <h3 className="font-semibold text-[#fafafa]">{faq.q}</h3>
              <p className="text-[#a1a1aa] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
