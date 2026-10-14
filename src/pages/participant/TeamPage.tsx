import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  Users,
  UserPlus,
  Copy,
  Check,
  Shield,
  Lock,
  Unlock,
  AlertTriangle,
  UserCheck,
  Crown,
  Share2,
  Trash2,
  ArrowRight,
} from 'lucide-react';

export const TeamPage: React.FC = () => {
  const { currentTeam, currentParticipant, createTeam, joinTeamWithCode, showToast } =
    useHackathon();

  const [newTeamName, setNewTeamName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    createTeam(newTeamName.trim());
    setNewTeamName('');
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    joinTeamWithCode(joinCode.trim());
    setJoinCode('');
  };

  const handleCopyCode = () => {
    if (currentTeam) {
      navigator.clipboard.writeText(currentTeam.code);
      setCopied(true);
      showToast('success', `Copied team code ${currentTeam.code} to clipboard!`, 'Copied');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    showToast('info', `Invitation dispatch simulated to ${inviteEmail}`, 'Invite Sent');
    setInviteEmail('');
  };

  const isComplete = currentTeam && currentTeam.members.length >= 2;
  const isMax = currentTeam && currentTeam.members.length >= 4;

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/20">
              Team Roster
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Team Management</h1>
            <p className="text-xs text-slate-400 mt-1">
              Teams must have between 2 to 4 confirmed members to be eligible for problem selection and judging.
            </p>
          </div>

          {currentTeam && (
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-3 py-1.5 rounded-xl font-semibold border flex items-center gap-1.5 ${
                  currentTeam.isLocked
                    ? 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                    : isComplete
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                }`}
              >
                {currentTeam.isLocked ? (
                  <>
                    <Lock className="w-3.5 h-3.5 text-amber-400" /> Team Locked (Problem Chosen)
                  </>
                ) : isComplete ? (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" /> Valid Team ({currentTeam.members.length}/4)
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Incomplete ({currentTeam.members.length}/4 - min 2)
                  </>
                )}
              </span>
            </div>
          )}
        </div>

        {currentTeam ? (
          /* Active Team View */
          <div className="space-y-6 animate-in fade-in">
            {/* Team Header Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="text-xs text-slate-400">Team Name</div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{currentTeam.name}</h2>
                <div className="text-xs text-slate-400 mt-1">
                  Leader: <strong className="text-white">{currentTeam.leaderName}</strong> • {currentTeam.members.length} of 4 members
                </div>
              </div>

              {/* Team Code Share Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Join Code</div>
                  <div className="text-xl font-mono font-black text-purple-400 tracking-wider">
                    {currentTeam.code}
                  </div>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-colors"
                  title="Copy team code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Team Members List */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" /> Confirmed Members ({currentTeam.members.length}/4)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentTeam.members.map((member) => (
                  <div
                    key={member.id}
                    className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                            {member.name}
                            {member.role === 'Leader' && (
                              <span title="Team Leader">
                                <Crown className="w-3.5 h-3.5 text-amber-400" />
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400">{member.email}</div>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          member.role === 'Leader'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {member.role}
                      </span>
                    </div>

                    {/* Skill Tags */}
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((sk) => (
                          <span
                            key={sk}
                            className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Invite Teammate (If not max and not locked) */}
            {!isMax && !currentTeam.isLocked && (
              <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-purple-400" /> Invite Teammates
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  Share your team code <strong>{currentTeam.code}</strong> or send an email invitation.
                </p>

                <form onSubmit={handleInvite} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="teammate@college.edu"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                  >
                    Send Invite
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          /* No Team Formed Yet View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
            {/* Create Team Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Create a New Team</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Become the team leader, choose your team name, and invite up to 3 peers.
                </p>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Team Name</label>
                  <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="e.g. Neural Ninjas"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Create Team & Generate Code
                </button>
              </form>
            </div>

            {/* Join Team Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Join an Existing Team</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Have a team code from your team leader? Enter it here to join instantly.
                </p>
              </div>

              <form onSubmit={handleJoin} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">5-Character Team Code</label>
                  <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="e.g. NXH-7K82P"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white uppercase font-mono tracking-widest focus:outline-none focus:border-purple-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition-all"
                >
                  Join Team
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
