
import React from 'react';
import { Submission } from '../types';
import { Users, Code2, Award, Clock, ChevronRight, TrendingUp, ExternalLink, Sparkles, Terminal } from 'lucide-react';

interface DashboardProps {
  submissions: Submission[];
}

const StatCard: React.FC<{ icon: any, label: string, value: string, color: string, trend?: string }> = ({ icon: Icon, label, value, color, trend }) => (
  <div className="glass-card p-8 rounded-[2.5rem] group hover:border-indigo-500/30 transition-all duration-700 cursor-default relative overflow-hidden">
    <div className={`absolute -right-4 -top-4 w-24 h-24 ${color} opacity-[0.03] blur-2xl group-hover:opacity-[0.1] transition-opacity`} />
    <div className="flex justify-between items-start mb-6">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shadow-lg transition-all group-hover:scale-110 group-hover:rotate-6 duration-500`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black tracking-widest">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </div>
      )}
    </div>
    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{label}</p>
    <p className="text-4xl font-black mt-1 tracking-tighter text-white">{value}</p>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ submissions }) => {
  return (
    <div className="space-y-12 pb-12">
      {/* Website Description / Hero Section */}
      <section className="relative glass-card rounded-[3rem] p-10 lg:p-16 overflow-hidden border-indigo-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5 -z-10" />
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="w-48 h-48 text-white animate-pulse" />
        </div>
        
        <div className="max-w-3xl space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest animate-bounce">
            <Terminal className="w-3 h-3" /> Mission Briefing
          </div>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-white leading-none">
            Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">Infinite</span> Hackathon.
          </h2>
          <p className="text-lg lg:text-xl text-slate-400 font-medium leading-relaxed">
            HackHub AI is your advanced command center for high-stakes building. 
            We bridge the gap between imagination and execution using 
            <span className="text-white"> Google Gemini 2.5</span> to provide real-time 
            architectural guidance, AI-driven project synthesis, and seamless submission management.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 hover:border-white/10 transition-all cursor-default group">
               <Sparkles className="w-5 h-5 text-indigo-400 group-hover:animate-spin" />
               <span className="text-sm font-bold text-slate-300">AI Project Oracle</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 hover:border-white/10 transition-all cursor-default group">
               <Code2 className="w-5 h-5 text-violet-400 group-hover:scale-110" />
               <span className="text-sm font-bold text-slate-300">Live Voice Mentor</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard icon={Users} label="Total Operatives" value="3,104" color="bg-indigo-600" trend="+14%" />
        <StatCard icon={Code2} label="Active Submissions" value={submissions.length.toString()} color="bg-violet-600" trend="+8%" />
        <StatCard icon={TrendingUp} label="Platform Health" value="99.9%" color="bg-blue-600" />
        <StatCard icon={Award} label="Reserved Rewards" value="$50,000" color="bg-pink-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 glass-card rounded-[3rem] overflow-hidden border-white/5">
          <div className="p-10 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black tracking-tight">Active Transmissions</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Live Project Stream</p>
            </div>
            <button className="text-xs font-black bg-white/5 hover:bg-white/10 px-6 py-3 rounded-2xl transition-all active:scale-95 border border-white/5">
              Filter Data
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02]">
                  <th className="px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Project Metadata</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Squad Identity</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Sync Status</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="group hover:bg-white/[0.03] transition-colors">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800/50 border border-white/5 flex items-center justify-center font-black text-slate-400 group-hover:border-indigo-500/30 transition-all">
                          {sub.projectName[0]}
                        </div>
                        <div>
                          <p className="font-black text-white text-lg tracking-tight group-hover:text-indigo-400 transition-colors">{sub.projectName}</p>
                          <p className="text-xs text-slate-500 font-medium truncate max-w-[240px] mt-0.5">{sub.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex -space-x-3 mb-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-9 h-9 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-[10px] font-black shadow-lg">
                            P{i}
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{sub.teamName}</p>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border shadow-xl ${
                        sub.status === 'Reviewing' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                        sub.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                           sub.status === 'Reviewing' ? 'bg-amber-500 animate-pulse' :
                           sub.status === 'Completed' ? 'bg-emerald-500' : 'bg-slate-500'
                        }`} />
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <a href={`https://${sub.repoUrl}`} className="p-3 bg-white/5 hover:bg-indigo-600 hover:text-white rounded-2xl inline-flex items-center transition-all duration-300 shadow-lg active:scale-90">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden relative group border-white/5">
          <Award className="absolute -top-12 -right-12 w-56 h-56 text-indigo-500/5 rotate-12 group-hover:rotate-0 transition-all duration-1000" />
          <div className="relative z-10 space-y-8">
            <h4 className="text-2xl font-black tracking-tighter">Mission Timeline</h4>
            <div className="space-y-8">
              {[
                { time: '02h 15m', event: 'Logic Freeze', type: 'Critical', color: 'bg-rose-500' },
                { time: '05h 00m', event: 'Video Uplink', type: 'Final', color: 'bg-indigo-500' },
                { time: '18h 30m', event: 'Review Alpha', type: 'Phase 1', color: 'bg-amber-500' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group/item">
                  <div className="flex items-center gap-4">
                    <div className={`w-1.5 h-12 ${item.color} rounded-full group-hover/item:scale-y-110 transition-transform`} />
                    <div>
                      <p className="font-black text-white group-hover/item:text-indigo-400 transition-colors tracking-tight">{item.event}</p>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{item.type} Stage</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-slate-200 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 tabular-nums">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="relative z-10 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black py-5 rounded-[2rem] text-sm mt-10 transition-all hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(79,70,229,0.3)] active:scale-[0.98]">
            Access Event Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
