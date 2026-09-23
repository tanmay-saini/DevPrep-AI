import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Code2, 
  Terminal as TerminalIcon, 
  Sparkles, 
  Bot, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Loader2, 
  Building2,
  Clock,
  Cpu
} from 'lucide-react';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';

export const CodingPracticePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [dsaQuestions, setDsaQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  // Editor states
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Execution output
  const [executionResult, setExecutionResult] = useState(null);
  const [testCaseResults, setTestCaseResults] = useState([]);
  const [allPassed, setAllPassed] = useState(null);
  const [activeOutputTab, setActiveOutputTab] = useState('testcases'); // 'testcases' | 'stdout' | 'complexity'

  // Hints
  const [revealedHints, setRevealedHints] = useState({});

  // Default fallback code templates
  const defaultTemplates = {
    javascript: `// Write your JavaScript solution below:\nfunction solution() {\n  console.log("Solution running...");\n  return true;\n}\n\nsolution();`,
    python: `# Write your Python solution below:\ndef solution():\n    print("Solution running...")\n    return True\n\nsolution()`,
    cpp: `// Write your C++ solution below:\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Solution running..." << endl;\n    return 0;\n}`,
    java: `// Write your Java solution below:\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Solution running...");\n    }\n}`,
  };

  // Fetch DSA coding problems on mount
  useEffect(() => {
    const fetchDsaQuestions = async () => {
      setLoadingQuestions(true);
      try {
        const res = await api.get('/questions', { params: { isCodingProblem: true, limit: 100 } });
        if (res.data.success && res.data.questions.length > 0) {
          setDsaQuestions(res.data.questions);

          // Check if navigated with state questionId
          const targetId = location.state?.questionId;
          const initialQ = targetId
            ? res.data.questions.find((q) => q._id === targetId) || res.data.questions[0]
            : res.data.questions[0];

          setSelectedQuestion(initialQ);
          loadStarterCode(initialQ, 'javascript');
        }
      } catch (err) {
        console.error('Failed to load coding questions:', err);
      } finally {
        setLoadingQuestions(false);
      }
    };

    fetchDsaQuestions();
  }, [location.state?.questionId]);

  const loadStarterCode = (question, lang) => {
    if (question?.starterCode && question.starterCode[lang]) {
      setCode(question.starterCode[lang]);
    } else {
      setCode(defaultTemplates[lang] || defaultTemplates.javascript);
    }
  };

  const handleQuestionChange = (e) => {
    const qId = e.target.value;
    const q = dsaQuestions.find((item) => item._id === qId);
    if (q) {
      setSelectedQuestion(q);
      loadStarterCode(q, language);
      setExecutionResult(null);
      setTestCaseResults([]);
      setAllPassed(null);
      setRevealedHints({});
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    loadStarterCode(selectedQuestion, newLang);
  };

  const handleResetCode = () => {
    loadStarterCode(selectedQuestion, language);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setExecutionResult(null);
    setTestCaseResults([]);
    setAllPassed(null);

    try {
      const res = await api.post('/code/run', {
        language,
        code,
        questionId: selectedQuestion?._id,
      });

      if (res.data.success) {
        setExecutionResult(res.data.execution);
        setTestCaseResults(res.data.testCaseResults || []);
        setAllPassed(res.data.allPassed);
        setActiveOutputTab(res.data.testCaseResults?.length > 0 ? 'testcases' : 'stdout');
      }
    } catch (err) {
      setExecutionResult({
        success: false,
        stderr: err.response?.data?.message || 'Execution error contacting runner service.',
      });
      setActiveOutputTab('stdout');
    } finally {
      setIsRunning(false);
    }
  };

  const difficultyColors = {
    Easy: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60',
    Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800/60',
    Hard: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800/60',
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-light-border dark:border-surface-dark-border pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              In-Browser Coding Practice & Execution
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Monaco Editor + Sandboxed Execution Runner • 100% Free
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2">
          {selectedQuestion && (
            <button
              onClick={() => navigate('/interview', { state: { questionId: selectedQuestion._id, track: 'DSA' } })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors"
            >
              <Bot className="w-3.5 h-3.5" /> Start AI Mock with this Problem
            </button>
          )}
        </div>
      </div>

      {/* Split Pane Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[750px]">
        {/* Left Pane: Problem Description & Test Cases (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm flex flex-col overflow-hidden">
          {/* Problem Selector Dropdown */}
          <div className="p-4 border-b border-surface-light-border dark:border-surface-dark-border bg-slate-50/50 dark:bg-slate-800/40">
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono mb-1.5">
              Select Problem
            </label>
            <select
              value={selectedQuestion?._id || ''}
              onChange={handleQuestionChange}
              disabled={loadingQuestions}
              className="w-full px-3 py-2 text-sm font-semibold rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {dsaQuestions.map((q) => (
                <option key={q._id} value={q._id}>
                  [{q.difficulty}] {q.title}
                </option>
              ))}
            </select>
          </div>

          {/* Problem Details Body */}
          {selectedQuestion ? (
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-slate-700 dark:text-slate-300">
              {/* Badges & Meta */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className={`font-mono font-semibold px-2.5 py-0.5 rounded border ${difficultyColors[selectedQuestion.difficulty] || ''}`}>
                  {selectedQuestion.difficulty}
                </span>
                <span className="font-mono px-2.5 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800 font-semibold">
                  {selectedQuestion.category}
                </span>

                {selectedQuestion.companyTags && selectedQuestion.companyTags.map((comp, idx) => (
                  <span key={idx} className="font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px]">
                    {comp}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {selectedQuestion.title}
              </h2>

              {/* Problem Statement & Sample Answer / Explanation */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500">
                  Problem Description
                </h3>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs sm:text-sm font-sans leading-relaxed text-slate-800 dark:text-slate-200">
                  {selectedQuestion.sampleAnswer}
                </div>
              </div>

              {/* Test Cases Preview */}
              {selectedQuestion.testCases && selectedQuestion.testCases.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500">
                    Sample Test Cases ({selectedQuestion.testCases.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedQuestion.testCases.map((tc, idx) => (
                      <div key={idx} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs font-mono space-y-1">
                        <div className="text-slate-500">Test Case {idx + 1}:</div>
                        <div><span className="text-slate-500">Input: </span><span className="text-slate-800 dark:text-slate-200">{tc.input}</span></div>
                        <div><span className="text-slate-500">Expected: </span><span className="text-emerald-600 dark:text-emerald-400 font-semibold">{tc.expectedOutput}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hints Accordion */}
              {selectedQuestion.hints && selectedQuestion.hints.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Hints
                  </h3>
                  {selectedQuestion.hints.map((hint, idx) => {
                    const isRevealed = revealedHints[idx];
                    return (
                      <div key={idx} className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
                        <button
                          type="button"
                          onClick={() => setRevealedHints(prev => ({ ...prev, [idx]: !prev[idx] }))}
                          className="w-full px-3 py-2 flex items-center justify-between text-left font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <span>Hint {idx + 1}</span>
                          {isRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {isRevealed && (
                          <div className="px-3 py-2 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/40">
                            {hint}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">Loading problem...</div>
          )}
        </div>

        {/* Right Pane: Monaco Editor & Output Console (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Editor Header / Toolbar */}
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">Lang:</span>
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="javascript">JavaScript (Node.js LTS)</option>
                  <option value="python">Python 3</option>
                  <option value="cpp">C++ (GCC)</option>
                  <option value="java">Java (OpenJDK)</option>
                </select>
              </div>

              {/* Reset code button */}
              <button
                type="button"
                onClick={handleResetCode}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Reset to starter template"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Run Code Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRunCode}
                disabled={isRunning}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Running Code...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Run Code & Test Cases
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div className="rounded-2xl border border-surface-light-border dark:border-surface-dark-border overflow-hidden shadow-sm bg-white dark:bg-slate-900 h-[450px]">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme={isDark ? 'vs-dark' : 'light'}
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                minimap: { enabled: false },
                lineNumbers: 'on',
                roundedSelection: true,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                bracketPairColorization: { enabled: true },
                padding: { top: 12, bottom: 12 },
              }}
            />
          </div>

          {/* Console / Output Terminal Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm overflow-hidden flex flex-col flex-1">
            {/* Terminal Tab Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-surface-light-border dark:border-surface-dark-border bg-slate-50/60 dark:bg-slate-800/40 text-xs font-mono">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-slate-500" />
                <button
                  type="button"
                  onClick={() => setActiveOutputTab('testcases')}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                    activeOutputTab === 'testcases'
                      ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200 dark:border-slate-800'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Test Results
                </button>
                <button
                  type="button"
                  onClick={() => setActiveOutputTab('stdout')}
                  className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                    activeOutputTab === 'stdout'
                      ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200 dark:border-slate-800'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Standard Output
                </button>
                {executionResult?.timeComplexity && (
                  <button
                    type="button"
                    onClick={() => setActiveOutputTab('complexity')}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                      activeOutputTab === 'complexity'
                        ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200 dark:border-slate-800'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Complexity Analysis
                  </button>
                )}
              </div>

              {/* Status Pill */}
              {allPassed !== null && (
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                  allPassed
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                }`}>
                  {allPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {allPassed ? 'ALL TEST CASES PASSED' : 'TEST CASES FAILED'}
                </span>
              )}
            </div>

            {/* Terminal Body */}
            <div className="p-4 overflow-y-auto max-h-[220px] font-mono text-xs text-slate-800 dark:text-slate-200">
              {isRunning ? (
                <div className="flex items-center gap-2 text-slate-400 py-4">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-500" />
                  <span>Executing code in sandboxed runner...</span>
                </div>
              ) : !executionResult ? (
                <div className="text-slate-400 py-4 text-center">
                  Click <span className="font-semibold text-emerald-600 dark:text-emerald-400">"Run Code & Test Cases"</span> to execute your solution.
                </div>
              ) : (
                <>
                  {/* Test Cases Tab */}
                  {activeOutputTab === 'testcases' && (
                    <div className="space-y-3">
                      {testCaseResults.length > 0 ? (
                        testCaseResults.map((tc, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg border text-xs ${
                              tc.passed
                                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                                : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-bold">Case {tc.caseNumber}</span>
                              <span className={tc.passed ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                                {tc.passed ? 'Passed' : 'Failed'}
                              </span>
                            </div>
                            <div className="space-y-0.5 text-[11px]">
                              <div><span className="text-slate-500">Input:</span> {tc.input}</div>
                              <div><span className="text-slate-500">Expected:</span> <span className="text-emerald-600 font-semibold">{tc.expectedOutput}</span></div>
                              <div><span className="text-slate-500">Actual:</span> <span className={tc.passed ? 'text-emerald-600' : 'text-rose-600 font-semibold'}>{tc.actualOutput}</span></div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="space-y-2">
                          <div className="text-emerald-600 font-bold">Execution Finished Successfully</div>
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
                            {executionResult.stdout || '(no printed stdout)'}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Standard Output Tab */}
                  {activeOutputTab === 'stdout' && (
                    <div className="space-y-2">
                      {executionResult.stderr ? (
                        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 whitespace-pre-wrap">
                          {executionResult.stderr}
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                          {executionResult.stdout || executionResult.output || '(Execution returned with exit code 0)'}
                        </div>
                      )}
                      {executionResult.durationMs !== undefined && (
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                          <Clock className="w-3.5 h-3.5" /> Execution time: {executionResult.durationMs}ms
                        </div>
                      )}
                    </div>
                  )}

                  {/* Complexity Analysis Tab */}
                  {activeOutputTab === 'complexity' && executionResult.timeComplexity && (
                    <div className="p-4 rounded-xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 text-xs space-y-2">
                      <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300 font-bold">
                        <Cpu className="w-4 h-4" /> Algorithmic Complexity Breakdown
                      </div>
                      <div>Time Complexity: <span className="font-bold text-slate-900 dark:text-white">{executionResult.timeComplexity}</span></div>
                      <div>Space Complexity: <span className="font-bold text-slate-900 dark:text-white">{executionResult.spaceComplexity}</span></div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
