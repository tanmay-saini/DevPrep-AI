import { runCodeWithPiston, judgeLeetCodeExecution } from '../services/pistonService.js';
import { Question } from '../models/Question.js';
import { Attempt } from '../models/Attempt.js';

export const runCode = async (req, res, next) => {
  try {
    const { language = 'javascript', code, stdin = '', questionId } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Code snippet is required.',
      });
    }

    let executionResult;
    let testCaseResults = [];
    let allPassed = false;

    // Check if problem with test cases exists
    let question = null;
    if (questionId) {
      question = await Question.findById(questionId);
    }

    if (question && question.testCases && question.testCases.length > 0) {
      // Run through automated LeetCode judge
      const judgeRes = await judgeLeetCodeExecution({
        language,
        code,
        testCases: question.testCases,
        problemTitle: question.title,
      });

      executionResult = {
        success: judgeRes.success,
        language: judgeRes.language,
        version: judgeRes.version,
        stdout: judgeRes.stdout,
        stderr: judgeRes.stderr,
        output: judgeRes.output,
        exitCode: judgeRes.exitCode,
        timeComplexity: judgeRes.timeComplexity,
        spaceComplexity: judgeRes.spaceComplexity,
      };

      testCaseResults = judgeRes.testCaseResults || [];
      allPassed = judgeRes.allPassed;
    } else {
      // Generic code execution
      executionResult = await runCodeWithPiston({ language, code, stdin });
      allPassed = executionResult.success;
    }

    // Record attempt if user is authenticated and question exists
    if (req.user && questionId) {
      await Attempt.create({
        userId: req.user._id,
        questionId,
        type: 'coding',
        language,
        code,
        status: allPassed ? 'passed' : executionResult.stderr ? 'error' : 'failed',
        testCasesPassed: testCaseResults.filter((t) => t.passed).length,
        testCasesTotal: testCaseResults.length,
      });
    }

    res.status(200).json({
      success: true,
      execution: executionResult,
      testCaseResults,
      allPassed,
    });
  } catch (error) {
    next(error);
  }
};

