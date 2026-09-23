import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  BookOpen, 
  Sparkles, 
  Code2, 
  Bot, 
  Bookmark, 
  BookmarkCheck, 
  Lightbulb, 
  Building2, 
  Tag, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const QuestionDetailModal = ({ question, isOpen, onClose, onBookmarkToggle }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [revealedHints, setRevealedHints] = useState({});
  const [isBookmarking, setIsBookmarking] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isOpen || !question) return null;

  const difficultyColors = {
    Easy: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60',
    Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800/60',
    Hard: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800/60',
  };

  const toggleHint = (idx) => {
    setRevealedHints((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setIsBookmarking(true);
    try {
      const res = await api.post(`/questions/${question._id}/bookmark`);
      if (res.data.success && onBookmarkToggle) {
        onBookmarkToggle(question._id, res.data.isSaved);
      }
    } catch (err) {
      console.error('Bookmark toggle failed:', err);
    } finally {
      setIsBookmarking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-surface-light-border dark:border-surface-dark-border">
          <div className="space-y-2 pr-8">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold font-mono uppercase px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                {question.category}
              </span>
              <span className={`font-semibold font-mono px-2.5 py-0.5 rounded-md border ${difficultyColors[question.difficulty] || ''}`}>
                {question.difficulty}
              </span>
              {question.isCodingProblem && (
                <span className="font-semibold font-mono px-2.5 py-0.5 rounded-md bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                  Coding Challenge
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {question.title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleBookmark}
              disabled={isBookmarking}
              className={`p-2 rounded-lg border transition-colors ${
                question.isSaved
                  ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              title={question.isSaved ? 'Remove bookmark' : 'Bookmark question'}
            >
              {question.isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700 dark:text-slate-300">
          {/* Company and topic tags */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            {question.companyTags && question.companyTags.length > 0 && (
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span className="font-medium">Companies:</span>
                <div className="flex flex-wrap gap-1">
                  {question.companyTags.map((company, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {question.tags && question.tags.length > 0 && (
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <Tag className="w-4 h-4 text-slate-400" />
                <span className="font-medium">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {question.tags.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hints Section */}
          {question.hints && question.hints.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-500 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Interview Hints ({question.hints.length})
              </h3>
              <div className="space-y-2">
                {question.hints.map((hint, idx) => {
                  const isRevealed = revealedHints[idx];
                  return (
                    <div key={idx} className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/40">
                      <button
                        onClick={() => toggleHint(idx)}
                        className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span>Hint {idx + 1}</span>
                        {isRevealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {isRevealed && (
                        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900">
                          {hint}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sample Answer / Explanation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-slate-500">
                Model Solution & Key Concepts
              </h3>
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                {showAnswer ? 'Hide Solution' : 'Reveal Solution'}
              </button>
            </div>

            {showAnswer ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                  <CheckCircle2 className="w-4 h-4" /> Comprehensive Reference Answer
                </div>
                <div className="text-sm font-mono whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200">
                  {question.sampleAnswer}
                </div>
              </div>
            ) : (
              <div 
                onClick={() => setShowAnswer(true)}
                className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20 text-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors space-y-1"
              >
                <BookOpen className="w-6 h-6 mx-auto text-slate-400" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Click to reveal model answer & explanation
                </p>
                <p className="text-[11px] text-slate-500">
                  Try formulating your thoughts first before viewing the answer.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-6 border-t border-surface-light-border dark:border-surface-dark-border bg-slate-50/60 dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Close
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {question.isCodingProblem && (
              <button
                onClick={() => {
                  onClose();
                  navigate('/practice', { state: { questionId: question._id } });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 rounded-lg transition-colors shadow-sm"
              >
                <Code2 className="w-4 h-4 text-emerald-500" />
                Practice in Editor
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                navigate('/interview', { state: { questionId: question._id, track: question.category } });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-lg shadow-sm transition-colors"
            >
              <Bot className="w-4 h-4" />
              Start AI Mock with this Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
