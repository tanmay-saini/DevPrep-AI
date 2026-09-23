import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Code2, 
  Bot, 
  Building2, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  Loader2, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  X
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { QuestionDetailModal } from '../components/questions/QuestionDetailModal';

export const QuestionBankPage = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyCoding, setOnlyCoding] = useState(false);

  // Selected question modal
  const [activeQuestion, setActiveQuestion] = useState(null);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch categories and companies metadata on mount
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [catRes, compRes] = await Promise.all([
          api.get('/questions/categories'),
          api.get('/questions/companies'),
        ]);
        if (catRes.data.success) setCategories(catRes.data.categories);
        if (compRes.data.success) setCompanies(compRes.data.companies);
      } catch (err) {
        console.error('Failed to fetch filter metadata:', err);
      }
    };
    fetchMetadata();
  }, []);

  // Fetch questions on filter changes
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          difficulty: selectedDifficulty !== 'All' ? selectedDifficulty : undefined,
          company: selectedCompany !== 'All' ? selectedCompany : undefined,
          search: searchTerm.trim() || undefined,
          isCodingProblem: onlyCoding ? true : undefined,
          limit: 100,
        };
        const res = await api.get('/questions', { params });
        if (res.data.success) {
          setQuestions(res.data.questions);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load questions.');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchQuestions();
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedCategory, selectedDifficulty, selectedCompany, searchTerm, onlyCoding]);

  const handleBookmarkToggle = (questionId, isSaved) => {
    setQuestions((prev) =>
      prev.map((q) => (q._id === questionId ? { ...q, isSaved } : q))
    );
    if (activeQuestion && activeQuestion._id === questionId) {
      setActiveQuestion((prev) => ({ ...prev, isSaved }));
    }
  };

  const difficultyColors = {
    Easy: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60',
    Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800/60',
    Hard: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800/60',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-light-border dark:border-surface-dark-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800 mb-2">
            <BookOpen className="w-3.5 h-3.5" /> Curated Syllabus (300+ Problems)
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical Interview Question Bank
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Master Data Structures, Computer Science Fundamentals, System Design, and Behavioral interview prompts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/interview')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-lg shadow-sm transition-all"
          >
            <Bot className="w-4 h-4" /> Start AI Mock Session
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg shrink-0 transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isSelected ? 'bg-brand-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-surface-light-border dark:border-surface-dark-border shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions, concepts, tags (e.g. 'two sum', 'deadlock', 'ACID')..."
              className="w-full pl-10 pr-9 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Difficulty Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Company Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="All">All Companies</option>
              {companies.map((comp) => (
                <option key={comp.name} value={comp.name}>
                  {comp.name} ({comp.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Extra toggle filters */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              checked={onlyCoding}
              onChange={(e) => setOnlyCoding(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="font-medium">Show only coding execution problems</span>
          </label>

          <span className="text-slate-500 font-mono">
            Showing {questions.length} questions
          </span>
        </div>
      </div>

      {/* Questions Grid / List */}
      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
          <p className="text-xs text-slate-500 font-mono">Loading curated questions...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300">
          <p className="font-semibold">{error}</p>
        </div>
      ) : questions.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-surface-light-border dark:border-surface-dark-border space-y-3">
          <BookOpen className="w-10 h-10 mx-auto text-slate-400" />
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">No questions match your filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your difficulty, company, or search keywords to view the broader curriculum.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setSelectedCompany('All');
              setSearchTerm('');
              setOnlyCoding(false);
            }}
            className="px-4 py-2 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {questions.map((q) => (
            <div
              key={q._id}
              onClick={() => setActiveQuestion(q)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-xl border border-surface-light-border dark:border-surface-dark-border p-5 shadow-sm hover:shadow-md hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Meta pills */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-mono uppercase font-semibold text-[11px] px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                    {q.category}
                  </span>
                  <span className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded border ${difficultyColors[q.difficulty] || ''}`}>
                    {q.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                  {q.title}
                </h3>

                {/* Snippet */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {q.sampleAnswer}
                </p>
              </div>

              {/* Tags & Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  {q.companyTags && q.companyTags.slice(0, 2).map((comp, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                      {comp}
                    </span>
                  ))}
                  {q.tags && q.tags.slice(0, 2).map((t, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-brand-600 dark:text-brand-400">
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    View Solution <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  {q.isCodingProblem && (
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono">
                      <Code2 className="w-3 h-3" /> Code
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Question Details Modal */}
      {activeQuestion && (
        <QuestionDetailModal
          question={activeQuestion}
          isOpen={!!activeQuestion}
          onClose={() => setActiveQuestion(null)}
          onBookmarkToggle={handleBookmarkToggle}
        />
      )}
    </div>
  );
};
