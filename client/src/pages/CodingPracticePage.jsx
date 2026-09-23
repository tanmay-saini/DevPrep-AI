import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  Loader2, 
  Clock, 
  Cpu,
  BookOpen,
  Check,
  AlertCircle
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
  const [resetToast, setResetToast] = useState(false);

  // Execution output
  const [executionResult, setExecutionResult] = useState(null);
  const [testCaseResults, setTestCaseResults] = useState([]);
  const [allPassed, setAllPassed] = useState(null);
  const [activeOutputTab, setActiveOutputTab] = useState('testcases'); // 'testcases' | 'stdout' | 'complexity'
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);

  // Hints & Solution toggle
  const [revealedHints, setRevealedHints] = useState({});
  const [showSolution, setShowSolution] = useState(false);

  // Default fallback starter function templates
  const defaultTemplates = {
    javascript: `/**
 * Write your JavaScript solution below:
 */
function solution() {
  // Write your solution here
  return true;
}

// Driver call
console.log(solution());`,
    python: `# Write your Python solution below:
def solution():
    # Write your solution here
    return True

# Driver call
print(solution())`,
    cpp: `// Write your C++ solution below:
#include <iostream>
#include <vector>
using namespace std;

void solution() {
    // Write your solution here
}

int main() {
    solution();
    return 0;
}`,
    java: `// Write your Java solution below:
import java.util.*;

public class Main {
    public static void solution() {
        // Write your solution here
    }

    public static void main(String[] args) {
        solution();
    }
}`,
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
      setShowSolution(false);
      setSelectedCaseIdx(0);
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    loadStarterCode(selectedQuestion, newLang);
  };

  const handleResetCode = () => {
    loadStarterCode(selectedQuestion, language);
    setExecutionResult(null);
    setTestCaseResults([]);
    setAllPassed(null);
    setResetToast(true);
    setTimeout(() => setResetToast(false), 2500);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setExecutionResult(null);
    setTestCaseResults([]);
    setAllPassed(null);
    setSelectedCaseIdx(0);

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

  const currentActiveCase = testCaseResults[selectedCaseIdx] || (selectedQuestion?.testCases?.[selectedCaseIdx] ? {
    caseNumber: selectedCaseIdx + 1,
    input: selectedQuestion.testCases[selectedCaseIdx].input,
    expectedOutput: selectedQuestion.testCases[selectedCaseIdx].expectedOutput,
    actualOutput: '(Run code to see output)',
    passed: null
  } : null);

  return (
    <div className="max-w-[1650px] mx-auto px-4 sm:px-6 py-6 space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-light-border dark:border-surface-dark-border pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              LeetCode-Style Practice & Execution Workspace
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive Monaco Editor • Multi-Language Starter Stubs • Deterministic Test Assertions
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2">
          {selectedQuestion && (
            <button
              onClick={() => navigate('/interview', { state: { questionId: selectedQuestion._id, track: 'DSA' } })}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-all shadow-sm"
            >
              <Bot className="w-4 h-4 text-brand-500" /> Start AI Mock Interview
            </button>
          )}
        </div>
      </div>

      {/* Split Pane Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[780px]">
        {/* Left Pane: Problem Description, Test Cases, Hints (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm flex flex-col overflow-hidden">
          {/* Problem Selector Dropdown */}
          <div className="p-4 border-b border-surface-light-border dark:border-surface-dark-border bg-slate-50/70 dark:bg-slate-800/40">
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono mb-1.5">
              Select Problem ({dsaQuestions.length} Available)
            </label>
            <select
              value={selectedQuestion?._id || ''}
              onChange={handleQuestionChange}
              disabled={loadingQuestions}
              className="w-full px-3 py-2 text-sm font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
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
                <span className={`font-mono font-semibold px-2.5 py-0.5 rounded-full border ${difficultyColors[selectedQuestion.difficulty] || ''}`}>
                  {selectedQuestion.difficulty}
                </span>
                <span className="font-mono px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800 font-semibold">
                  {selectedQuestion.category}
                </span>

                {selectedQuestion.companyTags && selectedQuestion.companyTags.map((comp, idx) => (
                  <span key={idx} className="font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] border border-slate-200/50 dark:border-slate-700/50">
                    {comp}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {selectedQuestion.title}
              </h2>

              {/* Problem Description Statement (Pure Problem Statement - No Solution!) */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500">
                  Problem Description
                </h3>
                <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-xs sm:text-sm font-sans leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
                  {selectedQuestion.description || selectedQuestion.title}
                </div>
              </div>

              {/* Sample Test Cases Overview */}
              {selectedQuestion.testCases && selectedQuestion.testCases.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500">
                    Example Test Cases
                  </h3>
                  <div className="space-y-2.5">
                    {selectedQuestion.testCases.map((tc, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs font-mono space-y-1.5 shadow-sm">
                        <div className="font-bold text-slate-500 text-[11px] uppercase tracking-wider">Example {idx + 1}</div>
                        <div><span className="text-slate-500">Input: </span><span className="text-slate-900 dark:text-slate-100 font-semibold">{tc.input}</span></div>
                        <div><span className="text-slate-500">Output: </span><span className="text-emerald-600 dark:text-emerald-400 font-semibold">{tc.expectedOutput}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hints Accordion */}
              {selectedQuestion.hints && selectedQuestion.hints.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Progressive Hints
                  </h3>
                  {selectedQuestion.hints.map((hint, idx) => {
                    const isRevealed = revealedHints[idx];
                    return (
                      <div key={idx} className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
                        <button
                          type="button"
                          onClick={() => setRevealedHints(prev => ({ ...prev, [idx]: !prev[idx] }))}
                          className="w-full px-3.5 py-2.5 flex items-center justify-between text-left font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <span>Hint {idx + 1}</span>
                          {isRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {isRevealed && (
                          <div className="px-3.5 py-2.5 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/40 leading-relaxed">
                            {hint}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Solution Explanation (Optional Toggle) */}
              {selectedQuestion.sampleAnswer && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowSolution(!showSolution)}
                    className="w-full py-2.5 px-3.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-brand-500" />
                      {showSolution ? 'Hide Solution Approach' : 'Reveal Solution Approach & Complexity'}
                    </span>
                    {showSolution ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {showSolution && (
                    <div className="mt-2.5 p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-xs text-slate-700 dark:text-slate-200 leading-relaxed space-y-2">
                      <div className="font-bold text-emerald-700 dark:text-emerald-400">Optimal Algorithmic Approach:</div>
                      <div>{selectedQuestion.sampleAnswer}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">Loading problem...</div>
          )}
        </div>

        {/* Right Pane: Monaco Editor & LeetCode Style Output Console (7 Cols) */}
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
                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
                >
                  <option value="javascript">JavaScript (Node.js LTS - Instant 0ms)</option>
                  <option value="python">Python 3</option>
                  <option value="cpp">C++ (GCC)</option>
                  <option value="java">Java (OpenJDK)</option>
                </select>
              </div>

              {/* Reset code button */}
              <button
                type="button"
                onClick={handleResetCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
                title="Reset code editor to starter template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              {resetToast && (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Reset to template
                </span>
              )}
            </div>

            {/* Run Code Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRunCode}
                disabled={isRunning}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Running Solution...
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
          <div className="rounded-2xl border border-surface-light-border dark:border-surface-dark-border overflow-hidden shadow-sm bg-white dark:bg-slate-900 h-[420px]">
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

          {/* LeetCode Style Output Console Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-surface-light-border dark:border-surface-dark-border shadow-sm overflow-hidden flex flex-col min-h-[250px]">
            {/* Top Bar with Status & Tabs */}
            <div className="flex flex-wrap items-center justify-between px-4 py-2.5 border-b border-surface-light-border dark:border-surface-dark-border bg-slate-50/70 dark:bg-slate-800/40 text-xs font-mono">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-slate-500" />
                <button
                  type="button"
                  onClick={() => setActiveOutputTab('testcases')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    activeOutputTab === 'testcases'
                      ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200 dark:border-slate-800'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Test Cases Result
                </button>
                <button
                  type="button"
                  onClick={() => setActiveOutputTab('stdout')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    activeOutputTab === 'stdout'
                      ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200 dark:border-slate-800'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Raw Stdout
                </button>
                {executionResult?.timeComplexity && (
                  <button
                    type="button"
                    onClick={() => setActiveOutputTab('complexity')}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                      activeOutputTab === 'complexity'
                        ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200 dark:border-slate-800'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Complexity Analysis
                  </button>
                )}
              </div>

              {/* Status Header */}
              {allPassed !== null && (
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-extrabold flex items-center gap-1.5 ${
                    allPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {allPassed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Accepted
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" /> Wrong Answer
                      </>
                    )}
                  </span>
                  {executionResult?.durationMs !== undefined && (
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Runtime: {executionResult.durationMs}ms
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* LeetCode Body Display */}
            <div className="p-5 overflow-y-auto flex-1 font-mono text-xs text-slate-800 dark:text-slate-200">
              {isRunning ? (
                <div className="flex items-center justify-center gap-2.5 text-slate-400 py-10">
                  <Loader2 className="w-5 h-5 animate-spin text-brand-500" />
                  <span className="text-sm font-semibold">Executing solution against test cases...</span>
                </div>
              ) : !executionResult && testCaseResults.length === 0 ? (
                <div className="text-slate-400 py-8 text-center space-y-2">
                  <div className="text-slate-500 font-semibold">Write your solution in the function template above and click:</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    "Run Code & Test Cases"
                  </div>
                </div>
              ) : activeOutputTab === 'testcases' ? (
                /* LeetCode Test Cases Detail View */
                <div className="space-y-4">
                  {/* Case Pill Selector Tabs */}
                  {testCaseResults.length > 0 && (
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                      {testCaseResults.map((tc, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedCaseIdx(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                            selectedCaseIdx === idx
                              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${tc.passed ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          <span>Case {tc.caseNumber}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Active Case Data View */}
                  {currentActiveCase && (
                    <div className="space-y-3">
                      {/* Input Box */}
                      <div className="space-y-1">
                        <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Input =</span>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 font-mono text-xs text-slate-900 dark:text-slate-100">
                          {currentActiveCase.input}
                        </div>
                      </div>

                      {/* Output Box */}
                      <div className="space-y-1">
                        <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Output =</span>
                        <div className={`p-3 rounded-xl font-mono text-xs border ${
                          currentActiveCase.passed === true
                            ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                            : currentActiveCase.passed === false
                            ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
                        }`}>
                          {currentActiveCase.actualOutput || executionResult?.stdout || '(No output produced)'}
                        </div>
                      </div>

                      {/* Expected Box */}
                      <div className="space-y-1">
                        <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Expected =</span>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                          {currentActiveCase.expectedOutput}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : activeOutputTab === 'stdout' ? (
                /* Raw Output Tab */
                <div className="space-y-2">
                  {executionResult?.stderr ? (
                    <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 whitespace-pre-wrap">
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        <AlertCircle className="w-4 h-4" /> Standard Error / Runtime Issue:
                      </div>
                      {executionResult.stderr}
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                      {executionResult?.stdout || executionResult?.output || '(Execution returned successfully with code 0)'}
                    </div>
                  )}
                </div>
              ) : (
                /* Complexity Analysis Tab */
                <div className="p-4 rounded-xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300 font-bold">
                    <Cpu className="w-4 h-4" /> Algorithmic Complexity Breakdown
                  </div>
                  <div>Time Complexity: <span className="font-bold text-slate-900 dark:text-white">{executionResult?.timeComplexity}</span></div>
                  <div>Space Complexity: <span className="font-bold text-slate-900 dark:text-white">{executionResult?.spaceComplexity}</span></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
