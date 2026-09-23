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

export const runCodeWithPiston = async ({ language = 'javascript', code, stdin = '' }) => {
  const lang = language.toLowerCase();
  if (lang === 'javascript' || lang === 'js') {
    return executeJavaScriptLocally(code, stdin);
  }
  // For Python, C++, Java, use the AI sandboxed runner
  return executeWithAI({ language: lang, code, stdin });
};
