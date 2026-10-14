import React from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import {
  TrendingUp,
  Users,
  Award,
  CreditCard,
  QrCode,
  FolderGit2,
  Download,
  Filter,
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { showToast } = useHackathon();

  // Registration Funnel Data
  const funnelData = [
    { stage: '1. Applications', count: 1248, rate: '100%' },
    { stage: '2. Selected', count: 500, rate: '40.1%' },
    { stage: '3. Paid', count: 432, rate: '86.4%' },
    { stage: '4. Checked In', count: 421, rate: '97.4%' },
    { stage: '5. Teams Formed', count: 128, rate: '100%' },
    { stage: '6. Projects Submitted', count: 104, rate: '81.2%' },
  ];

  // Applications by Department
  const deptData = [
    { name: 'Computer Science', count: 540 },
    { name: 'Information Science', count: 280 },
    { name: 'AI & Data Science', count: 210 },
    { name: 'Electronics (ECE)', count: 130 },
    { name: 'Mechanical / Robotics', count: 88 },
  ];

  // Applications by Academic Year
  const yearData = [
    { year: '1st Year', count: 120 },
    { year: '2nd Year', count: 340 },
    { year: '3rd Year', count: 560 },
    { year: '4th Year', count: 180 },
    { year: 'Postgrad', count: 48 },
  ];

  // Most Common Technologies
  const techData = [
    { tech: 'React / Next.js', count: 820 },
    { tech: 'Python / ML', count: 740 },
    { tech: 'TypeScript', count: 590 },
    { tech: 'FastAPI / Django', count: 480 },
    { tech: 'Docker / Linux', count: 340 },
    { tech: 'Rust / eBPF', count: 110 },
  ];

  // Problem statement distribution
  const problemPopularityData = [
    { name: 'PS-01 (Campus AI)', teams: 26 },
    { name: 'PS-02 (PayCampus)', teams: 22 },
    { name: 'PS-03 (PulseRouter)', teams: 19 },
    { name: 'PS-04 (CarbonGrid)', teams: 17 },
    { name: 'PS-05 (ZeroWall)', teams: 15 },
    { name: 'PS-06 (SwiftWing)', teams: 14 },
    { name: 'PS-07 (FairCredit)', teams: 16 },
  ];

  const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/20">
              Institutional Intelligence
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Event Analytics & Funnels</h1>
            <p className="text-xs text-slate-400 mt-1">
              Comprehensive post-event metrics and conversion funnels ready for college management reports.
            </p>
          </div>

          <button
            onClick={() => showToast('success', 'Generated executive analytics report PDF', 'Exported')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Download Executive Report (PDF)
          </button>
        </div>

        {/* 6 High-Level Conversion KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-slate-400">Applications</div>
            <div className="text-2xl font-black text-white mt-1">1,248</div>
            <div className="text-[10px] text-indigo-400">Baseline pool</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-indigo-400">Selection Rate</div>
            <div className="text-2xl font-black text-white mt-1">40.1%</div>
            <div className="text-[10px] text-slate-400">500 of 1,248</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-emerald-400">Payment Conversion</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">86.4%</div>
            <div className="text-[10px] text-slate-400">432 paid fees</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-purple-400">Attendance Rate</div>
            <div className="text-2xl font-black text-purple-400 mt-1">97.4%</div>
            <div className="text-[10px] text-slate-400">421 present on-site</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-cyan-400">Submission Rate</div>
            <div className="text-2xl font-black text-cyan-400 mt-1">81.2%</div>
            <div className="text-[10px] text-slate-400">104 of 128 teams</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <div className="text-xs text-amber-400">Avg Jury Score</div>
            <div className="text-2xl font-black text-amber-400 mt-1">86.2</div>
            <div className="text-[10px] text-slate-400">Across all tracks</div>
          </div>
        </div>

        {/* Funnel Card */}
        <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> End-to-End Registration Funnel
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Conversion drop-off across the full 6-phase participant lifecycle.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {funnelData.map((item, idx) => (
              <div
                key={item.stage}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1 relative"
              >
                <div className="text-[10px] text-slate-400 font-semibold">{item.stage}</div>
                <div className="text-2xl font-extrabold text-white font-mono">{item.count}</div>
                <div className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full inline-block border border-emerald-500/30">
                  {item.rate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications by Department (Bar Chart) */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Applications by Engineering Department</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#26262a" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#090a0f', borderColor: '#27272a', borderRadius: '8px' }}
                  />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Applications by Year (Bar Chart) */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Cohort Distribution by Academic Year</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#26262a" />
                  <XAxis dataKey="year" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#090a0f', borderColor: '#27272a', borderRadius: '8px' }}
                  />
                  <Bar dataKey="count" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Developer Skills (Horizontal Bar) */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Most Common Developer Technologies</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={techData}
                  margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#26262a" />
                  <XAxis type="number" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis dataKey="tech" type="category" stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#090a0f', borderColor: '#27272a', borderRadius: '8px' }}
                  />
                  <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Problem Statement Allocation */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Problem Statement Popularity & Allocation</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={problemPopularityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#26262a" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#090a0f', borderColor: '#27272a', borderRadius: '8px' }}
                  />
                  <Bar dataKey="teams" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
