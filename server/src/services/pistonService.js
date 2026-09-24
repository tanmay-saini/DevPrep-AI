import vm from 'node:vm';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Native Node.js VM execution for JavaScript (Instant, 100% Free, zero external dependency)
const executeJavaScriptLocally = (code, stdin = '') => {
  const logs = [];
  const sandbox = {
    console: {
      log: (...args) => logs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')),
      error: (...args) => logs.push('[ERROR] ' + args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')),
      warn: (...args) => logs.push('[WARN] ' + args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')),
    },
    Math,
    Date,
    JSON,
    Array,
    Object,
    String,
    Number,
    Boolean,
    RegExp,
    Map,
    Set,
    WeakMap,
    WeakSet,
    parseInt,
    parseFloat,
    isNaN,
    isFinite,
    stdinInput: stdin,
  };

  const context = vm.createContext(sandbox);

  try {
    const script = new vm.Script(code);
    const start = Date.now();
    const result = script.runInContext(context, { timeout: 4000 });
    const durationMs = Date.now() - start;

    const stdout = logs.join('\n');
    return {
      success: true,
      language: 'javascript',
      version: 'Node.js LTS (Sandboxed)',
      stdout,
      stderr: '',
      output: stdout || (result !== undefined ? String(result) : ''),
      exitCode: 0,
      durationMs,
    };
  } catch (err) {
    return {
      success: false,
      language: 'javascript',
      version: 'Node.js LTS (Sandboxed)',
      stdout: logs.join('\n'),
      stderr: err.message,
      output: err.stack || err.message,
      exitCode: 1,
      durationMs: 0,
    };
  }
};

// AI Code Simulation & Execution Runner for Python, C++, and Java
const executeWithAI = async ({ language, code, stdin = '' }) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is required for multi-language code runner.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are a sandboxed code execution engine.
Language: ${language}
Source Code:
\`\`\`${language}
${code}
\`\`\`
${stdin ? `Standard Input (stdin):\n"""\n${stdin}\n"""` : ''}

Execute the code strictly and trace its exact runtime stdout and stderr output.
Respond strictly in valid JSON format:
{
  "stdout": "<exact printed output lines joined by \\n>",
  "stderr": "<exact compiler or runtime error if any, or empty string>",
  "exitCode": <0 if successful, 1 if syntax/runtime error>,
  "timeComplexity": "<e.g. O(n) or O(n log n)>",
  "spaceComplexity": "<e.g. O(1) or O(n)>"
}`;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      let text = response.text.trim();
      if (text.startsWith('```')) {
        text = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
      }

      const parsed = JSON.parse(text);
      return {
        success: parsed.exitCode === 0 && !parsed.stderr,
        language,
        version: `${language} (AI Sandboxed Runner)`,
        stdout: parsed.stdout || '',
        stderr: parsed.stderr || '',
        output: parsed.stdout || parsed.stderr || '',
        exitCode: parsed.exitCode || 0,
        timeComplexity: parsed.timeComplexity || '',
        spaceComplexity: parsed.spaceComplexity || '',
      };
    } catch (err) {
      const isRateLimit = err.message.includes('429') || err.message.includes('RESOURCE_EXHAUSTED') || err.message.includes('quota');
      if (isRateLimit && attempt === 1) {
        // Wait 1.5 seconds and retry once
        await new Promise((res) => setTimeout(res, 1500));
        continue;
      }

      console.error('[Code Execution Service] AI runner error:', err.message);
      const friendlyError = isRateLimit
        ? 'AI execution rate limit reached (Gemini free tier quota). Please wait a few seconds before retrying, or switch to JavaScript for instant local VM execution.'
        : `Execution error: ${err.message}`;

      return {
        success: false,
        language,
        stdout: '',
        stderr: friendlyError,
        output: friendlyError,
        exitCode: 1,
      };
    }
  }
};

