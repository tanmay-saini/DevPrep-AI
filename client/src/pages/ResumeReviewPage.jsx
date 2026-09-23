import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  Loader2, 
  Layers, 
  Bot, 
  FileCheck, 
  Tag, 
  Award,
  AlertCircle
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { extractTextFromPDF } from '../services/pdfExtractor';

export const ResumeReviewPage = () => {
  const [inputMode, setInputMode] = useState('upload'); // 'upload' | 'paste'
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack Web Developer / SDE');
  const [fileName, setFileName] = useState('');
  const [isExtractingPDF, setIsExtractingPDF] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { user, refreshProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const roles = [
    'Full Stack Web Developer / SDE',
    'Frontend Engineer (React / Next.js)',
    'Backend Engineer (Node / Go / Python)',
    'Junior Software Development Engineer (SDE 1)',
    'DevOps & Cloud Engineer',
  ];

  const sampleResumeText = `Alex Mercer
alex.mercer@gmail.com | +1 (555) 019-2834 | github.com/alexmercer | linkedin.com/in/alexmercer
B.Tech in Computer Science and Engineering — Expected May 2025 | GPA: 8.8 / 10

TECHNICAL SKILLS:
- Languages: JavaScript (ES6+), TypeScript, Python, C++, SQL
- Frontend: React.js, Next.js, Redux Toolkit, Tailwind CSS, HTML5, CSS3
- Backend: Node.js, Express.js, RESTful APIs, WebSockets
- Databases: MongoDB, PostgreSQL, Redis
- Tools & DevOps: Git, Docker, Postman, Jest, Linux, AWS (S3, EC2)

EXPERIENCE:
Software Engineering Intern — CloudScale Solutions (June 2024 - Aug 2024)
- Developed responsive UI components in React and TypeScript for client dashboard.
- Created REST API endpoints in Node.js and Express to process analytics metrics.
- Fixed performance bottlenecks in database queries by adding indexes in MongoDB.

PROJECTS:
1. DevPrep AI — Full-Stack Technical Interview Intelligence Platform (MERN, Gemini AI)
- Built interactive interview simulation platform with real-time AI scoring using Google Gemini API.
- Implemented in-browser code editor using Monaco and sandboxed execution runner.
- Configured persistent light/dark themes, JWT authentication, and MongoDB Atlas database.

2. Distributed Task Queue & Notification Engine (Node.js, Redis, WebSockets)
- Architected asynchronous background worker using Redis BullMQ processing 500+ tasks/sec.
- Implemented WebSocket notification server delivering instant push updates to connected clients.
`;

  // Handle PDF file selection
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setErrorMsg('Please upload a valid PDF document.');
      return;
    }

    setFileName(file.name);
    setErrorMsg(null);
    setIsExtractingPDF(true);

    try {
      const extractedText = await extractTextFromPDF(file);
      if (extractedText.length < 50) {
        throw new Error('Extracted PDF text is too short. Try pasting the text directly.');
      }
      setResumeText(extractedText);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to extract text from PDF. Please switch to Paste Text tab.');
    } finally {
      setIsExtractingPDF(false);
    }
  };

  // Submit resume for review
  const handleAnalyzeResume = async () => {
    if (!resumeText.trim() || resumeText.trim().length < 40) {
      setErrorMsg('Please upload a PDF or paste your resume text (at least 40 characters).');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const res = await api.post('/resume/review', {
        resumeText: resumeText.trim(),
        targetRole,
      });

      if (res.data.success) {
        setReviewResult(res.data.review);
        if (refreshProfile) refreshProfile();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyRewrite = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
    if (score >= 65) return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
    return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-light-border dark:border-surface-dark-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Client-Side Parsing + Gemini 3.6 Flash (100% Free)
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Resume & ATS Compatibility Scorer
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Audit your resume against engineering recruitment ATS filters, uncover missing keywords, and get quantified XYZ bullet rewrites.
          </p>
        </div>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Notice</p>
            <p className="text-xs text-rose-600 dark:text-rose-400">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* INPUT / AUDIT WORKSPACE */}
      {!reviewResult ? (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-6">
          {/* Target Role Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-mono">
              1. Target Role & Track
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-4 py-2.5 text-sm font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Input Method Switcher */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-mono">
                2. Provide Resume Content
              </label>
              <div className="flex gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setInputMode('upload')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    inputMode === 'upload'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Upload PDF
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('paste')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    inputMode === 'paste'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Paste Text
                </button>
              </div>
            </div>

            {/* Mode 1: PDF Dropzone */}
            {inputMode === 'upload' && (
              <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-brand-500 dark:hover:border-brand-500 transition-colors bg-slate-50/50 dark:bg-slate-800/30">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-3 pointer-events-none">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400 mx-auto flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {fileName ? fileName : 'Drag and drop your Resume (PDF)'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {isExtractingPDF
                        ? 'Extracting text locally in browser...'
                        : resumeText
                        ? `✓ Extracted ${resumeText.length} characters successfully. Ready to analyze.`
                        : '100% Private: Extracted client-side via PDF.js. No raw PDF storage.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Mode 2: Paste Text Area */}
            {inputMode === 'paste' && (
              <div className="space-y-2">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setResumeText(sampleResumeText)}
                    className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    Load Sample SDE Resume
                  </button>
                </div>
                <textarea
                  rows={10}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your full resume text here (Education, Skills, Experience, Projects)..."
                  className="w-full p-4 text-xs sm:text-sm font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            )}
          </div>

          {/* Action button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleAnalyzeResume}
              disabled={isAnalyzing || isExtractingPDF || !resumeText.trim()}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Scanning with Gemini AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Audit Resume & Generate ATS Report
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* RESULTS: ATS REPORT CARD */
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Top Score Banner */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                Target Role: {reviewResult.targetRole}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                ATS Compatibility & Engineering Placement Score
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                {reviewResult.summary}
              </p>
            </div>

            {/* Big Score Meter */}
            <div className={`px-6 py-4 rounded-2xl border flex flex-col items-center justify-center shrink-0 ${getScoreBadge(reviewResult.atsScore)}`}>
              <span className="text-4xl font-extrabold font-mono">{reviewResult.atsScore}</span>
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">ATS Score / 100</span>
            </div>
          </div>

          {/* Missing Keywords Cloud */}
          {reviewResult.missingKeywords && reviewResult.missingKeywords.length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider font-mono">
                <Tag className="w-4 h-4" /> Recommended Keywords to Add for {reviewResult.targetRole}
              </div>
              <p className="text-xs text-slate-500">
                Recruiters filter resumes using these keywords. Incorporate them into your technical skills or project descriptions:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {reviewResult.missingKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800"
                  >
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Strengths & Weaknesses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Key Strengths
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {reviewResult.strengths?.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Critical Improvement Areas
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {reviewResult.weaknesses?.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section by Section Audit */}
          {reviewResult.sectionFeedback && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500">
                Section-by-Section Audit Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {Object.entries(reviewResult.sectionFeedback).map(([key, sec]) => (
                  <div key={key} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold uppercase font-mono text-slate-800 dark:text-slate-200">{key}</span>
                      <span className="font-mono font-bold text-brand-600 dark:text-brand-400">{sec.score}/100</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{sec.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bullet Point Rewrites ("Before vs After") */}
          {reviewResult.bulletImprovements && reviewResult.bulletImprovements.length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Quantified Bullet Point Rewrites (Google XYZ Formula)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Replace passive statements with strong action verbs and quantified impact metrics:
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {reviewResult.bulletImprovements.map((b, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 space-y-3">
                    {/* Before */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase font-mono">Original:</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 bg-rose-50/50 dark:bg-rose-950/20 p-2.5 rounded-lg border border-rose-200/50 dark:border-rose-900/40">
                        {b.original}
                      </p>
                    </div>

                    {/* After */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase font-mono">Improved Rewrite:</span>
                        <button
                          type="button"
                          onClick={() => handleCopyRewrite(b.improved, idx)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                        >
                          {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          {copiedIdx === idx ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white bg-emerald-50/50 dark:bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-200/50 dark:border-emerald-900/40">
                        {b.improved}
                      </p>
                    </div>

                    {b.reason && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                        Why this works: {b.reason}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setReviewResult(null);
                setResumeText('');
                setFileName('');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Audit Another Resume
            </button>
            <Link
              to="/interview"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
            >
              <Bot className="w-4 h-4 text-brand-500" /> Launch Mock Interview
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
