import React from 'react';
import { Terminal, Shield, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-slate-900/50 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                DevPrep AI
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Open-access interview intelligence workbench for software engineers. Master DSA, system design, CS core, and live technical interviews with real-time AI scoring.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-2 font-mono">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 100% Free Tier</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-brand-500" /> Powered by Gemini</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-cyan-500" /> Piston Engine</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-mono mb-3">
              Practice Modules
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="/questions" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Curated Question Bank</a></li>
              <li><a href="/interview" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">AI Mock Interviews</a></li>
              <li><a href="/practice" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Monaco Code Runner</a></li>
              <li><a href="/resume" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">ATS Resume Review</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-mono mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="/dashboard" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Progress Analytics</a></li>
              <li><span className="text-slate-400 dark:text-slate-500">MERN + Gemini 2.0 Stack</span></li>
              <li><span className="text-slate-400 dark:text-slate-500">Zero-Cost Tier Architecture</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} DevPrep AI. Designed for software engineering placement prep.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
