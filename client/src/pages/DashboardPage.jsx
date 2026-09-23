import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip 
} from 'recharts';
import { 
  BarChart3, 
  Bot, 
  Code2, 
  FileText, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Award, 
  ArrowRight, 
  Loader2, 
  Target,
  Layers,
  HelpCircle,
  Play
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/dashboard/stats');
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load progress analytics.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Theme colors for charts
  const chartStroke = isDark ? '#6366F1' : '#4F46E5';
  const chartFill = isDark ? '#4F46E5' : '#6366F1';
  const gridStroke = isDark ? '#334155' : '#E2E8F0';
  const textFill = isDark ? '#94A3B8' : '#64748B';
  const tooltipBg = isDark ? '#0F172A' : '#FFFFFF';
  const tooltipBorder = isDark ? '#1E293B' : '#E2E8F0';

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        <p className="text-xs text-slate-500 font-mono">Loading your preparation analytics...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center bg-rose-50 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300">
        <p className="font-semibold">{error || 'Failed to load dashboard metrics'}</p>
      </div>
    );
  }

  const quota = stats.dailyQuota || { used: 0, limit: 10, remaining: 10 };
  const hasAttemptedAny = stats.hasActivity || stats.mockSessionsCompleted > 0 || stats.questionsAttempted > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-light-border dark:border-surface-dark-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800 mb-2">
            <BarChart3 className="w-3.5 h-3.5" /> Real-Time SDE Preparation Analytics
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {user ? `${user.name}'s Preparation Dashboard` : 'Placement Intelligence Dashboard'}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Track competency mastery, mock interview score trajectory, and high-yield focus areas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/interview"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-lg shadow-sm transition-all"
          >
            <Bot className="w-4 h-4" /> Start AI Mock Interview
          </Link>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Questions Covered */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="uppercase font-bold">Questions Practiced</span>
            <BookOpen className="w-4 h-4 text-brand-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {stats.questionsAttempted}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ {stats.totalQuestionsInDB} total</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-brand-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.round((stats.questionsAttempted / (stats.totalQuestionsInDB || 30)) * 100))}%` }}
            ></div>
          </div>
        </div>

        {/* Card 2: AI Mock Score */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="uppercase font-bold">Average AI Mock Score</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
              {stats.averageAiScore > 0 ? stats.averageAiScore : '0.0'}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ 10.0</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Across {stats.mockSessionsCompleted} completed mock sessions
          </p>
        </div>

        {/* Card 3: Coding Pass Rate */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="uppercase font-bold">Code Pass Rate</span>
            <Code2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              {stats.codingPassRate}%
            </span>
            <span className="text-xs text-emerald-600 font-mono">Verified</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Automated test runner validation
          </p>
        </div>

        {/* Card 4: Daily Quota Meter */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span className="uppercase font-bold">Daily Free Quota</span>
            <Sparkles className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {quota.remaining}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ {quota.limit} left today</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Resets automatically at 00:00 UTC
          </p>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart: Competency by Track (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Engineering Competence Radar
              </h3>
              <p className="text-xs text-slate-500">Track-by-track rubric score distribution</p>
            </div>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              Score / 10
            </span>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={stats.competenceData}>
                <PolarGrid stroke={gridStroke} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: textFill, fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} stroke={gridStroke} tick={{ fill: textFill, fontSize: 10 }} />
                <Radar
                  name="Competence"
                  dataKey="score"
                  stroke={chartStroke}
                  fill={chartFill}
                  fillOpacity={hasAttemptedAny ? 0.4 : 0.1}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderColor: tooltipBorder,
                    borderRadius: '0.75rem',
                    color: isDark ? '#F8FAFC' : '#0F172A',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {!hasAttemptedAny && (
            <p className="text-xs text-center text-slate-500 italic">
              Complete your first AI Mock Interview or Code Challenge to calibrate your radar!
            </p>
          )}
        </div>

        {/* Bar Chart: Category Mastery Bars (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Category Mastery Breakdown
            </h3>
            <p className="text-xs text-slate-500">Average score per syllabus discipline</p>
          </div>

          <div className="space-y-3 my-auto">
            {stats.competenceData.map((item) => {
              const scorePercent = Math.min(100, Math.round((item.score / 10) * 100));
              return (
                <div key={item.subject} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item.subject}</span>
                    <span className="font-bold text-brand-600 dark:text-brand-400">
                      {item.score > 0 ? `${item.score} / 10` : 'Not Attempted'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-600 dark:bg-brand-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${scorePercent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Minimum SDE Placement Target: 7.5+</span>
            <span className={stats.averageAiScore >= 7.5 ? 'text-emerald-600 font-semibold' : 'text-slate-500'}>
              {stats.averageAiScore >= 7.5 ? 'On Track' : 'In Progress'}
            </span>
          </div>
        </div>
      </div>

      {/* Weak Areas & Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weak Areas & Recommendations (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider font-mono">
            <Target className="w-4 h-4" /> Targeted Recommendations
          </div>

          <div className="space-y-3">
            {stats.weakAreas && stats.weakAreas.length > 0 ? (
              stats.weakAreas.map((w, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white font-mono uppercase">{w.track}</span>
                    <span className="text-xs font-bold font-mono text-amber-700 dark:text-amber-400">Score: {w.score}/10</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {w.recommendation}
                  </p>
                  <div className="pt-1">
                    <Link
                      to="/interview"
                      state={{ track: w.track.split(' ')[0] }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                    >
                      Practice this track <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <HelpCircle className="w-8 h-8 mx-auto text-slate-400" />
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">No Weak Areas Identified Yet</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Complete mock interviews across DSA, DBMS, OS, and System Design to identify high-yield areas for improvement.
                </p>
                <Link
                  to="/interview"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500"
                >
                  <Play className="w-3 h-3 fill-current" /> Start Mock Interview
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Timeline (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Recent Preparation Timeline
            </h3>
            <span className="text-xs text-slate-500 font-mono">Latest Activity</span>
          </div>

          <div className="space-y-3">
            {stats.recentActivity.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <Clock className="w-8 h-8 mx-auto text-slate-400" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">No activity recorded yet</p>
                <p className="text-[11px] text-slate-500">
                  Your mock interviews, code runs, and resume audits will appear here.
                </p>
              </div>
            ) : (
              stats.recentActivity.map((act, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-brand-600 dark:text-brand-400">
                      {act.type === 'interview' && <Bot className="w-4 h-4" />}
                      {act.type === 'code' && <Code2 className="w-4 h-4" />}
                      {act.type === 'resume' && <FileText className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{act.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{act.subtitle}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 shrink-0">
                    {new Date(act.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
