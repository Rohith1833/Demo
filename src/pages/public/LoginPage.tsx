import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { Terminal, ArrowRight, UserCheck, Shield, Award, Sliders } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setPersona, navigate } = useHackathon();
  const [email, setEmail] = useState('');

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setPersona('participant_selected_paid');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-8">
        <div className="w-10 h-10 rounded-md bg-[#2563eb] flex items-center justify-center text-white font-mono font-semibold text-base mx-auto mb-3">
          HF
        </div>
        <h1 className="text-xl font-semibold text-[#fafafa] tracking-tight">Sign in to HackFlow</h1>
        <p className="text-xs text-[#a1a1aa] mt-1">
          NexHack 2026 • XYZ Institute of Technology
        </p>
      </div>

      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-6 space-y-6">
        {/* Instant Demo Quick Logins */}
        <div className="space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717a]">
            Instant Role Access (Demo)
          </p>

          <div className="space-y-1.5">
            <button
              onClick={() => {
                setPersona('participant_selected_paid');
                navigate('/dashboard');
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-md bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] text-left transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="text-xs font-medium text-[#fafafa]">Participant Portal</p>
                  <p className="text-[10px] text-[#71717a]">Arjun Kumar (Team Leader)</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#71717a]" />
            </button>

            <button
              onClick={() => {
                setPersona('organizer');
                navigate('/admin');
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-md bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] text-left transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-xs font-medium text-[#fafafa]">Coordinator Console</p>
                  <p className="text-[10px] text-[#71717a]">War Room, Screening, Teams</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#71717a]" />
            </button>

            <button
              onClick={() => {
                setPersona('judge');
                navigate('/judge');
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-md bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] text-left transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-purple-400" />
                <div>
                  <p className="text-xs font-medium text-[#fafafa]">Jury Evaluation Console</p>
                  <p className="text-[10px] text-[#71717a]">Dr. Ananya Rao (AI Track)</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#71717a]" />
            </button>

            <button
              onClick={() => {
                setPersona('superadmin');
                navigate('/superadmin/events');
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-md bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] text-left transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-red-400" />
                <div>
                  <p className="text-xs font-medium text-[#fafafa]">Super Admin</p>
                  <p className="text-[10px] text-[#71717a]">Multi-Year & Yearly Reuse</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#71717a]" />
            </button>
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-[#27272a]"></div>
          <span className="flex-shrink mx-3 text-[10px] text-[#71717a] font-mono uppercase">Or Enter Email</span>
          <div className="flex-grow border-t border-[#27272a]"></div>
        </div>

        {/* Standard Email Input */}
        <form onSubmit={handleCustomLogin} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[#a1a1aa] mb-1">Registered Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="arjun.kumar@college.edu"
              className="w-full bg-[#18181b] border border-[#27272a] focus:border-[#3b82f6] rounded-md px-3 py-1.5 text-xs text-[#fafafa] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium transition-colors shadow-sm"
          >
            Sign In with Magic Link
          </button>
        </form>

        <p className="text-[11px] text-center text-[#71717a]">
          Not registered yet?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-[#3b82f6] hover:underline"
          >
            Submit an application
          </button>
        </p>
      </div>
    </div>
  );
};
