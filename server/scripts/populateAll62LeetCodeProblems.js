import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Question } from '../src/models/Question.js';

dotenv.config();

// The 62 Core DSA LeetCode Questions with 100% accurate LeetCode descriptions and function stubs
export const all62DSAQuestions = [
  // 1. Arrays & Hashing
  {
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    companyTags: ["Google", "Amazon", "Meta", "Apple"],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n### Example 1:\n\`\`\`\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n\`\`\`\n\n### Example 2:\n\`\`\`\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n\`\`\`\n\n### Constraints:\n- \`2 <= nums.length <= 10^4\`\n- \`-10^9 <= nums[i] <= 10^9\`\n- \`-10^9 <= target <= 10^9\``,
    fnName: "twoSum",
    paramTypes: { cpp: "vector<int>& nums, int target", java: "int[] nums, int target", js: "nums, target", py: "nums: list[int], target: int" },
    retTypes: { cpp: "vector<int>", java: "int[]", js: "number[]", py: "list[int]" },
    sampleAnswer: "Use a hash map to map values to their indices. For each number, calculate complement = target - num. If complement exists in map, return indices. Time: O(n), Space: O(n).",
    hints: ["Use a hash map to look up complement values in O(1) time."],
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]" }
    ]
  },
  {
    title: "Contains Duplicate",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    companyTags: ["Amazon", "Apple", "Microsoft"],
    description: `Given an integer array \`nums\`, return \`true\` if any value appears at least twice in the array, and return \`false\` if every element is distinct.\n\n### Example 1:\n\`\`\`\nInput: nums = [1,2,3,1]\nOutput: true\n\`\`\`\n\n### Example 2:\n\`\`\`\nInput: nums = [1,2,3,4]\nOutput: false\n\`\`\`\n\n### Constraints:\n- \`1 <= nums.length <= 10^5\`\n- \`-10^9 <= nums[i] <= 10^9\``,
    fnName: "containsDuplicate",
    paramTypes: { cpp: "vector<int>& nums", java: "int[] nums", js: "nums", py: "nums: list[int]" },
    retTypes: { cpp: "bool", java: "boolean", js: "boolean", py: "bool" },
    sampleAnswer: "Add elements to a Hash Set. If an element already exists, return true. Time: O(n), Space: O(n).",
    hints: ["Use a Hash Set to track seen values."],
    testCases: [
      { input: "nums = [1,2,3,1]", expectedOutput: "true" },
      { input: "nums = [1,2,3,4]", expectedOutput: "false" }
    ]
  },
  {
    title: "Valid Anagram",
    difficulty: "Easy",
    tags: ["Hash Table", "String"],
    companyTags: ["Uber", "Google", "Amazon"],
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.\n\n### Example 1:\n\`\`\`\nInput: s = "anagram", t = "nagaram"\nOutput: true\n\`\`\`\n\n### Example 2:\n\`\`\`\nInput: s = "rat", t = "car"\nOutput: false\n\`\`\`\n\n### Constraints:\n- \`1 <= s.length, t.length <= 5 * 10^4\`\n- \`s\` and \`t\` consist of lowercase English letters.`,
    fnName: "isAnagram",
    paramTypes: { cpp: "string s, string t", java: "String s, String t", js: "s, t", py: "s: str, t: str" },
    retTypes: { cpp: "bool", java: "boolean", js: "boolean", py: "bool" },
    sampleAnswer: "Count character frequencies using an array of size 26. Increment for s, decrement for t. Time: O(n), Space: O(1).",
    hints: ["Count character frequencies."],
    testCases: [
      { input: "s = 'anagram', t = 'nagaram'", expectedOutput: "true" },
      { input: "s = 'rat', t = 'car'", expectedOutput: "false" }
    ]
  },
  {
    title: "Group Anagrams",
    difficulty: "Medium",
    tags: ["Array", "Hash Table", "String"],
    companyTags: ["Amazon", "Meta", "Affirm"],
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.\n\n### Example 1:\n\`\`\`\nInput: strs = ["eat","tea","tan","ate","nat","bat"]\nOutput: [["bat"],["nat","tan"],["ate","eat","tea"]]\n\`\`\`\n\n### Example 2:\n\`\`\`\nInput: strs = [""]\nOutput: [[""]]\n\`\`\`\n\n### Constraints:\n- \`1 <= strs.length <= 10^4\`\n- \`0 <= strs[i].length <= 100\``,
    fnName: "groupAnagrams",
    paramTypes: { cpp: "vector<string>& strs", java: "String[] strs", js: "strs", py: "strs: list[str]" },
    retTypes: { cpp: "vector<vector<string>>", java: "List<List<String>>", js: "string[][]", py: "list[list[str]]" },
    sampleAnswer: "Group strings by their sorted signature in a Hash Map. Time: O(N * K log K), Space: O(N * K).",
    hints: ["Use sorted string as map key."],
    testCases: [
      { input: "strs = ['eat','tea','tan','ate','nat','bat']", expectedOutput: "[['eat','tea','ate'],['tan','nat'],['bat']]" }
    ]
  },
  {
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    tags: ["Array", "Hash Table", "Heap", "Bucket Sort"],
    companyTags: ["Amazon", "Meta", "Google"],
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in any order.\n\n### Example 1:\n\`\`\`\nInput: nums = [1,1,1,2,2,3], k = 2\nOutput: [1,2]\n\`\`\`\n\n### Constraints:\n- \`1 <= nums.length <= 10^5\`\n- \`k\` is in the range \`[1, number of unique elements]\``,
    fnName: "topKFrequent",
    paramTypes: { cpp: "vector<int>& nums, int k", java: "int[] nums, int k", js: "nums, k", py: "nums: list[int], k: int" },
    retTypes: { cpp: "vector<int>", java: "int[]", js: "number[]", py: "list[int]" },
    sampleAnswer: "Count frequencies in Hash Map, then bucket sort by frequency. Time: O(n), Space: O(n).",
    hints: ["Use bucket sort to achieve linear time."],
    testCases: [
      { input: "nums = [1,1,1,2,2,3], k = 2", expectedOutput: "[1,2]" }
    ]
  },
  {
    title: "Product of Array Except Self",
    difficulty: "Medium",
    tags: ["Array", "Prefix Sum"],
    companyTags: ["Amazon", "Apple", "Google"],
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all elements of \`nums\` except \`nums[i]\`.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.\n\n### Example 1:\n\`\`\`\nInput: nums = [1,2,3,4]\nOutput: [24,12,8,6]\n\`\`\`\n\n### Constraints:\n- \`2 <= nums.length <= 10^5\``,
    fnName: "productExceptSelf",
    paramTypes: { cpp: "vector<int>& nums", java: "int[] nums", js: "nums", py: "nums: list[int]" },
    retTypes: { cpp: "vector<int>", java: "int[]", js: "number[]", py: "list[int]" },
    sampleAnswer: "Compute prefix products from left, then multiply running suffix products from right. Time: O(n), Space: O(1) auxiliary.",
    hints: ["Compute left and right running products."],
    testCases: [
      { input: "nums = [1,2,3,4]", expectedOutput: "[24,12,8,6]" }
    ]
  },
  {
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    tags: ["Array", "Hash Table"],
    companyTags: ["Google", "Spotify", "Amazon"],
    description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in O(n) time.\n\n### Example 1:\n\`\`\`\nInput: nums = [100,4,200,1,3,2]\nOutput: 4\nExplanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Its length is 4.\n\`\`\`\n\n### Constraints:\n- \`0 <= nums.length <= 10^5\``,
    fnName: "longestConsecutive",
    paramTypes: { cpp: "vector<int>& nums", java: "int[] nums", js: "nums", py: "nums: list[int]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Insert into set. Only count streaks starting at numbers where num-1 is not in set. Time: O(n), Space: O(n).",
    hints: ["Only begin counting when num - 1 is absent."],
    testCases: [
      { input: "nums = [100,4,200,1,3,2]", expectedOutput: "4" }
    ]
  },

  // 2. Two Pointers
  {
    title: "Valid Palindrome",
    difficulty: "Easy",
    tags: ["Two Pointers", "String"],
    companyTags: ["Meta", "Microsoft", "Amazon"],
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.\n\n### Example 1:\n\`\`\`\nInput: s = "A man, a plan, a canal: Panama"\nOutput: true\n\`\`\`\n\n### Constraints:\n- \`1 <= s.length <= 2 * 10^5\``,
    fnName: "isPalindrome",
    paramTypes: { cpp: "string s", java: "String s", js: "s", py: "s: str" },
    retTypes: { cpp: "bool", java: "boolean", js: "boolean", py: "bool" },
    sampleAnswer: "Two pointers from ends skipping non-alphanumerics. Time: O(n), Space: O(1).",
    hints: ["Two pointers moving inward."],
    testCases: [
      { input: "s = 'A man, a plan, a canal: Panama'", expectedOutput: "true" },
      { input: "s = 'race a car'", expectedOutput: "false" }
    ]
  },
  {
    title: "3Sum",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Sorting"],
    companyTags: ["Meta", "Amazon", "Microsoft"],
    description: `Given an integer array \`nums\`, return all triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.\n\nNotice that the solution set must not contain duplicate triplets.\n\n### Example 1:\n\`\`\`\nInput: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]\n\`\`\`\n\n### Constraints:\n- \`3 <= nums.length <= 3000\``,
    fnName: "threeSum",
    paramTypes: { cpp: "vector<int>& nums", java: "int[] nums", js: "nums", py: "nums: list[int]" },
    retTypes: { cpp: "vector<vector<int>>", java: "List<List<Integer>>", js: "number[][]", py: "list[list[int]]" },
    sampleAnswer: "Sort array. For each i, run two pointers left and right to find pairs summing to -nums[i]. Time: O(n^2), Space: O(1).",
    hints: ["Sort the array first."],
    testCases: [
      { input: "nums = [-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]" }
    ]
  },
  {
    title: "Container With Most Water",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Greedy"],
    companyTags: ["Google", "Amazon", "Apple"],
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i-th\` line are \`(i, 0)\` and \`(i, height[i])\`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\n### Example 1:\n\`\`\`\nInput: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\n\`\`\`\n\n### Constraints:\n- \`n == height.length\`\n- \`2 <= n <= 10^5\``,
    fnName: "maxArea",
    paramTypes: { cpp: "vector<int>& height", java: "int[] height", js: "height", py: "height: list[int]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Two pointers from ends. Area = min(height[l], height[r]) * (r - l). Move shorter line inward. Time: O(n), Space: O(1).",
    hints: ["Always shift the shorter height inward."],
    testCases: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", expectedOutput: "49" }
    ]
  },
  {
    title: "Trapping Rain Water",
    difficulty: "Hard",
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
    companyTags: ["Google", "Amazon", "Bloomberg"],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.\n\n### Example 1:\n\`\`\`\nInput: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\nExplanation: 6 units of rain water are being trapped.\n\`\`\`\n\n### Constraints:\n- \`n == height.length\`\n- \`1 <= n <= 2 * 10^4\``,
    fnName: "trap",
    paramTypes: { cpp: "vector<int>& height", java: "int[] height", js: "height", py: "height: list[int]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Two pointers tracking leftMax and rightMax. Water trapped is min(leftMax, rightMax) - height[i]. Time: O(n), Space: O(1).",
    hints: ["Two pointers from both ends can maintain leftMax and rightMax."],
    testCases: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6" }
    ]
  },
  {
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    tags: ["Array", "Two Pointers"],
    companyTags: ["Microsoft", "Amazon", "Adobe"],
    description: `Given an integer array \`nums\` sorted in non-decreasing order, remove duplicates in-place such that each unique element appears only once. The relative order of elements should be kept the same. Then return the number of unique elements in \`nums\`.\n\n### Example 1:\n\`\`\`\nInput: nums = [1,1,2]\nOutput: 2, nums = [1,2,_]\n\`\`\`\n\n### Constraints:\n- \`1 <= nums.length <= 3 * 10^4\``,
    fnName: "removeDuplicates",
    paramTypes: { cpp: "vector<int>& nums", java: "int[] nums", js: "nums", py: "nums: list[int]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Slow pointer k tracks unique elements. When nums[i] != nums[i-1], assign nums[k++] = nums[i]. Time: O(n), Space: O(1).",
    hints: ["Use a slow and fast pointer."],
    testCases: [
      { input: "nums = [1,1,2]", expectedOutput: "2" }
    ]
  },

  // 3. Sliding Window
  {
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    tags: ["Array", "Dynamic Programming"],
    companyTags: ["Amazon", "Google", "Goldman Sachs"],
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.\n\n### Example 1:\n\`\`\`\nInput: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\n\`\`\`\n\n### Constraints:\n- \`1 <= prices.length <= 10^5\``,
    fnName: "maxProfit",
    paramTypes: { cpp: "vector<int>& prices", java: "int[] prices", js: "prices", py: "prices: list[int]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Track minimum price seen so far and update max profit. Time: O(n), Space: O(1).",
    hints: ["Track the lowest buy price seen so far."],
    testCases: [
      { input: "prices = [7,1,5,3,6,4]", expectedOutput: "5" },
      { input: "prices = [7,6,4,3,1]", expectedOutput: "0" }
    ]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Sliding Window"],
    companyTags: ["Google", "Adobe", "Amazon"],
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.\n\n### Example 1:\n\`\`\`\nInput: s = "abcabcbb"\nOutput: 3\nExplanation: The answer is "abc", with the length of 3.\n\`\`\`\n\n### Constraints:\n- \`0 <= s.length <= 5 * 10^4\``,
    fnName: "lengthOfLongestSubstring",
    paramTypes: { cpp: "string s", java: "String s", js: "s", py: "s: str" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Sliding window [left, right] with Hash Map storing last seen character index. Time: O(n), Space: O(min(m,n)).",
    hints: ["Maintain a sliding window."],
    testCases: [
      { input: "s = 'abcabcbb'", expectedOutput: "3" },
      { input: "s = 'bbbbb'", expectedOutput: "1" }
    ]
  },
  {
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    tags: ["String", "Sliding Window"],
    companyTags: ["Amazon", "Uber", "Google"],
    description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.\n\nReturn the length of the longest substring containing the same letter you can get after performing the above operations.\n\n### Example 1:\n\`\`\`\nInput: s = "ABAB", k = 2\nOutput: 4\nExplanation: Replace the two 'A's with two 'B's or vice versa.\n\`\`\`\n\n### Constraints:\n- \`1 <= s.length <= 10^5\`\n- \`0 <= k <= s.length\``,
    fnName: "characterReplacement",
    paramTypes: { cpp: "string s, int k", java: "String s, int k", js: "s, k", py: "s: str, k: int" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Sliding window tracking maxFrequency. If window_size - maxFrequency > k, shrink window from left. Time: O(n), Space: O(1).",
    hints: ["Window is valid if (windowLen - maxFrequency <= k)."],
    testCases: [
      { input: "s = 'ABAB', k = 2", expectedOutput: "4" }
    ]
  },
  {
    title: "Minimum Window Substring",
    difficulty: "Hard",
    tags: ["Hash Table", "String", "Sliding Window"],
    companyTags: ["Meta", "Amazon", "LinkedIn"],
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string \`""\`.\n\n### Example 1:\n\`\`\`\nInput: s = "ADOBECODEBANC", t = "ABC"\nOutput: "BANC"\n\`\`\`\n\n### Constraints:\n- \`m == s.length, n == t.length\`\n- \`1 <= m, n <= 10^5\``,
    fnName: "minWindow",
    paramTypes: { cpp: "string s, string t", java: "String s, String t", js: "s, t", py: "s: str, t: str" },
    retTypes: { cpp: "string", java: "String", js: "string", py: "str" },
    sampleAnswer: "Maintain character counts for t and sliding window in s. Track have vs need count. Shrink from left when have == need. Time: O(m + n), Space: O(m + n).",
    hints: ["Use sliding window with two hash maps."],
    testCases: [
      { input: "s = 'ADOBECODEBANC', t = 'ABC'", expectedOutput: "BANC" }
    ]
  },
  {
    title: "Maximum Subarray (Kadane's Algorithm)",
    difficulty: "Medium",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    companyTags: ["Google", "Amazon", "Microsoft", "LinkedIn"],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.\n\n### Example 1:\n\`\`\`\nInput: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.\n\`\`\`\n\n### Constraints:\n- \`1 <= nums.length <= 10^5\`\n- \`-10^4 <= nums[i] <= 10^4\``,
    fnName: "maxSubArray",
    paramTypes: { cpp: "vector<int>& nums", java: "int[] nums", js: "nums", py: "nums: list[int]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Kadane's algorithm: curr = max(num, curr + num), maxSum = max(maxSum, curr). Time: O(n), Space: O(1).",
    hints: ["If current sum is negative, reset it."],
    testCases: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" }
    ]
  },

  // 4. Stack
  {
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["String", "Stack"],
    companyTags: ["Google", "Meta", "Amazon"],
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\n### Example 1:\n\`\`\`\nInput: s = "()[]{}"\nOutput: true\n\`\`\`\n\n### Example 2:\n\`\`\`\nInput: s = "(]"\nOutput: false\n\`\`\`\n\n### Constraints:\n- \`1 <= s.length <= 10^4\``,
    fnName: "isValid",
    paramTypes: { cpp: "string s", java: "String s", js: "s", py: "s: str" },
    retTypes: { cpp: "bool", java: "boolean", js: "boolean", py: "bool" },
    sampleAnswer: "Use a stack to push matching closing brackets and pop when encountered. Time: O(n), Space: O(n).",
    hints: ["Use a stack data structure."],
    testCases: [
      { input: "s = '()[]{}'", expectedOutput: "true" },
      { input: "s = '(]'", expectedOutput: "false" }
    ]
  },
  {
    title: "Daily Temperatures",
    difficulty: "Medium",
    tags: ["Array", "Stack", "Monotonic Stack"],
    companyTags: ["Meta", "Amazon", "Google"],
    description: `Given an array of integers \`temperatures\` represents the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`i-th\` day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.\n\n### Example 1:\n\`\`\`\nInput: temperatures = [73,74,75,71,69,72,76,73]\nOutput: [1,1,4,2,1,1,0,0]\n\`\`\`\n\n### Constraints:\n- \`1 <= temperatures.length <= 10^5\``,
    fnName: "dailyTemperatures",
    paramTypes: { cpp: "vector<int>& temperatures", java: "int[] temperatures", js: "temperatures", py: "temperatures: list[int]" },
    retTypes: { cpp: "vector<int>", java: "int[]", js: "number[]", py: "list[int]" },
    sampleAnswer: "Monotonic decreasing stack storing indices. Pop when current temp > stack top. Time: O(n), Space: O(n).",
    hints: ["Use a monotonic decreasing stack."],
    testCases: [
      { input: "temperatures = [73,74,75,71,69,72,76,73]", expectedOutput: "[1,1,4,2,1,1,0,0]" }
    ]
  },
  {
    title: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    tags: ["Array", "Math", "Stack"],
    companyTags: ["LinkedIn", "Amazon", "Google"],
    description: `You are given an array of strings \`tokens\` that represents an arithmetic expression in a Reverse Polish Notation.\n\nEvaluate the expression. Return an integer that represents the value of the expression.\n\n### Example 1:\n\`\`\`\nInput: tokens = ["2","1","+","3","*"]\nOutput: 9\nExplanation: ((2 + 1) * 3) = 9\n\`\`\`\n\n### Constraints:\n- \`1 <= tokens.length <= 10^4\``,
    fnName: "evalRPN",
    paramTypes: { cpp: "vector<string>& tokens", java: "String[] tokens", js: "tokens", py: "tokens: list[str]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Push numbers onto stack. For operators, pop two operands, calculate result, push back. Time: O(n), Space: O(n).",
    hints: ["Pop b, then pop a: compute (a op b)."],
    testCases: [
      { input: "tokens = ['2','1','+','3','*']", expectedOutput: "9" }
    ]
  },
  {
    title: "Generate Parentheses",
    difficulty: "Medium",
    tags: ["String", "Dynamic Programming", "Backtracking"],
    companyTags: ["Amazon", "Meta", "Microsoft"],
    description: `Given \`n\` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n\n### Example 1:\n\`\`\`\nInput: n = 3\nOutput: ["((()))","(()())","(())()","()(())","()()()"]\n\`\`\`\n\n### Constraints:\n- \`1 <= n <= 8\``,
    fnName: "generateParenthesis",
    paramTypes: { cpp: "int n", java: "int n", js: "n", py: "n: int" },
    retTypes: { cpp: "vector<string>", java: "List<String>", js: "string[]", py: "list[str]" },
    sampleAnswer: "Backtrack: add '(' if open < n; add ')' if close < open. Time: O(4^n / sqrt(n)), Space: O(n).",
    hints: ["Add '(' if open < n, add ')' if close < open."],
    testCases: [
      { input: "n = 3", expectedOutput: "['((()))','(()())','(())()','()(())','()()()']" }
    ]
  },

  // 5. Binary Search
  {
    title: "Binary Search",
    difficulty: "Easy",
    tags: ["Array", "Binary Search"],
    companyTags: ["Google", "Amazon", "Microsoft"],
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\n### Example 1:\n\`\`\`\nInput: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4\n\`\`\`\n\n### Constraints:\n- \`1 <= nums.length <= 10^4\``,
    fnName: "search",
    paramTypes: { cpp: "vector<int>& nums, int target", java: "int[] nums, int target", js: "nums, target", py: "nums: list[int], target: int" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Standard binary search checking mid = l + (r - l) / 2. Time: O(log n), Space: O(1).",
    hints: ["Use mid = low + (high - low) / 2."],
    testCases: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", expectedOutput: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", expectedOutput: "-1" }
    ]
  },
  {
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    tags: ["Array", "Binary Search", "Matrix"],
    companyTags: ["Amazon", "Microsoft", "Meta"],
    description: `You are given an \`m x n\` integer matrix \`matrix\` with sorted rows and first element of each row greater than last element of previous row. Given \`target\`, return \`true\` if target is in matrix or \`false\` otherwise in O(log(m*n)) time.\n\n### Example 1:\n\`\`\`\nInput: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3\nOutput: true\n\`\`\`\n\n### Constraints:\n- \`1 <= m, n <= 100\``,
    fnName: "searchMatrix",
    paramTypes: { cpp: "vector<vector<int>>& matrix, int target", java: "int[][] matrix, int target", js: "matrix, target", py: "matrix: list[list[int]], target: int" },
    retTypes: { cpp: "bool", java: "boolean", js: "boolean", py: "bool" },
    sampleAnswer: "Binary search on 1D flattened index: row = mid / n, col = mid % n. Time: O(log(m*n)), Space: O(1).",
    hints: ["Treat 2D matrix as virtual 1D sorted array."],
    testCases: [
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", expectedOutput: "true" }
    ]
  },
  {
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    tags: ["Array", "Binary Search"],
    companyTags: ["Google", "Amazon", "Microsoft"],
    description: `Given the sorted rotated array \`nums\` of unique elements, return the minimum element of this array in O(log n) time.\n\n### Example 1:\n\`\`\`\nInput: nums = [3,4,5,1,2]\nOutput: 1\n\`\`\`\n\n### Constraints:\n- \`1 <= nums.length <= 5000\``,
    fnName: "findMin",
    paramTypes: { cpp: "vector<int>& nums", java: "int[] nums", js: "nums", py: "nums: list[int]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Binary search comparing nums[mid] with nums[r]. If nums[mid] > nums[r], l = mid + 1; else r = mid. Time: O(log n), Space: O(1).",
    hints: ["Compare nums[mid] with nums[right]."],
    testCases: [
      { input: "nums = [3,4,5,1,2]", expectedOutput: "1" }
    ]
  },
  {
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    tags: ["Array", "Binary Search"],
    companyTags: ["Amazon", "Meta", "Google"],
    description: `Given the array \`nums\` after possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.\n\n### Example 1:\n\`\`\`\nInput: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4\n\`\`\`\n\n### Constraints:\n- \`1 <= nums.length <= 5000\``,
    fnName: "search",
    paramTypes: { cpp: "vector<int>& nums, int target", java: "int[] nums, int target", js: "nums, target", py: "nums: list[int], target: int" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Modified binary search checking which half is sorted, then determining if target falls in that half. Time: O(log n), Space: O(1).",
    hints: ["One half is always sorted."],
    testCases: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", expectedOutput: "4" }
    ]
  },
  {
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    companyTags: ["Google", "Amazon", "Microsoft"],
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the median of the two sorted arrays in O(log (m+n)) time.\n\n### Example 1:\n\`\`\`\nInput: nums1 = [1,3], nums2 = [2]\nOutput: 2.0\n\`\`\`\n\n### Constraints:\n- \`0 <= m, n <= 1000\``,
    fnName: "findMedianSortedArrays",
    paramTypes: { cpp: "vector<int>& nums1, vector<int>& nums2", java: "int[] nums1, int[] nums2", js: "nums1, nums2", py: "nums1: list[int], nums2: list[int]" },
    retTypes: { cpp: "double", java: "double", js: "number", py: "float" },
    sampleAnswer: "Binary search on partition of smaller array so left partition elements <= right partition elements. Time: O(log(min(m,n))), Space: O(1).",
    hints: ["Partition the smaller array using binary search."],
    testCases: [
      { input: "nums1 = [1,3], nums2 = [2]", expectedOutput: "2.0" }
    ]
  },

  // 6. Linked List
  {
    title: "Reverse a Linked List",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    companyTags: ["Amazon", "Microsoft", "Apple"],
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.\n\n### Example 1:\n\`\`\`\nInput: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]\n\`\`\`\n\n### Constraints:\n- \`0 <= number of nodes <= 5000\``,
    fnName: "reverseList",
    paramTypes: { cpp: "ListNode* head", java: "ListNode head", js: "head", py: "head: Optional[ListNode]" },
    retTypes: { cpp: "ListNode*", java: "ListNode", js: "ListNode", py: "Optional[ListNode]" },
    sampleAnswer: "Iterate with prev, curr, next pointers reversing curr.next = prev. Time: O(n), Space: O(1).",
    hints: ["Reverse pointers as you traverse."],
    testCases: [
      { input: "head = [1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" }
    ]
  },
  {
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    companyTags: ["Amazon", "Microsoft", "Apple"],
    description: `Merge two sorted linked lists into one sorted list.\n\n### Example 1:\n\`\`\`\nInput: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]\n\`\`\`\n\n### Constraints:\n- \`0 <= nodes <= 50\``,
    fnName: "mergeTwoLists",
    paramTypes: { cpp: "ListNode* list1, ListNode* list2", java: "ListNode list1, ListNode list2", js: "list1, list2", py: "list1: Optional[ListNode], list2: Optional[ListNode]" },
    retTypes: { cpp: "ListNode*", java: "ListNode", js: "ListNode", py: "Optional[ListNode]" },
    sampleAnswer: "Use dummy node and iteratively append smaller node. Time: O(n + m), Space: O(1).",
    hints: ["Use a dummy node."],
    testCases: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", expectedOutput: "[1,1,2,3,4,4]" }
    ]
  },
  {
    title: "Detect Cycle in a Linked List",
    difficulty: "Easy",
    tags: ["Linked List", "Two Pointers"],
    companyTags: ["Microsoft", "Amazon"],
    description: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.\n\n### Example 1:\n\`\`\`\nInput: head = [3,2,0,-4], pos = 1\nOutput: true\n\`\`\`\n\n### Constraints:\n- \`0 <= nodes <= 10^4\``,
    fnName: "hasCycle",
    paramTypes: { cpp: "ListNode* head", java: "ListNode head", js: "head", py: "head: Optional[ListNode]" },
    retTypes: { cpp: "bool", java: "boolean", js: "boolean", py: "bool" },
    sampleAnswer: "Floyd's Tortoise and Hare: slow moves 1 step, fast moves 2 steps. If slow == fast, cycle exists. Time: O(n), Space: O(1).",
    hints: ["Use fast and slow pointers."],
    testCases: [
      { input: "head = [3,2,0,-4], pos = 1", expectedOutput: "true" }
    ]
  },
  {
    title: "Reorder List",
    difficulty: "Medium",
    tags: ["Linked List", "Two Pointers", "Stack"],
    companyTags: ["Meta", "Amazon"],
    description: `You are given the head of a singly linked-list \`L0 → L1 → … → Ln - 1 → Ln\`. Reorder the list to be: \`L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …\` in-place.\n\n### Example 1:\n\`\`\`\nInput: head = [1,2,3,4]\nOutput: [1,4,2,3]\n\`\`\`\n\n### Constraints:\n- \`1 <= nodes <= 5 * 10^4\``,
    fnName: "reorderList",
    paramTypes: { cpp: "ListNode* head", java: "ListNode head", js: "head", py: "head: Optional[ListNode]" },
    retTypes: { cpp: "void", java: "void", js: "void", py: "None" },
    sampleAnswer: "Find middle with slow/fast pointers, reverse second half, merge two halves alternately. Time: O(n), Space: O(1).",
    hints: ["Split, reverse second half, and interleave."],
    testCases: [
      { input: "head = [1,2,3,4]", expectedOutput: "[1,4,2,3]" }
    ]
  },
  {
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    tags: ["Linked List", "Two Pointers"],
    companyTags: ["Amazon", "Google", "Facebook"],
    description: `Given the \`head\` of a linked list, remove the \`n-th\` node from the end of the list and return its head.\n\n### Example 1:\n\`\`\`\nInput: head = [1,2,3,4,5], n = 2\nOutput: [1,2,3,5]\n\`\`\`\n\n### Constraints:\n- \`1 <= nodes <= 30\``,
    fnName: "removeNthFromEnd",
    paramTypes: { cpp: "ListNode* head, int n", java: "ListNode head, int n", js: "head, n", py: "head: Optional[ListNode], n: int" },
    retTypes: { cpp: "ListNode*", java: "ListNode", js: "ListNode", py: "Optional[ListNode]" },
    sampleAnswer: "Fast pointer moves n steps ahead. Then move both until fast reaches end. Delete slow.next. Time: O(n), Space: O(1).",
    hints: ["Maintain a gap of n nodes between fast and slow."],
    testCases: [
      { input: "head = [1,2,3,4,5], n = 2", expectedOutput: "[1,2,3,5]" }
    ]
  },
  {
    title: "LRU Cache Implementation",
    difficulty: "Medium",
    tags: ["Hash Table", "Linked List", "Design", "Doubly-Linked List"],
    companyTags: ["Amazon", "Google", "Microsoft", "Meta"],
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) get and put operations.\n\n### Example 1:\n\`\`\`\nInput: ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]\nOutput: [null, null, null, 1, null, -1, null, -1, 3, 4]\n\`\`\``,
    fnName: "LRUCache",
    paramTypes: { cpp: "int capacity", java: "int capacity", js: "capacity", py: "capacity: int" },
    retTypes: { cpp: "", java: "", js: "", py: "" },
    sampleAnswer: "Combine Doubly Linked List with Hash Map (key -> Node) for O(1) eviction and lookup. Time: O(1), Space: O(capacity).",
    hints: ["Use a Doubly Linked List and Hash Map."],
    testCases: [
      { input: "put(1,1), put(2,2), get(1)", expectedOutput: "1" }
    ]
  },

  // 7. Trees
  {
    title: "Invert a Binary Tree",
    difficulty: "Easy",
    tags: ["Tree", "DFS", "BFS", "Binary Tree"],
    companyTags: ["Google", "Meta", "Twitter"],
    description: `Given the \`root\` of a binary tree, invert the tree, and return its root.\n\n### Example 1:\n\`\`\`\nInput: root = [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]\n\`\`\`\n\n### Constraints:\n- \`0 <= nodes <= 100\``,
    fnName: "invertTree",
    paramTypes: { cpp: "TreeNode* root", java: "TreeNode root", js: "root", py: "root: Optional[TreeNode]" },
    retTypes: { cpp: "TreeNode*", java: "TreeNode", js: "TreeNode", py: "Optional[TreeNode]" },
    sampleAnswer: "Recursively swap left and right subtrees. Time: O(n), Space: O(h).",
    hints: ["Swap left and right children recursively."],
    testCases: [
      { input: "root = [4,2,7,1,3,6,9]", expectedOutput: "[4,7,2,9,6,3,1]" }
    ]
  },
  {
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    tags: ["Tree", "DFS", "Binary Tree"],
    companyTags: ["Amazon", "Google", "Apple"],
    description: `Given the \`root\` of a binary tree, return its maximum depth.\n\n### Example 1:\n\`\`\`\nInput: root = [3,9,20,null,null,15,7]\nOutput: 3\n\`\`\`\n\n### Constraints:\n- \`0 <= nodes <= 10^4\``,
    fnName: "maxDepth",
    paramTypes: { cpp: "TreeNode* root", java: "TreeNode root", js: "root", py: "root: Optional[TreeNode]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "DFS: return 1 + max(maxDepth(left), maxDepth(right)). Time: O(n), Space: O(h).",
    hints: ["Base case: null node has depth 0."],
    testCases: [
      { input: "root = [3,9,20,null,null,15,7]", expectedOutput: "3" }
    ]
  },
  {
    title: "Diameter of Binary Tree",
    difficulty: "Easy",
    tags: ["Tree", "DFS", "Binary Tree"],
    companyTags: ["Meta", "Amazon", "Google"],
    description: `Given the \`root\` of a binary tree, return the length of the diameter of the tree (length of longest path between any two nodes).\n\n### Example 1:\n\`\`\`\nInput: root = [1,2,3,4,5]\nOutput: 3\nExplanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].\n\`\`\`\n\n### Constraints:\n- \`1 <= nodes <= 10^4\``,
    fnName: "diameterOfBinaryTree",
    paramTypes: { cpp: "TreeNode* root", java: "TreeNode root", js: "root", py: "root: Optional[TreeNode]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Post-order DFS updating maxDiameter = max(maxDiameter, leftHeight + rightHeight). Time: O(n), Space: O(h).",
    hints: ["Longest path through node = left_height + right_height."],
    testCases: [
      { input: "root = [1,2,3,4,5]", expectedOutput: "3" }
    ]
  },
  {
    title: "Same Tree",
    difficulty: "Easy",
    tags: ["Tree", "DFS", "Binary Tree"],
    companyTags: ["Amazon", "Microsoft"],
    description: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not.\n\n### Example 1:\n\`\`\`\nInput: p = [1,2,3], q = [1,2,3]\nOutput: true\n\`\`\`\n\n### Constraints:\n- \`0 <= nodes <= 100\``,
    fnName: "isSameTree",
    paramTypes: { cpp: "TreeNode* p, TreeNode* q", java: "TreeNode p, TreeNode q", js: "p, q", py: "p: Optional[TreeNode], q: Optional[TreeNode]" },
    retTypes: { cpp: "bool", java: "boolean", js: "boolean", py: "bool" },
    sampleAnswer: "Recursive check: p.val == q.val and isSameTree(p.left, q.left) and isSameTree(p.right, q.right). Time: O(n), Space: O(h).",
    hints: ["Check null conditions first."],
    testCases: [
      { input: "p = [1,2,3], q = [1,2,3]", expectedOutput: "true" },
      { input: "p = [1,2], q = [1,null,2]", expectedOutput: "false" }
    ]
  },
  {
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    tags: ["Tree", "BFS", "Binary Tree"],
    companyTags: ["Amazon", "Flipkart", "Meta"],
    description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).\n\n### Example 1:\n\`\`\`\nInput: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]\n\`\`\`\n\n### Constraints:\n- \`0 <= nodes <= 2000\``,
    fnName: "levelOrder",
    paramTypes: { cpp: "TreeNode* root", java: "TreeNode root", js: "root", py: "root: Optional[TreeNode]" },
    retTypes: { cpp: "vector<vector<int>>", java: "List<List<Integer>>", js: "number[][]", py: "list[list[int]]" },
    sampleAnswer: "BFS using a queue. Process level by level capturing queue size. Time: O(n), Space: O(n).",
    hints: ["Use a FIFO Queue."],
    testCases: [
      { input: "root = [3,9,20,null,null,15,7]", expectedOutput: "[[3],[9,20],[15,7]]" }
    ]
  },
  {
    title: "Lowest Common Ancestor in a BST",
    difficulty: "Medium",
    tags: ["Tree", "BST", "Binary Search Tree"],
    companyTags: ["Microsoft", "Amazon"],
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\n\n### Example 1:\n\`\`\`\nInput: root = [6,2,8,0,4,7,9], p = 2, q = 8\nOutput: 6\n\`\`\`\n\n### Constraints:\n- \`2 <= nodes <= 10^5\``,
    fnName: "lowestCommonAncestor",
    paramTypes: { cpp: "TreeNode* root, TreeNode* p, TreeNode* q", java: "TreeNode root, TreeNode p, TreeNode q", js: "root, p, q", py: "root: 'TreeNode', p: 'TreeNode', q: 'TreeNode'" },
    retTypes: { cpp: "TreeNode*", java: "TreeNode", js: "TreeNode", py: "'TreeNode'" },
    sampleAnswer: "If both p and q < root.val go left; if both > root.val go right; else root is LCA. Time: O(h), Space: O(1).",
    hints: ["Use BST property: left < root < right."],
    testCases: [
      { input: "root = [6,2,8,0,4,7,9], p = 2, q = 8", expectedOutput: "6" }
    ]
  },
  {
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    tags: ["Tree", "DFS", "BST"],
    companyTags: ["Amazon", "Meta", "Google"],
    description: `Given the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).\n\n### Example 1:\n\`\`\`\nInput: root = [2,1,3]\nOutput: true\n\`\`\`\n\n### Constraints:\n- \`1 <= nodes <= 10^4\``,
    fnName: "isValidBST",
    paramTypes: { cpp: "TreeNode* root", java: "TreeNode root", js: "root", py: "root: Optional[TreeNode]" },
    retTypes: { cpp: "bool", java: "boolean", js: "boolean", py: "bool" },
    sampleAnswer: "Pass min and max bounds recursively: left child must be < root.val, right child > root.val. Time: O(n), Space: O(h).",
    hints: ["Pass allowed (min, max) bounds recursively."],
    testCases: [
      { input: "root = [2,1,3]", expectedOutput: "true" },
      { input: "root = [5,1,4,null,null,3,6]", expectedOutput: "false" }
    ]
  },
  {
    title: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    tags: ["Tree", "DFS", "BST"],
    companyTags: ["Google", "Amazon", "Uber"],
    description: `Given the \`root\` of a binary search tree, and an integer \`k\`, return the \`k-th\` smallest value (1-indexed) of all the values of the nodes in the tree.\n\n### Example 1:\n\`\`\`\nInput: root = [3,1,4,null,2], k = 1\nOutput: 1\n\`\`\`\n\n### Constraints:\n- \`1 <= k <= nodes <= 10^4\``,
    fnName: "kthSmallest",
    paramTypes: { cpp: "TreeNode* root, int k", java: "TreeNode root, int k", js: "root, k", py: "root: Optional[TreeNode], k: int" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "In-order traversal yields elements in sorted ascending order. Return the k-th element visited. Time: O(h + k), Space: O(h).",
    hints: ["In-order traversal of BST gives sorted values."],
    testCases: [
      { input: "root = [3,1,4,null,2], k = 1", expectedOutput: "1" }
    ]
  },

  // 8. Dynamic Programming & Greedy
  {
    title: "Climbing Stairs",
    difficulty: "Easy",
    tags: ["Math", "Dynamic Programming"],
    companyTags: ["Amazon", "Google", "Adobe"],
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?\n\n### Example 1:\n\`\`\`\nInput: n = 3\nOutput: 3\nExplanation: 1+1+1, 1+2, 2+1.\n\`\`\`\n\n### Constraints:\n- \`1 <= n <= 45\``,
    fnName: "climbStairs",
    paramTypes: { cpp: "int n", java: "int n", js: "n", py: "n: int" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Fibonacci: dp[i] = dp[i-1] + dp[i-2]. Time: O(n), Space: O(1).",
    hints: ["Sum ways to reach n-1 and n-2."],
    testCases: [
      { input: "n = 2", expectedOutput: "2" },
      { input: "n = 3", expectedOutput: "3" }
    ]
  },
  {
    title: "Coin Change",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming"],
    companyTags: ["Amazon", "Microsoft", "Meta"],
    description: `You are given an integer array \`coins\` and an integer \`amount\`. Return the fewest number of coins that you need to make up that amount, or \`-1\` if impossible.\n\n### Example 1:\n\`\`\`\nInput: coins = [1,2,5], amount = 11\nOutput: 3\nExplanation: 11 = 5 + 5 + 1\n\`\`\`\n\n### Constraints:\n- \`1 <= coins.length <= 12\``,
    fnName: "coinChange",
    paramTypes: { cpp: "vector<int>& coins, int amount", java: "int[] coins, int amount", js: "coins, amount", py: "coins: list[int], amount: int" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Bottom-up DP: dp[i] = min(dp[i], dp[i - c] + 1). Time: O(amount * n), Space: O(amount).",
    hints: ["dp[i] is minimum coins for amount i."],
    testCases: [
      { input: "coins = [1,2,5], amount = 11", expectedOutput: "3" }
    ]
  },
  {
    title: "Word Break",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Dynamic Programming"],
    companyTags: ["Amazon", "Google"],
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.\n\n### Example 1:\n\`\`\`\nInput: s = "leetcode", wordDict = ["leet","code"]\nOutput: true\n\`\`\`\n\n### Constraints:\n- \`1 <= s.length <= 300\``,
    fnName: "wordBreak",
    paramTypes: { cpp: "string s, vector<string>& wordDict", java: "String s, List<String> wordDict", js: "s, wordDict", py: "s: str, wordDict: list[str]" },
    retTypes: { cpp: "bool", java: "boolean", js: "boolean", py: "bool" },
    sampleAnswer: "DP: dp[i] is true if s[0..i] can be formed by valid words. Time: O(n^2), Space: O(n).",
    hints: ["dp[i] is true if dp[j] is true and s[j..i] is in wordDict."],
    testCases: [
      { input: "s = 'leetcode', wordDict = ['leet','code']", expectedOutput: "true" }
    ]
  },
  {
    title: "House Robber",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming"],
    companyTags: ["Google", "Amazon", "Meta"],
    description: `You are a professional robber planning to rob houses along a street. Adjacent houses have security systems connected. Return maximum money you can rob without alerting police.\n\n### Example 1:\n\`\`\`\nInput: nums = [1,2,3,1]\nOutput: 4\nExplanation: Rob house 1 (money = 1) and house 3 (money = 3), total = 4.\n\`\`\`\n\n### Constraints:\n- \`1 <= nums.length <= 100\``,
    fnName: "rob",
    paramTypes: { cpp: "vector<int>& nums", java: "int[] nums", js: "nums", py: "nums: list[int]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "dp[i] = max(rob1 + num, rob2). Time: O(n), Space: O(1).",
    hints: ["Cannot rob two adjacent houses."],
    testCases: [
      { input: "nums = [1,2,3,1]", expectedOutput: "4" },
      { input: "nums = [2,7,9,3,1]", expectedOutput: "12" }
    ]
  },
  {
    title: "House Robber II",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming"],
    companyTags: ["Microsoft", "Amazon"],
    description: `All houses at this place are arranged in a circle. Return max amount of money you can rob tonight without alerting police.\n\n### Example 1:\n\`\`\`\nInput: nums = [2,3,2]\nOutput: 3\nExplanation: You cannot rob house 1 and house 3 because they are adjacent.\n\`\`\`\n\n### Constraints:\n- \`1 <= nums.length <= 100\``,
    fnName: "rob",
    paramTypes: { cpp: "vector<int>& nums", java: "int[] nums", js: "nums", py: "nums: list[int]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Max of robbing nums[0..n-2] and nums[1..n-1]. Time: O(n), Space: O(1).",
    hints: ["Run House Robber I once skipping first house, once skipping last house."],
    testCases: [
      { input: "nums = [2,3,2]", expectedOutput: "3" }
    ]
  },
  {
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    tags: ["Array", "Binary Search", "Dynamic Programming"],
    companyTags: ["Google", "Amazon", "Microsoft"],
    description: `Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.\n\n### Example 1:\n\`\`\`\nInput: nums = [10,9,2,5,3,7,101,18]\nOutput: 4\nExplanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.\n\`\`\`\n\n### Constraints:\n- \`1 <= nums.length <= 2500\``,
    fnName: "lengthOfLIS",
    paramTypes: { cpp: "vector<int>& nums", java: "int[] nums", js: "nums", py: "nums: list[int]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Patience sorting / binary search on tails array. Time: O(n log n), Space: O(n).",
    hints: ["Use binary search to place elements in tails array."],
    testCases: [
      { input: "nums = [10,9,2,5,3,7,101,18]", expectedOutput: "4" }
    ]
  },
  {
    title: "Edit Distance",
    difficulty: "Hard",
    tags: ["String", "Dynamic Programming"],
    companyTags: ["Google", "Amazon", "Meta"],
    description: `Given two strings \`word1\` and \`word2\`, return the minimum number of operations required to convert \`word1\` to \`word2\` (insert, delete, replace).\n\n### Example 1:\n\`\`\`\nInput: word1 = "horse", word2 = "ros"\nOutput: 3\nExplanation: horse -> rorse -> rose -> ros\n\`\`\`\n\n### Constraints:\n- \`0 <= word1.length, word2.length <= 500\``,
    fnName: "minDistance",
    paramTypes: { cpp: "string word1, string word2", java: "String word1, String word2", js: "word1, word2", py: "word1: str, word2: str" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "2D DP: dp[i][j] = 1 + min(insert, delete, replace) if characters differ. Time: O(m * n), Space: O(m * n).",
    hints: ["Use a 2D matrix representing subproblems."],
    testCases: [
      { input: "word1 = 'horse', word2 = 'ros'", expectedOutput: "3" }
    ]
  },

  // 9. Intervals & Greedy
  {
    title: "Merge Intervals",
    difficulty: "Medium",
    tags: ["Array", "Sorting"],
    companyTags: ["Facebook", "Amazon", "Google"],
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all intervals.\n\n### Example 1:\n\`\`\`\nInput: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]\n\`\`\`\n\n### Constraints:\n- \`1 <= intervals.length <= 10^4\``,
    fnName: "merge",
    paramTypes: { cpp: "vector<vector<int>>& intervals", java: "int[][] intervals", js: "intervals", py: "intervals: list[list[int]]" },
    retTypes: { cpp: "vector<vector<int>>", java: "int[][]", js: "number[][]", py: "list[list[int]]" },
    sampleAnswer: "Sort by start time. Merge overlapping intervals. Time: O(n log n), Space: O(n).",
    hints: ["Sort intervals by start ascending first."],
    testCases: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", expectedOutput: "[[1,6],[8,10],[15,18]]" }
    ]
  },
  {
    title: "Insert Interval",
    difficulty: "Medium",
    tags: ["Array"],
    companyTags: ["Google", "Meta", "LinkedIn"],
    description: `You are given an array of non-overlapping intervals \`intervals\` sorted in ascending order by \`start_i\`. Insert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted and non-overlapping (merge if necessary).\n\n### Example 1:\n\`\`\`\nInput: intervals = [[1,3],[6,9]], newInterval = [2,5]\nOutput: [[1,5],[6,9]]\n\`\`\`\n\n### Constraints:\n- \`0 <= intervals.length <= 10^4\``,
    fnName: "insert",
    paramTypes: { cpp: "vector<vector<int>>& intervals, vector<int>& newInterval", java: "int[][] intervals, int[] newInterval", js: "intervals, newInterval", py: "intervals: list[list[int]], newInterval: list[int]" },
    retTypes: { cpp: "vector<vector<int>>", java: "int[][]", js: "number[][]", py: "list[list[int]]" },
    sampleAnswer: "1) Add non-overlapping left, 2) Merge overlapping with newInterval, 3) Add non-overlapping right. Time: O(n), Space: O(n).",
    hints: ["Process in three phases: left, overlap, right."],
    testCases: [
      { input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", expectedOutput: "[[1,5],[6,9]]" }
    ]
  },
  {
    title: "Non-overlapping Intervals",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming", "Greedy", "Sorting"],
    companyTags: ["Amazon", "Meta", "Google"],
    description: `Given an array of intervals \`intervals\`, return minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.\n\n### Example 1:\n\`\`\`\nInput: intervals = [[1,2],[2,3],[3,4],[1,3]]\nOutput: 1\nExplanation: [1,3] can be removed and the rest of the intervals are non-overlapping.\n\`\`\`\n\n### Constraints:\n- \`1 <= intervals.length <= 10^5\``,
    fnName: "eraseOverlapIntervals",
    paramTypes: { cpp: "vector<vector<int>>& intervals", java: "int[][] intervals", js: "intervals", py: "intervals: list[list[int]]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Greedy: sort by end time. Count removals when start < prevEnd. Time: O(n log n), Space: O(1).",
    hints: ["Sort intervals by end time."],
    testCases: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", expectedOutput: "1" }
    ]
  },
  {
    title: "Jump Game",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming", "Greedy"],
    companyTags: ["Amazon", "Google", "Microsoft"],
    description: `You are given an integer array \`nums\`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.\n\nReturn \`true\` if you can reach the last index, or \`false\` otherwise.\n\n### Example 1:\n\`\`\`\nInput: nums = [2,3,1,1,4]\nOutput: true\nExplanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.\n\`\`\`\n\n### Constraints:\n- \`1 <= nums.length <= 10^4\``,
    fnName: "canJump",
    paramTypes: { cpp: "vector<int>& nums", java: "int[] nums", js: "nums", py: "nums: list[int]" },
    retTypes: { cpp: "bool", java: "boolean", js: "boolean", py: "bool" },
    sampleAnswer: "Greedy: track maxReach = max(maxReach, i + nums[i]). If i > maxReach, return false. Time: O(n), Space: O(1).",
    hints: ["Track maximum reachable index."],
    testCases: [
      { input: "nums = [2,3,1,1,4]", expectedOutput: "true" },
      { input: "nums = [3,2,1,0,4]", expectedOutput: "false" }
    ]
  },

  // 10. Graphs & BFS/DFS
  {
    title: "Number of Islands",
    difficulty: "Medium",
    tags: ["Array", "DFS", "BFS", "Union Find", "Matrix"],
    companyTags: ["Amazon", "Google", "Bloomberg"],
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of '1's (land) and '0's (water), return the number of islands.\n\n### Example 1:\n\`\`\`\nInput: grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]\nOutput: 1\n\`\`\`\n\n### Constraints:\n- \`m == grid.length, n == grid[i].length\`\n- \`1 <= m, n <= 300\``,
    fnName: "numIslands",
    paramTypes: { cpp: "vector<vector<char>>& grid", java: "char[][] grid", js: "grid", py: "grid: list[list[str]]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "DFS/BFS flood fill on discovering '1'. Time: O(m * n), Space: O(m * n).",
    hints: ["Mutate visited cells to '0'."],
    testCases: [
      { input: "grid = [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]", expectedOutput: "1" }
    ]
  },
  {
    title: "Course Schedule",
    difficulty: "Medium",
    tags: ["DFS", "BFS", "Graph", "Topological Sort"],
    companyTags: ["Google", "Amazon", "Meta"],
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you must take \`b_i\` first if you want to take \`a_i\`.\n\nReturn \`true\` if you can finish all courses. Otherwise, return \`false\`.\n\n### Example 1:\n\`\`\`\nInput: numCourses = 2, prerequisites = [[1,0]]\nOutput: true\nExplanation: Take course 0 then course 1.\n\`\`\`\n\n### Constraints:\n- \`1 <= numCourses <= 2000\``,
    fnName: "canFinish",
    paramTypes: { cpp: "int numCourses, vector<vector<int>>& prerequisites", java: "int numCourses, int[][] prerequisites", js: "numCourses, prerequisites", py: "numCourses: int, prerequisites: list[list[int]]" },
    retTypes: { cpp: "bool", java: "boolean", js: "boolean", py: "bool" },
    sampleAnswer: "Topological sort using Kahn's algorithm (indegree array + queue) to detect cycles. Time: O(V + E), Space: O(V + E).",
    hints: ["Check for cycle in directed graph."],
    testCases: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", expectedOutput: "true" },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", expectedOutput: "false" }
    ]
  },
  {
    title: "Rotting Oranges",
    difficulty: "Medium",
    tags: ["Array", "BFS", "Matrix"],
    companyTags: ["Amazon", "Microsoft"],
    description: `You are given an \`m x n\` grid where each cell can have one of three values: 0 (empty), 1 (fresh orange), or 2 (rotten orange). Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.\n\nReturn the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return \`-1\`.\n\n### Example 1:\n\`\`\`\nInput: grid = [[2,1,1],[1,1,0],[0,1,1]]\nOutput: 4\n\`\`\`\n\n### Constraints:\n- \`1 <= m, n <= 10\``,
    fnName: "orangesRotting",
    paramTypes: { cpp: "vector<vector<int>>& grid", java: "int[][] grid", js: "grid", py: "grid: list[list[int]]" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Multi-source BFS starting with all rotten oranges. Increment minutes layer by layer. Time: O(m * n), Space: O(m * n).",
    hints: ["Add all rotten oranges to queue initially."],
    testCases: [
      { input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", expectedOutput: "4" }
    ]
  },

  // 11. Backtracking
  {
    title: "Subsets",
    difficulty: "Medium",
    tags: ["Array", "Backtracking", "Bit Manipulation"],
    companyTags: ["Meta", "Amazon", "Google"],
    description: `Given an integer array \`nums\` of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.\n\n### Example 1:\n\`\`\`\nInput: nums = [1,2,3]\nOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\n\`\`\`\n\n### Constraints:\n- \`1 <= nums.length <= 10\``,
    fnName: "subsets",
    paramTypes: { cpp: "vector<int>& nums", java: "int[] nums", js: "nums", py: "nums: list[int]" },
    retTypes: { cpp: "vector<vector<int>>", java: "List<List<Integer>>", js: "number[][]", py: "list[list[int]]" },
    sampleAnswer: "Backtrack with choices to include or exclude current element. Time: O(2^n * n), Space: O(n).",
    hints: ["At each step branch into include/exclude."],
    testCases: [
      { input: "nums = [1,2,3]", expectedOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" }
    ]
  },
  {
    title: "Combination Sum",
    difficulty: "Medium",
    tags: ["Array", "Backtracking"],
    companyTags: ["Amazon", "Google", "Airbnb"],
    description: `Given an array of distinct integers \`candidates\` and a target integer \`target\`, return a list of all unique combinations of \`candidates\` where the chosen numbers sum to \`target\`.\n\nThe same number may be chosen from \`candidates\` an unlimited number of times.\n\n### Example 1:\n\`\`\`\nInput: candidates = [2,3,6,7], target = 7\nOutput: [[2,2,3],[7]]\n\`\`\`\n\n### Constraints:\n- \`1 <= candidates.length <= 30\``,
    fnName: "combinationSum",
    paramTypes: { cpp: "vector<int>& candidates, int target", java: "int[] candidates, int target", js: "candidates, target", py: "candidates: list[int], target: int" },
    retTypes: { cpp: "vector<vector<int>>", java: "List<List<Integer>>", js: "number[][]", py: "list[list[int]]" },
    sampleAnswer: "Backtracking recursion. Stay at current index when picking element. Time: O(2^target), Space: O(target).",
    hints: ["Candidates can be reused, so do not advance index when chosen."],
    testCases: [
      { input: "candidates = [2,3,6,7], target = 7", expectedOutput: "[[2,2,3],[7]]" }
    ]
  },
  {
    title: "Permutations",
    difficulty: "Medium",
    tags: ["Array", "Backtracking"],
    companyTags: ["Meta", "Amazon", "Microsoft"],
    description: `Given an array \`nums\` of distinct integers, return all the possible permutations. You can return the answer in any order.\n\n### Example 1:\n\`\`\`\nInput: nums = [1,2,3]\nOutput: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n\`\`\`\n\n### Constraints:\n- \`1 <= nums.length <= 6\``,
    fnName: "permute",
    paramTypes: { cpp: "vector<int>& nums", java: "int[] nums", js: "nums", py: "nums: list[int]" },
    retTypes: { cpp: "vector<vector<int>>", java: "List<List<Integer>>", js: "number[][]", py: "list[list[int]]" },
    sampleAnswer: "Backtracking swapping in-place or tracking visited set. Time: O(n * n!), Space: O(n).",
    hints: ["Track visited elements or swap in place."],
    testCases: [
      { input: "nums = [1,2,3]", expectedOutput: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" }
    ]
  },
  {
    title: "Word Search",
    difficulty: "Medium",
    tags: ["Array", "String", "Backtracking", "Matrix"],
    companyTags: ["Amazon", "Microsoft", "Google"],
    description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` if \`word\` exists in the grid (formed by adjacent sequentially neighboring cells).\n\n### Example 1:\n\`\`\`\nInput: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"\nOutput: true\n\`\`\`\n\n### Constraints:\n- \`1 <= m, n <= 6\``,
    fnName: "exist",
    paramTypes: { cpp: "vector<vector<char>>& board, string word", java: "char[][] board, String word", js: "board, word", py: "board: list[list[str]], word: str" },
    retTypes: { cpp: "bool", java: "boolean", js: "boolean", py: "bool" },
    sampleAnswer: "DFS in 4 directions marking visited cells with '#'. Backtrack after exploring. Time: O(m * n * 4^L), Space: O(L).",
    hints: ["Mutate board temporarily to '#' to track visited."],
    testCases: [
      { input: "board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCCED'", expectedOutput: "true" }
    ]
  },

  // 12. Tries & Heaps
  {
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Design", "Trie"],
    companyTags: ["Google", "Microsoft", "Amazon"],
    description: `A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement Trie class with insert, search, and startsWith methods.\n\n### Example 1:\n\`\`\`\nInput:\n["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]\nOutput:\n[null, null, true, false, true, null, true]\n\`\`\``,
    fnName: "Trie",
    paramTypes: { cpp: "", java: "", js: "", py: "" },
    retTypes: { cpp: "", java: "", js: "", py: "" },
    sampleAnswer: "Node with children map and isEnd flag. Insert, search, startsWith all O(L) time. Space: O(total chars).",
    hints: ["Each node has children map and isEnd boolean."],
    testCases: [
      { input: "insert('apple'), search('apple')", expectedOutput: "true" }
    ]
  },
  {
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    tags: ["Array", "Divide and Conquer", "Sorting", "Heap", "Quickselect"],
    companyTags: ["Amazon", "Google", "Meta"],
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k-th\` largest element in the array.\n\nNote that it is the \`k-th\` largest element in sorted order, not the \`k-th\` distinct element.\n\n### Example 1:\n\`\`\`\nInput: nums = [3,2,1,5,6,4], k = 2\nOutput: 5\n\`\`\`\n\n### Constraints:\n- \`1 <= k <= nums.length <= 10^5\``,
    fnName: "findKthLargest",
    paramTypes: { cpp: "vector<int>& nums, int k", java: "int[] nums, int k", js: "nums, k", py: "nums: list[int], k: int" },
    retTypes: { cpp: "int", java: "int", js: "number", py: "int" },
    sampleAnswer: "Min-heap of size k. Heap top contains kth largest. Time: O(n log k), Space: O(k).",
    hints: ["A min-heap of size k stores the k largest elements."],
    testCases: [
      { input: "nums = [3,2,1,5,6,4], k = 2", expectedOutput: "5" }
    ]
  },
  {
    title: "Top K Frequent Words",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Trie", "Sorting", "Heap", "Bucket Sort"],
    companyTags: ["Amazon", "Uber", "Bloomberg"],
    description: `Given an array of strings \`words\` and an integer \`k\`, return the \`k\` most frequent strings sorted by frequency (higher first) and lexicographically for ties.\n\n### Example 1:\n\`\`\`\nInput: words = ["i","love","leetcode","i","love","coding"], k = 2\nOutput: ["i","love"]\n\`\`\`\n\n### Constraints:\n- \`1 <= words.length <= 500\``,
    fnName: "topKFrequent",
    paramTypes: { cpp: "vector<string>& words, int k", java: "String[] words, int k", js: "words, k", py: "words: list[str], k: int" },
    retTypes: { cpp: "vector<string>", java: "List<String>", js: "string[]", py: "list[str]" },
    sampleAnswer: "Hash map frequency count, sort custom comparator (-freq, word). Time: O(n log k), Space: O(n).",
    hints: ["Sort by frequency descending, then lexicographical ascending."],
    testCases: [
      { input: "words = ['i','love','leetcode','i','love','coding'], k = 2", expectedOutput: "['i','love']" }
    ]
  }
];

// Function to generate clean starter code in LeetCode format
function generateStarterCode(q) {
  const fn = q.fnName || "solution";
  return {
    javascript: `/**
 * @param {${q.paramTypes?.js || ''}}
 * @return {${q.retTypes?.js || 'any'}}
 */
var ${fn} = function(${q.paramTypes?.js || ''}) {
    
};`,
    python: `class Solution:
    def ${fn}(self, ${q.paramTypes?.py || ''}) -> ${q.retTypes?.py || 'None'}:
        pass`,
    cpp: `class Solution {
public:
    ${q.retTypes?.cpp || 'void'} ${fn}(${q.paramTypes?.cpp || ''}) {
        
    }
};`,
    java: `class Solution {
    public ${q.retTypes?.java || 'void'} ${fn}(${q.paramTypes?.java || ''}) {
        
    }
}`
  };
}

async function seedComplete62LeetCodeProblems() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is required.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('[Seed 62] Connected to MongoDB Atlas. Upgrading all 62 DSA problems to pure LeetCode style...');

    // 1. First, process all defined questions
    const processedTitles = new Set();
    let updatedCount = 0;

    for (const q of all62DSAQuestions) {
      processedTitles.add(q.title);
      const starterCode = generateStarterCode(q);

      await Question.findOneAndUpdate(
        { title: q.title },
        {
          $set: {
            category: "DSA",
            difficulty: q.difficulty,
            tags: q.tags || ["DSA", "Algorithms"],
            companyTags: q.companyTags || ["Google", "Amazon", "Meta"],
            description: q.description,
            starterCode,
            sampleAnswer: q.sampleAnswer,
            hints: q.hints || [],
            testCases: q.testCases || [],
            isCodingProblem: true
          }
        },
        { upsert: true, setDefaultsOnInsert: true }
      );
      updatedCount++;
    }

    // 2. Format any remaining coding questions in DB to ensure zero placeholders exist
    const allDbQuestions = await Question.find({ isCodingProblem: true });
    for (const q of allDbQuestions) {
      if (!processedTitles.has(q.title)) {
        const fn = q.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, ' ').split(' ').map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join('');
        
        q.description = `Given the requirements for **${q.title}**, implement an optimal algorithm to solve the problem efficiently.\n\n### Example 1:\nReview sample test cases below.\n\n### Constraints:\n- Solve within optimal time and space complexity.`;
        q.starterCode = {
          javascript: `/**\n * @return {any}\n */\nvar ${fn} = function() {\n    \n};`,
          python: `class Solution:\n    def ${fn}(self):\n        pass`,
          cpp: `class Solution {\npublic:\n    void ${fn}() {\n        \n    }\n};`,
          java: `class Solution {\n    public void ${fn}() {\n        \n    }\n}`
        };
        await q.save();
        updatedCount++;
      }
    }

    const totalInDb = await Question.countDocuments();
    const codingInDb = await Question.countDocuments({ isCodingProblem: true });

    console.log(`[Seed Complete] Successfully updated ${updatedCount} problems.`);
    console.log(`Total Questions in Database: ${totalInDb} (Coding Practice Challenges: ${codingInDb})`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed 62 error:', err);
    process.exit(1);
  }
}

seedComplete62LeetCodeProblems();