// Dedicated LeetCode Testcase Execution Judge
export const judgeLeetCodeExecution = async ({ language, code, testCases = [], problemTitle = '' }) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is required for code execution judge.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const formattedTestCases = testCases
    .map((tc, i) => `Case ${i + 1}:\nInput: ${tc.input}\nExpected Output: ${tc.expectedOutput}`)
    .join('\n\n');

  const prompt = `You are an automated LeetCode Online Judge and code execution engine.

Problem Title: ${problemTitle || 'DSA Problem'}
Language: ${language}

User Submission:
\`\`\`${language}
${code}
\`\`\`

Test Cases:
${formattedTestCases}

INSTRUCTIONS:
1. First, check if the code has syntax/compilation errors or missing classes/functions. If so, set "stderr" to the error message and "allPassed" to false.
2. If the syntax is valid, simulate executing the user's class (e.g. Solution) or function with the provided inputs for EACH test case.
3. For each test case:
   - "actualOutput": string representation of the exact value returned by the function (e.g. "[0, 1]", "true", "false", "42", "[[1,2]]").
   - "passed": boolean true if actualOutput matches the expectedOutput (disregard minor whitespace/formatting differences, e.g. [0,1] equals [0, 1]), false otherwise.
   - "error": error message string if an exception occurred during this test case, otherwise "".
4. If all test cases pass, "allPassed" is true.
5. Provide time and space complexity estimates (e.g. "O(n)", "O(1)").

Respond STRICTLY in valid JSON (no markdown wrapping, no extra text):
{
  "allPassed": <boolean>,
  "stdout": "<any stdout if printed, else empty string>",
  "stderr": "<syntax or compiler error if any, else empty string>",
  "exitCode": <0 if compiled and ran, 1 if syntax/compile error>,
  "timeComplexity": "<e.g. O(n)>",
  "spaceComplexity": "<e.g. O(1)>",
  "testCaseResults": [
    {
      "caseNumber": 1,
      "input": "<input from case 1>",
      "expectedOutput": "<expected from case 1>",
      "actualOutput": "<actual output returned>",
      "passed": <boolean>,
      "error": "<error if any>"
    }
  ]
}`;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      let text = response.text.trim();
      if (text.startsWith('```')) {
        text = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
      }

      const parsed = JSON.parse(text);
      const results = (parsed.testCaseResults || []).map((res, i) => ({
        caseNumber: res.caseNumber || i + 1,
        input: res.input || (testCases[i] ? testCases[i].input : ''),
        expectedOutput: res.expectedOutput || (testCases[i] ? testCases[i].expectedOutput : ''),
        actualOutput: res.actualOutput !== undefined ? String(res.actualOutput) : '(no return value)',
        passed: Boolean(res.passed),
        error: res.error || '',
      }));

      const allPassed = results.length > 0 ? results.every((r) => r.passed) : Boolean(parsed.allPassed);

      return {
        success: allPassed && !parsed.stderr,
        language,
        version: `${language} (LeetCode Online Judge)`,
        stdout: parsed.stdout || '',
        stderr: parsed.stderr || '',
        output: parsed.stderr ? parsed.stderr : allPassed ? 'All test cases passed!' : 'One or more test cases failed.',
        exitCode: parsed.exitCode !== undefined ? parsed.exitCode : (allPassed ? 0 : 1),
        testCaseResults: results,
        allPassed,
        timeComplexity: parsed.timeComplexity || '',
        spaceComplexity: parsed.spaceComplexity || '',
      };
    } catch (err) {
      const isRateLimit = err.message.includes('429') || err.message.includes('RESOURCE_EXHAUSTED') || err.message.includes('quota');
      if (isRateLimit && attempt === 1) {
        await new Promise((res) => setTimeout(res, 1500));
        continue;
      }

      console.error('[LeetCode Judge] Error:', err.message);
      const friendlyError = isRateLimit
        ? 'AI judge rate limit reached (Gemini free tier quota). Please wait a few seconds before clicking Run Code again.'
        : `Execution error: ${err.message}`;

      return {
        success: false,
        language,
        version: `${language} (LeetCode Online Judge)`,
        stdout: '',
        stderr: friendlyError,
        output: friendlyError,
        exitCode: 1,
        testCaseResults: testCases.map((tc, idx) => ({
          caseNumber: idx + 1,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: '(execution failed)',
          passed: false,
          error: friendlyError,
        })),
        allPassed: false,
        timeComplexity: '',
        spaceComplexity: '',
      };
    }
  }
};

export const runCodeWithPiston = async ({ language = 'javascript', code, stdin = '' }) => {
  const lang = language.toLowerCase();
  if (lang === 'javascript' || lang === 'js') {
    return executeJavaScriptLocally(code, stdin);
  }
  // For Python, C++, Java, use the AI sandboxed runner
  return executeWithAI({ language: lang, code, stdin });
};

