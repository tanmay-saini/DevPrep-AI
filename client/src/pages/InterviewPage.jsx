import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  Play, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Clock, 
  Award, 
  ArrowRight, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  Loader2, 
  Layers, 
  BookOpen,
  Check,
  ShieldAlert
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const InterviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, refreshProfile, isAuthenticated } = useAuth();

  // Setup options
  const initialTrack = location.state?.track || 'DSA';
  const initialQuestionId = location.state?.questionId || null;

  const [track, setTrack] = useState(initialTrack);
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState(3);

  // Flow states: 'setup' | 'interviewing' | 'evaluated' | 'completed'
  const [stage, setStage] = useState(initialQuestionId ? 'setup' : 'setup');

  // Session data
  const [sessionId, setSessionId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [revealedHint, setRevealedHint] = useState(false);

  // Evaluation & loading
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [evaluationsHistory, setEvaluationsHistory] = useState([]);
  const [finalDebrief, setFinalDebrief] = useState(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const tracks = [
    { name: 'DSA', desc: 'Data Structures, Algorithms & Complexity', icon: '⚡' },
    { name: 'System Design', desc: 'Scalability, Microservices & Architecture', icon: '🏛️' },
    { name: 'DBMS', desc: 'SQL, NoSQL, Indexing, Transactions & ACID', icon: '💾' },
    { name: 'OOPs', desc: 'Pillars, Design Patterns & Architecture', icon: '🧩' },
    { name: 'OS', desc: 'Processes, Threads, Deadlocks & Memory', icon: '⚙️' },
    { name: 'Computer Networks', desc: 'TCP/IP, HTTP, WebSockets & Security', icon: '🌐' },
    { name: 'HR/Behavioral', desc: 'STAR Framework, Conflict, Leadership & Motivation', icon: '🤝' },
    { name: 'Full Stack General', desc: 'Comprehensive multi-disciplinary technical sweep', icon: '🎯' },
  ];

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  // Start interview handler
  const handleStartInterview = async () => {
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const res = await api.post('/interview/start', {
        track,
        difficulty,
        questionId: initialQuestionId,
        questionCount: initialQuestionId ? 1 : questionCount,
      });

      if (res.data.success) {
        setSessionId(res.data.sessionId);
        setQuestions(res.data.questions);
        setCurrentIdx(0);
        setUserAnswer('');
        setEvaluation(null);
        setEvaluationsHistory([]);
        setStage('interviewing');
        setTimerSeconds(0);
        setIsTimerRunning(true);
        setRevealedHint(false);
        if (refreshProfile) refreshProfile();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to initialize AI Mock Interview session.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit answer for evaluation
  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim() || userAnswer.trim().length < 10) {
      setErrorMsg('Please write a substantive response (at least 10 characters) before submitting.');
      return;
    }

    const currentQ = questions[currentIdx];
    setIsSubmitting(true);
    setErrorMsg(null);
    setIsTimerRunning(false);

    try {
      const res = await api.post('/interview/answer', {
        sessionId,
        questionId: currentQ.id,
        questionTitle: currentQ.title,
        questionPrompt: currentQ.title,
        userAnswer: userAnswer.trim(),
        track: currentQ.category || track,
        difficulty: currentQ.difficulty || difficulty,
      });

      if (res.data.success) {
        setEvaluation(res.data.evaluation);
        setEvaluationsHistory((prev) => [
          ...prev,
          {
            question: currentQ,
            userAnswer: userAnswer.trim(),
            evaluation: res.data.evaluation,
            timeSpent: timerSeconds,
          },
        ]);
        setStage('evaluated');
        setShowModelAnswer(false);
        if (refreshProfile) refreshProfile();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to evaluate answer. Please try again.');
      setIsTimerRunning(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Proceed to next question or complete session
  const handleNextQuestion = async () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setUserAnswer('');
      setEvaluation(null);
      setRevealedHint(false);
      setShowModelAnswer(false);
      setStage('interviewing');
      setIsTimerRunning(true);
    } else {
      // Finish session
      setIsSubmitting(true);
      try {
        const res = await api.post(`/interview/${sessionId}/finish`);
        if (res.data.success) {
          setFinalDebrief(res.data.session);
          setStage('completed');
        }
      } catch (err) {
        setStage('completed');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
    if (score >= 6) return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
    return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
  };

  const currentQ = questions[currentIdx];
  const quotaRemaining = user?.dailyAiQuota?.remaining ?? 10;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-light-border dark:border-surface-dark-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800 mb-2">
            <Bot className="w-3.5 h-3.5" /> Powered by Gemini 3.6 Flash (100% Free Tier)
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Technical Mock Interview
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Simulate real SDE placement interviews with instant rubric-based scoring, missing points, and model answers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span className="text-slate-600 dark:text-slate-400">Daily Quota:</span>
            <span className="font-bold text-slate-900 dark:text-white">{quotaRemaining} left</span>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Notice</p>
            <p className="text-xs text-rose-600 dark:text-rose-400">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* STAGE 1: SETUP & TRACK SELECTION */}
      {stage === 'setup' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Track Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-mono">
              1. Select Interview Domain / Track
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {tracks.map((t) => {
                const isSelected = track === t.name;
                return (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setTrack(t.name)}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'border-brand-600 dark:border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 ring-2 ring-brand-500/20'
                        : 'border-surface-light-border dark:border-surface-dark-border bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{t.icon}</span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-brand-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{t.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty & Question Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-mono">
                2. Target Difficulty
              </label>
              <div className="flex gap-2">
                {['Easy', 'Medium', 'Hard', 'Mixed'].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      difficulty === diff
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-mono">
                3. Number of Interview Questions
              </label>
              <div className="flex gap-2">
                {[1, 3, 5].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      questionCount === cnt
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    {cnt} {cnt === 1 ? 'Question (Quick)' : 'Questions'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Launch CTA */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleStartInterview}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Preparing AI Interviewer...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" /> Begin Mock Interview
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2 & 3: ACTIVE INTERVIEW OR EVALUATED VIEW */}
      {(stage === 'interviewing' || stage === 'evaluated') && currentQ && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Progress & Live Stopwatch */}
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-6 py-3.5 rounded-xl border border-surface-light-border dark:border-surface-dark-border shadow-sm">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 uppercase">
                {currentQ.category || track}
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Question {currentIdx + 1} of {questions.length}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">{formatTime(timerSeconds)}</span>
              </div>
              <button
                onClick={() => setStage('setup')}
                className="text-xs text-rose-600 dark:text-rose-400 hover:underline"
              >
                Quit Session
              </button>
            </div>
          </div>

          {/* Question Prompt Card */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-mono text-slate-500 uppercase font-semibold">
                Interviewer Prompt
              </span>
              <span className="font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {currentQ.difficulty || difficulty}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
              "{currentQ.title}"
            </h2>

            {/* Hint reveal button */}
            {currentQ.hints && currentQ.hints.length > 0 && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setRevealedHint(!revealedHint)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  {revealedHint ? 'Hide Hint' : 'Stuck? Reveal Hint'}
                </button>
                {revealedHint && (
                  <div className="mt-2 p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300">
                    {currentQ.hints[0]}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Answer Input Area (if interviewing) */}
          {stage === 'interviewing' && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <label className="font-bold uppercase tracking-wider font-mono text-slate-700 dark:text-slate-300">
                  Your Answer (Type your technical response)
                </label>
                <span className="font-mono">{userAnswer.split(/\s+/).filter(Boolean).length} words</span>
              </div>

              <textarea
                rows={7}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Structure your answer clearly:
1. High-level concept or algorithmic intuition
2. Technical mechanics / steps
3. Time & Space Complexity or Trade-offs
4. Edge cases & real-world examples"
                className="w-full p-4 text-sm font-sans rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed"
              />

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-slate-500">
                  Tip: Use technical keywords (e.g. O(n), ACID, vtable, STAR format) for higher rubric scoring.
                </p>

                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={isSubmitting || !userAnswer.trim()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Evaluating with AI...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit for Evaluation
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STAGE 3: AI EVALUATION RUBRIC BREAKDOWN */}
          {stage === 'evaluated' && evaluation && (
            <div className="space-y-6 animate-in slide-in-from-bottom-3 duration-200">
              {/* Score Header Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    AI Rubric Score
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Evaluation Result for Question {currentIdx + 1}
                  </h3>
                </div>

                <div className={`px-5 py-2.5 rounded-xl border font-mono font-extrabold text-2xl flex items-center gap-2 ${getScoreColor(evaluation.score)}`}>
                  <Award className="w-6 h-6" />
                  <span>{evaluation.score}</span>
                  <span className="text-xs font-normal opacity-70">/ 10</span>
                </div>
              </div>

              {/* Strengths & Missing Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">
                    <CheckCircle2 className="w-4 h-4" /> What Was Good
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    {evaluation.whatWasGood.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What was missing / Areas for improvement */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider font-mono">
                    <AlertTriangle className="w-4 h-4" /> Areas for Improvement
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    {evaluation.whatWasMissing.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actionable Interview Tip */}
              {evaluation.actionableTip && (
                <div className="p-4 rounded-xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-xs text-brand-900 dark:text-brand-200 flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold font-mono uppercase tracking-wide">High-Yield Interview Tip: </span>
                    <span>{evaluation.actionableTip}</span>
                  </div>
                </div>
              )}

              {/* Model Answer Accordion */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-surface-light-border dark:border-surface-dark-border overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-500" />
                    Senior Engineer Model Answer
                  </span>
                  {showModelAnswer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showModelAnswer && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 text-sm font-mono text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap bg-slate-50/40 dark:bg-slate-800/30">
                    {evaluation.modelAnswer}
                  </div>
                )}
              </div>

              {/* Next Question CTA */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-md transition-all"
                >
                  {currentIdx + 1 < questions.length ? (
                    <>
                      Proceed to Question {currentIdx + 2} of {questions.length}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Complete Session & View Summary
                      <Award className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STAGE 4: SESSION COMPLETED DEBRIEF */}
      {stage === 'completed' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-xl text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 mx-auto flex items-center justify-center text-2xl font-bold">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Mock Interview Completed!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              You evaluated {evaluationsHistory.length} technical interview questions for the <span className="font-semibold text-slate-800 dark:text-slate-200">{track}</span> track.
            </p>

            {finalDebrief?.overallScore ? (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 font-mono text-xl font-bold">
                <span className="text-slate-500 text-xs">AVERAGE SCORE:</span>
                <span className="text-brand-600 dark:text-brand-400">{finalDebrief.overallScore} / 10</span>
              </div>
            ) : null}
          </div>

          {/* AI Debrief Summary */}
          {finalDebrief?.overallFeedback && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                Hiring Manager Debrief
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {finalDebrief.overallFeedback}
              </p>
            </div>
          )}

          {/* Question Breakdown List */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
              Question-by-Question Breakdown
            </h3>
            <div className="space-y-3">
              {evaluationsHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-surface-light-border dark:border-surface-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-slate-500">Question {idx + 1}</span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.question.title}
                    </h4>
                  </div>

                  <div className={`px-3 py-1.5 rounded-lg border font-mono font-bold text-sm shrink-0 ${getScoreColor(item.evaluation.score)}`}>
                    {item.evaluation.score} / 10
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setStage('setup');
                setSessionId(null);
                setQuestions([]);
                setEvaluationsHistory([]);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-md transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Start Another Mock Interview
            </button>
            <Link
              to="/questions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Browse Question Bank
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
