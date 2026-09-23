import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Code2, 
  FileText, 
  BookOpen, 
  BarChart3, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Database, 
  Cpu, 
  Terminal,
  Activity
} from 'lucide-react';
import { checkServerHealth } from '../services/api';

export const HomePage = () => {
  const [health, setHealth] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(true);
  const [healthError, setHealthError] = useState(null);

  const fetchHealth = async () => {
    setLoadingHealth(true);
    setHealthError(null);
    try {
      const data = await checkServerHealth();
      setHealth(data);
    } catch (err) {
      setHealthError(err.message || 'Unable to connect to backend server');
    } finally {
      setLoadingHealth(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const features = [
    {
      title: 'AI Mock Interviews',
      desc: 'Interactive technical & behavioral simulations. Receive instant rubric-based scoring, missing points, and model answers.',
      icon: Bot,
      color: 'from-blue-500/10 to-indigo-500/10 text-brand-600 dark:text-brand-400',
      badge: 'Gemini 2.0 Free Tier',
      link: '/interview',
    },
    {
      title: 'Monaco Code Runner',
      desc: 'Full-featured in-browser code editor with Piston execution engine. Run DSA test cases in JS, Python, C++, and Java with zero lag.',
      icon: Code2,
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400',
      badge: 'Zero API Key Needed',
      link: '/practice',
    },
    {
      title: 'Curated Question Bank',
      desc: '300+ interview questions across DSA, OOPs, DBMS, OS, Computer Networks, and System Design with company tags and hints.',
      icon: BookOpen,
      color: 'from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400',
      badge: 'Core SDE Syllabus',
      link: '/questions',
    },
    {
      title: 'AI Resume & ATS Review',
      desc: 'Extract and evaluate your resume against SDE job expectations. Get ATS compatibility score, missing keywords, and formatting tips.',
      icon: FileText,
      color: 'from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400',
      badge: 'Client-Side PDF Extraction',
      link: '/resume',
    },
    {
      title: 'Analytics Dashboard',
      desc: 'Monitor your preparation velocity, category-wise competence, average AI scores, and pinpoint weak conceptual areas.',
      icon: BarChart3,
      color: 'from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400',
      badge: 'Visual Progress Insights',
      link: '/dashboard',
    },
    {
      title: 'Zero-Cost Architecture',
      desc: 'Crafted 100% on free-tier services: React + Vite, Node + Express, MongoDB Atlas Free M0, Google Gemini API, and Piston.',
      icon: Layers,
      color: 'from-cyan-500/10 to-sky-500/10 text-cyan-600 dark:text-cyan-400',
      badge: '100% Free Forever',
      link: '#architecture',
    },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Full-Stack AI Interview Intelligence Workbench</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Master Tech Interviews with <span className="text-brand-600 dark:text-brand-400">Real-Time AI Feedback</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Solve DSA challenges in Monaco, run mock technical & HR interviews scored against industry rubrics, and audit your resume for ATS compliance — 100% free with no paid subscriptions.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/interview"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              >
                Launch Mock Interview
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/questions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
              >
                Browse Question Bank
              </Link>
            </div>
          </div>

          {/* Phase 0 System Health & Status Console */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-surface-light-border dark:border-surface-dark-border shadow-lg p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white font-mono uppercase tracking-wide">
                    Phase 0 Status Monitor
                  </h3>
                </div>
                <button
                  onClick={fetchHealth}
                  disabled={loadingHealth}
                  className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Refresh System Health"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingHealth ? 'animate-spin text-brand-500' : ''}`} />
                </button>
              </div>

              {/* Status breakdown */}
              <div className="space-y-3 font-mono text-xs">
                {/* Server status */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-2.5">
                    <Terminal className="w-4 h-4 text-brand-500" />
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">Express Backend API</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Port 5000 • REST Endpoints</div>
                    </div>
                  </div>
                  {loadingHealth ? (
                    <span className="text-slate-400">checking...</span>
                  ) : health ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ONLINE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" /> STANDBY
                    </span>
                  )}
                </div>

                {/* Database status */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-2.5">
                    <Database className="w-4 h-4 text-cyan-500" />
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">MongoDB Database</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {health?.database?.host ? `${health.database.host} (${health.database.name})` : 'Atlas M0 / Local'}
                      </div>
                    </div>
                  </div>
                  {loadingHealth ? (
                    <span className="text-slate-400">checking...</span>
                  ) : health?.database?.state === 'connected' ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> CONNECTED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-500 dark:text-amber-400 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" /> READY
                    </span>
                  )}
                </div>

                {/* AI & Execution Engines */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-violet-500" />
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">AI & Execution Layer</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Google Gemini + Piston</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> CONFIGURED
                  </span>
                </div>
              </div>

              {healthError && (
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
                  Backend server is starting up or awaiting local process.
                </div>
              )}

              <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>Phase 0: Scaffold Verified</span>
                <span className="text-brand-600 dark:text-brand-400 font-medium">Ready for Phase 1 (Auth)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Engineered for High-Yield Technical Preparation
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Everything you need to transition from textbook knowledge to confident, articulate interview execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white dark:bg-slate-900 rounded-xl border border-surface-light-border dark:border-surface-dark-border p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${feat.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to={feat.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                  >
                    Open Workspace <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
