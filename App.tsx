
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Lightbulb, 
  Send, 
  Mic2, 
  ChevronRight, 
  Search,
  Bell,
  Zap,
  Github,
  Trophy,
  Info,
  Layers,
  Settings
} from 'lucide-react';
import { AppView, Submission } from './types';
import Dashboard from './components/Dashboard';
import IdeaLab from './components/IdeaLab';
import SubmissionPortal from './components/SubmissionPortal';
import LiveMentor from './components/LiveMentor';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: '1',
      projectName: 'Aetheris Engine',
      teamName: 'Void Walkers',
      description: 'Zero-latency protocol for decentralized compute clusters.',
      repoUrl: 'github.com/void/aetheris',
      status: 'Reviewing'
    },
    {
      id: '2',
      projectName: 'EcoTrack AI',
      teamName: 'GreenCode',
      description: 'Real-time carbon footprint monitoring using IoT sensors.',
      repoUrl: 'github.com/green/ecotrack',
      status: 'Completed'
    }
  ]);

  const handleAddSubmission = (sub: Submission) => {
    setSubmissions(prev => [sub, ...prev]);
    setCurrentView('dashboard');
  };

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'brainstorm', label: 'Idea Lab', icon: Lightbulb },
    { id: 'submit', label: 'Submissions', icon: Send },
    { id: 'mentor', label: 'AI Mentor', icon: Mic2 },
  ];

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 overflow-hidden font-inter selection:bg-indigo-500/30">
      {/* Dynamic Background Mesh */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Modern Sidebar */}
      <aside className="w-24 lg:w-72 border-r border-white/5 bg-[#030816]/60 backdrop-blur-3xl flex flex-col z-50 transition-all duration-500 ease-in-out">
        <div className="p-8 pb-10 flex items-center gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2.5 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-transform hover:rotate-12">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-xl font-black tracking-tighter text-white">HACKHUB</h1>
            <p className="text-[10px] text-indigo-400 font-bold tracking-[0.2em] uppercase">Control Deck</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as AppView)}
                className={`w-full group flex items-center justify-center lg:justify-start gap-4 px-5 py-4 rounded-2xl transition-all duration-500 relative ${
                  active 
                    ? 'bg-indigo-600/10 text-white border border-indigo-500/20' 
                    : 'text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-500 group-hover:scale-125 ${active ? 'text-indigo-500' : 'text-slate-500'}`} />
                <span className={`hidden lg:block font-bold text-sm tracking-wide ${active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>{item.label}</span>
                {active && (
                  <div className="absolute right-3 hidden lg:block">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_12px_#6366f1]" />
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-6 mt-auto space-y-4">
          <div className="hidden lg:block bg-gradient-to-tr from-slate-900 to-slate-800 border border-white/5 p-5 rounded-[2rem] relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
             <Layers className="absolute -right-2 -top-2 w-12 h-12 text-white/5 transition-transform group-hover:scale-110" />
             <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</h4>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-bold text-slate-200">System Nominal</p>
             </div>
          </div>
          
          <div className="flex items-center justify-center lg:justify-start gap-4 px-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center font-black text-sm shadow-xl ring-4 ring-white/5 hover:scale-110 transition-transform cursor-pointer">
              JD
            </div>
            <div className="hidden lg:block flex-1 min-w-0">
              <p className="text-sm font-black truncate text-white tracking-tight">Jane Dev</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-60">Lead Architect</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Content Engine */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Modern Top Navbar */}
        <header className="h-24 flex items-center justify-between px-10 border-b border-white/5 bg-[#020617]/40 backdrop-blur-2xl z-40">
          <div className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">Module</span>
              <h2 className="text-2xl font-black tracking-tighter capitalize">{currentView}</h2>
            </div>
            
            <div className="relative group hidden sm:block">
              <div className="absolute inset-0 bg-indigo-500/5 blur-xl group-focus-within:bg-indigo-500/10 transition-all" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Query command center..." 
                className="relative bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-80 lg:w-[400px] transition-all placeholder:text-slate-600 font-medium"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 transition-all active:scale-95 group">
                <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 transition-all active:scale-95">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <button className="flex items-center gap-3 bg-white text-slate-950 px-6 py-3 rounded-2xl text-sm font-black transition-all hover:bg-slate-200 active:scale-95 shadow-[0_10px_25px_rgba(255,255,255,0.1)]">
              <Zap className="w-4 h-4 fill-slate-950" />
              Elevate
            </button>
          </div>
        </header>

        {/* Scrollable Canvas */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {currentView === 'dashboard' && <Dashboard submissions={submissions} />}
            {currentView === 'brainstorm' && <IdeaLab />}
            {currentView === 'submit' && <SubmissionPortal onSubmit={handleAddSubmission} />}
            {currentView === 'mentor' && <LiveMentor />}
          </div>
        </div>

        {/* Status Footer */}
        <footer className="h-10 px-10 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-[#020617]/60 backdrop-blur-xl">
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> API: Responsive</span>
              <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Gemini: Online</span>
           </div>
           <p>© 2025 HackHub AI - The Infinite Command Center</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
