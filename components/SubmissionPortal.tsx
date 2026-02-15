
import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Submission } from '../types';

interface SubmissionPortalProps {
  onSubmit: (sub: Submission) => void;
}

const SubmissionPortal: React.FC<SubmissionPortalProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    teamName: '',
    description: '',
    repoUrl: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projectName || !formData.teamName) return;

    const newSubmission: Submission = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'Pending'
    };

    onSubmit(newSubmission);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-500">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold">Submission Received!</h3>
        <p className="text-slate-400">Your project has been successfully logged. Good luck with the judging!</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-blue-400 font-semibold hover:underline"
        >
          Submit another project
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8 shadow-2xl">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Project Submission</h3>
          <p className="text-slate-400">Final call for entries. Ensure your repository is public!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Project Name</label>
              <input
                type="text"
                required
                value={formData.projectName}
                onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                placeholder="Awesome AI App"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Team Name</label>
              <input
                type="text"
                required
                value={formData.teamName}
                onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                placeholder="DevDynasty"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="What problem does it solve? How did you build it?"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Repository URL</label>
            <input
              type="text"
              required
              value={formData.repoUrl}
              onChange={(e) => setFormData({...formData, repoUrl: e.target.value})}
              placeholder="github.com/username/project"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
          >
            <Send className="w-5 h-5" />
            Submit Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmissionPortal;
