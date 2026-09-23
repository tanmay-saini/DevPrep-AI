import { runCodeWithPiston } from '../services/pistonService.js';
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

    // Execute the user code via Piston
    const executionResult = await runCodeWithPiston({ language, code, stdin });

    let testCaseResults = [];
    let allPassed = executionResult.success;

    // If question has defined test cases, run validation
    if (questionId) {
      const question = await Question.findById(questionId);
      if (question && question.testCases && question.testCases.length > 0) {
        testCaseResults = question.testCases.map((tc, idx) => {
          // Check if expected output is found in stdout
          const expectedClean = tc.expectedOutput.trim();
          const isMatch = executionResult.stdout.includes(expectedClean) || executionResult.output.includes(expectedClean);
          return {
            caseNumber: idx + 1,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            actualOutput: executionResult.stdout || executionResult.output || '(no output)',
            passed: isMatch && executionResult.exitCode === 0,
            isHidden: tc.isHidden || false,
          };
        });

        allPassed = testCaseResults.length > 0 ? testCaseResults.every((t) => t.passed) : executionResult.success;
      }

      // Record attempt if user is authenticated
      if (req.user) {
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
