
import React, { useState } from 'react';
// Added ChevronRight to imports
import { Sparkles, Loader2, BrainCircuit, Zap, Globe, Shield, Activity, ChevronRight } from 'lucide-react';
import { generateProjectIdeas } from '../geminiService';
import { ProjectIdea } from '../types';

const IdeaLab: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const results = await generateProjectIdeas(input);
      setIdeas(results);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-10">
      <div className="text-center space-y-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/20 blur-[100px] -z-10 animate-pulse" />
        <h2 className="text-6xl font-black tracking-tighter bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent leading-none">
          Project Oracle
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          The ultimate brainstorming engine. Powered by Gemini 3 Flash to synthesize bleeding-edge hackathon concepts in seconds.
        </p>
      </div>

      <div className="relative glass-card p-2 rounded-[2.5rem] shadow-2xl">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative flex items-center">
            <Sparkles className="absolute left-6 w-5 h-5 text-indigo-500/50" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="Describe your passion... e.g., Web3 + Climate Tech"
              className="w-full bg-slate-900/50 border-none rounded-[2rem] pl-16 pr-8 py-6 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none text-lg placeholder:text-slate-600 transition-all font-medium"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-10 py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all shadow-[0_10px_40px_rgba(79,70,229,0.3)] active:scale-95"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Zap className="w-6 h-6 fill-white" />}
            Synthesize
          </button>
        </div>
      </div>

      {ideas.length === 0 && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {[
            { icon: Globe, label: 'Geo-Spatial AI', color: 'text-blue-400' },
            { icon: Shield, label: 'Zero Trust Auth', color: 'text-emerald-400' },
            { icon: Activity, label: 'Neural Analytics', color: 'text-rose-400' }
          ].map((tag, i) => (
            <button 
              key={i}
              onClick={() => setInput(tag.label)}
              className="glass-card p-6 rounded-3xl flex items-center gap-4 hover:bg-white/5 transition-all text-left"
            >
              <tag.icon className={`w-6 h-6 ${tag.color}`} />
              <span className="font-bold text-slate-300">{tag.label}</span>
            </button>
          ))}
        </div>
      )}

      {ideas.length > 0 && (
        <div className="grid grid-cols-1 gap-8 animate-in slide-in-from-bottom-10 duration-700">
          {ideas.map((idea, idx) => (
            <div key={idx} className="group glass-card rounded-[3rem] p-10 hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl group-hover:bg-indigo-600/10 transition-colors" />
              
              <div className="flex flex-col md:flex-row justify-between gap-10 relative z-10">
                <div className="space-y-6 flex-1">
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      idea.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      idea.difficulty === 'Intermediate' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' :
                      'bg-rose-500/10 text-rose-500 border-rose-500/20'
                    }`}>
                      {idea.difficulty}
                    </span>
                    <h4 className="text-3xl font-black group-hover:text-indigo-400 transition-colors tracking-tight">{idea.title}</h4>
                  </div>
                  
                  <p className="text-slate-400 leading-relaxed text-lg font-medium">{idea.description}</p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {idea.techStack.map((tech) => (
                      <span key={tech} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-slate-400 group-hover:text-indigo-300 group-hover:border-indigo-500/20 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end shrink-0 min-w-[120px]">
                   <div className="p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                     <BrainCircuit className="w-10 h-10 text-indigo-500" />
                   </div>
                   <button className="flex items-center gap-2 group/btn font-black text-sm text-indigo-400 hover:text-white transition-colors">
                     Claim Blueprint
                     <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IdeaLab;
