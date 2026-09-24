import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Question } from '../src/models/Question.js';

dotenv.config();

export const leetcodeQuestions = [
  // =========================================================================
  // 1. Arrays & Hashing
  // =========================================================================
  {
    title: "Two Sum",
    category: "DSA",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    companyTags: ["Google", "Amazon", "Meta", "Apple", "Microsoft"],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

### Example 1:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

### Example 3:
\`\`\`
Input: nums = [3,3], target = 6
Output: [0,1]
\`\`\`

### Constraints:
- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
- Only one valid answer exists.`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        pass`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`
    },
    sampleAnswer: "Use a hash map to store each number's value mapped to its index as you iterate. For each element num, calculate complement = target - num. If complement is in the map, return [map.get(complement), currentIndex]. Time Complexity: O(n), Space Complexity: O(n).",
    hints: [
      "A brute force approach checks every pair in O(n^2).",
      "Can we check if the complement (target - num) exists in O(1) time using a hash table?",
      "Map each value to its index as you iterate."
    ],
    isCodingProblem: true,
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]", isHidden: false },
      { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]", isHidden: false },
      { input: "nums = [3,3], target = 6", expectedOutput: "[0,1]", isHidden: false }
    ]
  },

  {
    title: "Contains Duplicate",
    category: "DSA",
    difficulty: "Easy",
    tags: ["Array", "Hash Table", "Sorting"],
    companyTags: ["Amazon", "Apple", "Microsoft", "Google"],
    description: `Given an integer array \`nums\`, return \`true\` if any value appears at least twice in the array, and return \`false\` if every element is distinct.

### Example 1:
\`\`\`
Input: nums = [1,2,3,1]
Output: true
Explanation: The element 1 occurs at the indices 0 and 3.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1,2,3,4]
Output: false
Explanation: All elements are distinct.
\`\`\`

### Example 3:
\`\`\`
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\``,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    
};`,
      python: `class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        pass`,
      cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        
    }
};`,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        
    }
}`
    },
    sampleAnswer: "Insert each element into a Hash Set while iterating. If an element already exists in the set, return true immediately. If the loop completes, return false. Time Complexity: O(n), Space Complexity: O(n).",
    hints: [
      "Use a Hash Set to track seen numbers with O(1) lookups.",
      "Compare the length of the original array with the size of its Set."
    ],
    isCodingProblem: true,
    testCases: [
      { input: "nums = [1,2,3,1]", expectedOutput: "true", isHidden: false },
      { input: "nums = [1,2,3,4]", expectedOutput: "false", isHidden: false },
      { input: "nums = [1,1,1,3,3,4,3,2,4,2]", expectedOutput: "true", isHidden: false }
    ]
  },

  {
    title: "Valid Anagram",
    category: "DSA",
    difficulty: "Easy",
    tags: ["Hash Table", "String", "Sorting"],
    companyTags: ["Uber", "Google", "Amazon", "Bloomberg"],
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Example 1:
\`\`\`
Input: s = "anagram", t = "nagaram"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: s = "rat", t = "car"
Output: false
\`\`\`

### Constraints:
- \`1 <= s.length, t.length <= 5 * 10^4\`
- \`s\` and \`t\` consist of lowercase English letters.`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    
};`,
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        pass`,
      cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        
    }
};`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        
    }
}`
    },
    sampleAnswer: "If string lengths differ, return false. Count frequency of each character in s using a 26-size array, decrement for characters in t. If all counts are zero, return true. Time Complexity: O(n), Space Complexity: O(1).",
    hints: [
      "Check if both strings have equal lengths first.",
      "Use an integer array of size 26 as a frequency counter."
    ],
    isCodingProblem: true,
    testCases: [
      { input: "s = 'anagram', t = 'nagaram'", expectedOutput: "true", isHidden: false },
      { input: "s = 'rat', t = 'car'", expectedOutput: "false", isHidden: false }
    ]
  },

  {
    title: "Group Anagrams",
    category: "DSA",
    difficulty: "Medium",
    tags: ["Array", "Hash Table", "String", "Sorting"],
    companyTags: ["Amazon", "Meta", "Affirm", "Apple", "Microsoft"],
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in **any order**.

### Example 1:
\`\`\`
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
\`\`\`

### Example 2:
\`\`\`
Input: strs = [""]
Output: [[""]]
\`\`\`

### Example 3:
\`\`\`
Input: strs = ["a"]
Output: [["a"]]
\`\`\`

### Constraints:
- \`1 <= strs.length <= 10^4\`
- \`0 <= strs[i].length <= 100\`
- \`strs[i]\` consists of lowercase English letters.`,
    starterCode: {
      javascript: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    
};`,
      python: `class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        pass`,
      cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        
    }
};`,
      java: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        
    }
}`
    },
    sampleAnswer: "Use a hash map where the key is the sorted version of each string (e.g., 'aet') and the value is a list of matching original anagram strings. Return the values of the map. Time: O(N * K log K), Space: O(N * K).",
    hints: [
      "Two strings are anagrams if and only if their sorted character sequences are identical.",
      "Use sorted strings or 26-character count tuples as map keys."
    ],
    isCodingProblem: true,
    testCases: [
      { input: "strs = ['eat','tea','tan','ate','nat','bat']", expectedOutput: "[['eat','tea','ate'],['tan','nat'],['bat']]", isHidden: false },
      { input: "strs = ['a']", expectedOutput: "[['a']]", isHidden: false }
    ]
  },

  {
    title: "Top K Frequent Elements",
    category: "DSA",
    difficulty: "Medium",
    tags: ["Array", "Hash Table", "Divide and Conquer", "Sorting", "Heap", "Bucket Sort"],
    companyTags: ["Amazon", "Meta", "Google", "Microsoft"],
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in **any order**.

### Example 1:
\`\`\`
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1], k = 1
Output: [1]
\`\`\`

### Constraints:
- \`1 <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`k\` is in the range \`[1, the number of unique elements in the array]\`.
- It is **guaranteed** that the answer is unique.`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    
};`,
      python: `class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        pass`,
      cpp: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        
    }
};`,
      java: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        
    }
}`
    },
    sampleAnswer: "Count frequencies of elements in a Hash Map. Use an array of buckets where bucket[i] contains all elements that appear i times. Traverse buckets from right to left to collect the top k frequent numbers. Time: O(n), Space: O(n).",
    hints: [
      "Count frequencies with a hash map.",
      "Bucket sort using frequencies (1 to N) achieves O(n) runtime without sorting."
    ],
    isCodingProblem: true,
    testCases: [
      { input: "nums = [1,1,1,2,2,3], k = 2", expectedOutput: "[1,2]", isHidden: false },
      { input: "nums = [1], k = 1", expectedOutput: "[1]", isHidden: false }
    ]
  },

  {
    title: "Product of Array Except Self",
    category: "DSA",
    difficulty: "Medium",
    tags: ["Array", "Prefix Sum"],
    companyTags: ["Amazon", "Apple", "Google", "Meta", "Microsoft"],
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in **O(n)** time and without using the division operation.

### Example 1:
\`\`\`
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
\`\`\`

### Example 2:
\`\`\`
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
\`\`\`

### Constraints:
- \`2 <= nums.length <= 10^5\`
- \`-30 <= nums[i] <= 30\`
- The product of any prefix or suffix of \`nums\` is guaranteed to fit in a 32-bit integer.`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    
};`,
      python: `class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        pass`,
      cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        
    }
};`,
      java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        
    }
}`
    },
    sampleAnswer: "Create result array where res[i] stores product of all elements to the left of i. Then iterate backwards maintaining running right suffix product and multiply into res[i]. Time: O(n), Space: O(1) auxiliary space.",
    hints: [
      "Calculate prefix products from left to right.",
      "Calculate suffix products from right to left on the fly."
    ],
    isCodingProblem: true,
    testCases: [
      { input: "nums = [1,2,3,4]", expectedOutput: "[24,12,8,6]", isHidden: false },
      { input: "nums = [-1,1,0,-3,3]", expectedOutput: "[0,0,9,0,0]", isHidden: false }
    ]
  },

  {
    title: "Longest Consecutive Sequence",
    category: "DSA",
    difficulty: "Medium",
    tags: ["Array", "Hash Table", "Union Find"],
    companyTags: ["Google", "Spotify", "Amazon", "Microsoft"],
    description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in **O(n)** time.

### Example 1:
\`\`\`
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
\`\`\`

### Constraints:
- \`0 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\``,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    
};`,
      python: `class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        
    }
};`,
      java: `class Solution {
    public int longestConsecutive(int[] nums) {
        
    }
}`
    },
    sampleAnswer: "Insert all numbers into a Hash Set. For each number x, check if (x - 1) is in the set. If NOT, x is the start of a streak: count consecutive elements (x+1, x+2, ...) while in the set. Time: O(n), Space: O(n).",
    hints: [
      "Store numbers in a Hash Set for O(1) lookup.",
      "Only expand sequences when num - 1 is not in the set."
    ],
    isCodingProblem: true,
    testCases: [
      { input: "nums = [100,4,200,1,3,2]", expectedOutput: "4", isHidden: false },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", expectedOutput: "9", isHidden: false }
    ]
  },

  // =========================================================================
  // 2. Two Pointers & Sliding Window
  // =========================================================================
  {
    title: "Valid Palindrome",
    category: "DSA",
    difficulty: "Easy",
    tags: ["Two Pointers", "String"],
    companyTags: ["Meta", "Microsoft", "Amazon", "Apple"],
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.

### Example 1:
\`\`\`
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
\`\`\`

### Example 2:
\`\`\`
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
\`\`\`

### Example 3:
\`\`\`
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.
\`\`\`

### Constraints:
- \`1 <= s.length <= 2 * 10^5\`
- \`s\` consists only of printable ASCII characters.`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    
};`,
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        pass`,
      cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        
    }
};`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        
    }
}`
    },
    sampleAnswer: "Use two pointers from start (left) and end (right). Increment left and decrement right skipping non-alphanumeric characters. Compare lowercase characters. If mismatch, return false. Time: O(n), Space: O(1).",
    hints: ["Use two pointers moving inward.", "Skip non-alphanumeric characters."],
    isCodingProblem: true,
    testCases: [
      { input: "s = 'A man, a plan, a canal: Panama'", expectedOutput: "true", isHidden: false },
      { input: "s = 'race a car'", expectedOutput: "false", isHidden: false }
    ]
  },

  {
    title: "3Sum",
    category: "DSA",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Sorting"],
    companyTags: ["Meta", "Amazon", "Microsoft", "Google"],
    description: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.

### Example 1:
\`\`\`
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [0,1,1]
Output: []
\`\`\`

### Example 3:
\`\`\`
Input: nums = [0,0,0]
Output: [[0,0,0]]
\`\`\`

### Constraints:
- \`3 <= nums.length <= 3000\`
- \`-10^5 <= nums[i] <= 10^5\``,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    
};`,
      python: `class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        pass`,
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        
    }
};`,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        
    }
}`
    },
    sampleAnswer: "Sort array. Loop index i from 0 to n-3. If nums[i] == nums[i-1], skip duplicate. Use two pointers left=i+1 and right=n-1 to find pairs where nums[left] + nums[right] == -nums[i]. Time: O(n^2), Space: O(1) auxiliary.",
    hints: [
      "Sort array first to enable two-pointer searching.",
      "Skip duplicate values for i, left, and right to avoid duplicate triplets."
    ],
    isCodingProblem: true,
    testCases: [
      { input: "nums = [-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]", isHidden: false },
      { input: "nums = [0,0,0]", expectedOutput: "[[0,0,0]]", isHidden: false }
    ]
  },

  {
    title: "Container With Most Water",
    category: "DSA",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Greedy"],
    companyTags: ["Google", "Amazon", "Apple", "Meta"],
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i-th\` line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

### Example 1:
\`\`\`
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.
\`\`\`

### Example 2:
\`\`\`
Input: height = [1,1]
Output: 1
\`\`\`

### Constraints:
- \`n == height.length\`
- \`2 <= n <= 10^5\`
- \`0 <= height[i] <= 10^4\``,
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    
};`,
      python: `class Solution:
    def maxArea(self, height: list[int]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        
    }
};`,
      java: `class Solution {
    public int maxArea(int[] height) {
        
    }
}`
    },
    sampleAnswer: "Two pointers at left=0 and right=n-1. Calculate current area = min(height[left], height[right]) * (right - left). Update max area. Move the pointer with the smaller height inward. Time: O(n), Space: O(1).",
    hints: ["Always shift the shorter vertical bar inward."],
    isCodingProblem: true,
    testCases: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", expectedOutput: "49", isHidden: false },
      { input: "height = [1,1]", expectedOutput: "1", isHidden: false }
    ]
  },

  {
    title: "Trapping Rain Water",
    category: "DSA",
    difficulty: "Hard",
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack", "Monotonic Stack"],
    companyTags: ["Google", "Amazon", "Bloomberg", "Meta", "Microsoft"],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.

### Example 1:
\`\`\`
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
\`\`\`

### Example 2:
\`\`\`
Input: height = [4,2,0,3,2,5]
Output: 9
\`\`\`

### Constraints:
- \`n == height.length\`
- \`1 <= n <= 2 * 10^4\`
- \`0 <= height[i] <= 10^5\``,
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    
};`,
      python: `class Solution:
    def trap(self, height: list[int]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        
    }
};`,
      java: `class Solution {
    public int trap(int[] height) {
        
    }
}`
    },
    sampleAnswer: "Two-pointer approach tracking leftMax and rightMax. When height[left] < height[right], if height[left] >= leftMax update leftMax, else water += leftMax - height[left], increment left. Otherwise do symmetric logic for right. Time: O(n), Space: O(1).",
    hints: [
      "Water trapped at index i is determined by min(max_left, max_right) - height[i].",
      "Two pointers from both ends can maintain leftMax and rightMax in O(1) space."
    ],
    isCodingProblem: true,
    testCases: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6", isHidden: false },
      { input: "height = [4,2,0,3,2,5]", expectedOutput: "9", isHidden: false }
    ]
  },

  {
    title: "Best Time to Buy and Sell Stock",
    category: "DSA",
    difficulty: "Easy",
    tags: ["Array", "Dynamic Programming"],
    companyTags: ["Amazon", "Google", "Goldman Sachs", "Apple"],
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.

### Example 1:
\`\`\`
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
\`\`\`

### Example 2:
\`\`\`
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
\`\`\`

### Constraints:
- \`1 <= prices.length <= 10^5\`
- \`0 <= prices[i] <= 10^4\``,
    starterCode: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    
};`,
      python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        
    }
};`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        
    }
}`
    },
    sampleAnswer: "Track minimum price seen so far (minPrice) and maximum profit achieved so far (maxProfit). For each price, minPrice = min(minPrice, price), maxProfit = max(maxProfit, price - minPrice). Time: O(n), Space: O(1).",
    hints: ["Keep track of the lowest buy price seen so far."],
    isCodingProblem: true,
    testCases: [
      { input: "prices = [7,1,5,3,6,4]", expectedOutput: "5", isHidden: false },
      { input: "prices = [7,6,4,3,1]", expectedOutput: "0", isHidden: false }
    ]
  },

  {
    title: "Longest Substring Without Repeating Characters",
    category: "DSA",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Sliding Window"],
    companyTags: ["Google", "Adobe", "Amazon", "Microsoft", "Meta"],
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.

### Example 1:
\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
\`\`\`

### Example 2:
\`\`\`
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
\`\`\`

### Example 3:
\`\`\`
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
\`\`\`

### Constraints:
- \`0 <= s.length <= 5 * 10^4\`
- \`s\` consists of English letters, digits, symbols and spaces.`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    
};`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        pass`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        
    }
};`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        
    }
}`
    },
    sampleAnswer: "Sliding window [left, right] with a Hash Map storing last seen index of each character. When character at right is seen inside window, update left = max(left, lastSeen + 1). Update maxLen = max(maxLen, right - left + 1). Time: O(n), Space: O(min(m, n)).",
    hints: ["Use a sliding window and hash map of character last seen indices."],
    isCodingProblem: true,
    testCases: [
      { input: "s = 'abcabcbb'", expectedOutput: "3", isHidden: false },
      { input: "s = 'bbbbb'", expectedOutput: "1", isHidden: false },
      { input: "s = 'pwwkew'", expectedOutput: "3", isHidden: false }
    ]
  },

  {
    title: "Search a 2D Matrix",
    category: "DSA",
    difficulty: "Medium",
    tags: ["Array", "Binary Search", "Matrix"],
    companyTags: ["Amazon", "Microsoft", "Meta", "Google"],
    description: `You are given an \`m x n\` integer matrix \`matrix\` with the following two properties:
1. Each row is sorted in non-decreasing order.
2. The first integer of each row is greater than the last integer of the previous row.

Given an integer \`target\`, return \`true\` if \`target\` is in \`matrix\` or \`false\` otherwise.

You must write a solution in **O(log(m * n))** time complexity.

### Example 1:
\`\`\`
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
\`\`\`

### Constraints:
- \`m == matrix.length\`
- \`n == matrix[i].length\`
- \`1 <= m, n <= 100\`
- \`-10^4 <= matrix[i][j], target <= 10^4\``,
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    
};`,
      python: `class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        pass`,
      cpp: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        
    }
};`,
      java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        
    }
}`
    },
    sampleAnswer: "Treat the m x n matrix as a single 1D virtual sorted array of length m * n. Run binary search from low=0 to high=m*n-1. Convert mid index to row = mid / n and col = mid % n. Time: O(log(m * n)), Space: O(1).",
    hints: [
      "Binary search across the virtual 1D array of size m * n.",
      "Convert 1D index to 2D indices: row = mid / cols, col = mid % cols."
    ],
    isCodingProblem: true,
    testCases: [
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", expectedOutput: "true", isHidden: false },
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13", expectedOutput: "false", isHidden: false }
    ]
  },

  {
    title: "Valid Parentheses",
    category: "DSA",
    difficulty: "Easy",
    tags: ["String", "Stack"],
    companyTags: ["Google", "Meta", "Amazon", "Microsoft"],
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

### Example 1:
\`\`\`
Input: s = "()"
Output: true
\`\`\`

### Example 2:
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`

### Example 3:
\`\`\`
Input: s = "(]"
Output: false
\`\`\`

### Constraints:
- \`1 <= s.length <= 10^4\`
- \`s\` consists of parentheses only \`'()[]{}'\`.`,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    
};`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        pass`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        
    }
}`
    },
    sampleAnswer: "Use a stack. When an open bracket is seen, push corresponding expected close bracket. When a closing bracket is seen, pop from stack and check equality. If stack is empty at end, return true. Time: O(n), Space: O(n).",
    hints: [
      "Push expected closing bracket onto stack when opening bracket is encountered.",
      "Pop and verify match when closing bracket is seen."
    ],
    isCodingProblem: true,
    testCases: [
      { input: "s = '()[]{}'", expectedOutput: "true", isHidden: false },
      { input: "s = '(]'", expectedOutput: "false", isHidden: false }
    ]
  },

  {
    title: "Merge Two Sorted Lists",
    category: "DSA",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    companyTags: ["Amazon", "Microsoft", "Apple", "Google"],
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

### Example 1:
\`\`\`
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
\`\`\`

### Example 2:
\`\`\`
Input: list1 = [], list2 = []
Output: []
\`\`\`

### Example 3:
\`\`\`
Input: list1 = [], list2 = [0]
Output: [0]
\`\`\`

### Constraints:
- The number of nodes in both lists is in the range \`[0, 50]\`.
- \`-100 <= Node.val <= 100\`
- Both \`list1\` and \`list2\` are sorted in non-decreasing order.`,
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        pass`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        
    }
};`,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        
    }
}`
    },
    sampleAnswer: "Create a dummy node. Compare heads of list1 and list2; attach the smaller node to curr.next and advance pointers. Append remaining nodes once one list is exhausted. Time: O(n + m), Space: O(1).",
    hints: ["Use a dummy node to avoid edge-casing the head."],
    isCodingProblem: true,
    testCases: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", expectedOutput: "[1,1,2,3,4,4]", isHidden: false },
      { input: "list1 = [], list2 = []", expectedOutput: "[]", isHidden: false }
    ]
  },

  {
    title: "Reverse a Linked List",
    category: "DSA",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    companyTags: ["Amazon", "Microsoft", "Apple", "Google"],
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.

### Example 1:
\`\`\`
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
\`\`\`

### Example 2:
\`\`\`
Input: head = [1,2]
Output: [2,1]
\`\`\`

### Example 3:
\`\`\`
Input: head = []
Output: []
\`\`\`

### Constraints:
- The number of nodes in the list is the range \`[0, 5000]\`.
- \`-5000 <= Node.val <= 5000\``,
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        pass`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        
    }
};`,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        
    }
}`
    },
    sampleAnswer: "Iterate with three pointers (prev=null, curr=head, next=null). Save next = curr.next, reverse curr.next = prev, advance prev = curr and curr = next. Return prev. Time: O(n), Space: O(1).",
    hints: [
      "Keep track of the previous node starting at null.",
      "Store curr.next before modifying pointer."
    ],
    isCodingProblem: true,
    testCases: [
      { input: "head = [1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]", isHidden: false },
      { input: "head = []", expectedOutput: "[]", isHidden: false }
    ]
  },

  {
    title: "Climbing Stairs",
    category: "DSA",
    difficulty: "Easy",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    companyTags: ["Amazon", "Google", "Adobe", "Microsoft"],
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?

### Example 1:
\`\`\`
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top:
1. 1 step + 1 step
2. 2 steps
\`\`\`

### Example 2:
\`\`\`
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top:
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
\`\`\`

### Constraints:
- \`1 <= n <= 45\``,
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    
};`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        pass`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        
    }
};`,
      java: `class Solution {
    public int climbStairs(int n) {
        
    }
}`
    },
    sampleAnswer: "Fibonacci sequence: dp[i] = dp[i-1] + dp[i-2]. Compute iteratively with two variables prev1=1, prev2=2. Time: O(n), Space: O(1).",
    hints: ["To reach step n, you can jump from n-1 (1 step) or from n-2 (2 steps)."],
    isCodingProblem: true,
    testCases: [
      { input: "n = 2", expectedOutput: "2", isHidden: false },
      { input: "n = 3", expectedOutput: "3", isHidden: false }
    ]
  },

  {
    title: "Invert a Binary Tree",
    category: "DSA",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    companyTags: ["Google", "Meta", "Twitter", "Amazon"],
    description: `Given the \`root\` of a binary tree, invert the tree, and return its root.

### Example 1:
\`\`\`
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
\`\`\`

### Example 2:
\`\`\`
Input: root = [2,1,3]
Output: [2,3,1]
\`\`\`

### Example 3:
\`\`\`
Input: root = []
Output: []
\`\`\`

### Constraints:
- The number of nodes in the tree is in the range \`[0, 100]\`.
- \`-100 <= Node.val <= 100\``,
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    
};`,
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        pass`,
      cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        
    }
};`,
      java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode invertTree(TreeNode root) {
        
    }
}`
    },
    sampleAnswer: "Recursively swap left and right subtrees: [root.left, root.right] = [invertTree(root.right), invertTree(root.left)]. Time: O(n), Space: O(h).",
    hints: ["Recursively swap left and right children."],
    isCodingProblem: true,
    testCases: [
      { input: "root = [4,2,7,1,3,6,9]", expectedOutput: "[4,7,2,9,6,3,1]", isHidden: false },
      { input: "root = [2,1,3]", expectedOutput: "[2,3,1]", isHidden: false }
    ]
  },

  {
    title: "Maximum Depth of Binary Tree",
    category: "DSA",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    companyTags: ["Amazon", "Google", "Apple", "Meta"],
    description: `Given the \`root\` of a binary tree, return its maximum depth.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

### Example 1:
\`\`\`
Input: root = [3,9,20,null,null,15,7]
Output: 3
\`\`\`

### Example 2:
\`\`\`
Input: root = [1,null,2]
Output: 2
\`\`\`

### Constraints:
- The number of nodes in the tree is in the range \`[0, 10^4]\`.
- \`-100 <= Node.val <= 100\``,
    starterCode: {
      javascript: `/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    
};`,
      python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        
    }
};`,
      java: `class Solution {
    public int maxDepth(TreeNode root) {
        
    }
}`
    },
    sampleAnswer: "DFS: if root is null return 0; else return 1 + max(maxDepth(root.left), maxDepth(root.right)). Time: O(n), Space: O(h).",
    hints: ["Base case: if node is null return 0."],
    isCodingProblem: true,
    testCases: [
      { input: "root = [3,9,20,null,null,15,7]", expectedOutput: "3", isHidden: false },
      { input: "root = [1,null,2]", expectedOutput: "2", isHidden: false }
    ]
  },

  {
    title: "Number of Islands",
    category: "DSA",
    difficulty: "Medium",
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"],
    companyTags: ["Amazon", "Google", "Bloomberg", "Meta", "Microsoft"],
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of '1's (land) and '0's (water), return the number of islands.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

### Example 1:
\`\`\`
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
\`\`\`

### Example 2:
\`\`\`
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
\`\`\`

### Constraints:
- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 300\`
- \`grid[i][j]\` is '0' or '1'.`,
    starterCode: {
      javascript: `/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    
};`,
      python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        pass`,
      cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        
    }
};`,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        
    }
}`
    },
    sampleAnswer: "Iterate through grid. Whenever '1' is found, increment island count and trigger DFS/BFS to sink all connected land cells to '0'. Time: O(m * n), Space: O(m * n).",
    hints: ["Mutate visited '1's to '0's to avoid extra memory for visited set."],
    isCodingProblem: true,
    testCases: [
      { input: "grid = [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]", expectedOutput: "1", isHidden: false },
      { input: "grid = [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]", expectedOutput: "3", isHidden: false }
    ]
  },

  {
    title: "Coin Change",
    category: "DSA",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming", "Breadth-First Search"],
    companyTags: ["Amazon", "Microsoft", "Meta", "Google"],
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.

### Example 1:
\`\`\`
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
\`\`\`

### Example 2:
\`\`\`
Input: coins = [2], amount = 3
Output: -1
\`\`\`

### Example 3:
\`\`\`
Input: coins = [1], amount = 0
Output: 0
\`\`\`

### Constraints:
- \`1 <= coins.length <= 12\`
- \`1 <= coins[i] <= 2^31 - 1\`
- \`0 <= amount <= 10^4\``,
    starterCode: {
      javascript: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    
};`,
      python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        pass`,
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        
    }
};`,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        
    }
}`
    },
    sampleAnswer: "Bottom-up DP array dp of size amount+1 initialized to Infinity, with dp[0]=0. For i from 1 to amount, for coin in coins: if i-coin >= 0: dp[i] = min(dp[i], dp[i-coin]+1). Return dp[amount] === Infinity ? -1 : dp[amount]. Time: O(amount * n), Space: O(amount).",
    hints: ["Define dp[i] as the minimum coins needed to make amount i."],
    isCodingProblem: true,
    testCases: [
      { input: "coins = [1,2,5], amount = 11", expectedOutput: "3", isHidden: false },
      { input: "coins = [2], amount = 3", expectedOutput: "-1", isHidden: false }
    ]
  },

  {
    title: "Merge Intervals",
    category: "DSA",
    difficulty: "Medium",
    tags: ["Array", "Sorting"],
    companyTags: ["Meta", "Amazon", "Google", "Microsoft"],
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

### Example 1:
\`\`\`
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
\`\`\`

### Example 2:
\`\`\`
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
\`\`\`

### Constraints:
- \`1 <= intervals.length <= 10^4\`
- \`intervals[i].length == 2\`
- \`0 <= start_i <= end_i <= 10^4\``,
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    
};`,
      python: `class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        pass`,
      cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        
    }
};`,
      java: `class Solution {
    public int[][] merge(int[][] intervals) {
        
    }
}`
    },
    sampleAnswer: "Sort intervals by start time. Iterate through intervals: if current interval starts before or at previous interval's end, merge them by updating prev.end = max(prev.end, curr.end). Else append as a new interval. Time: O(n log n), Space: O(n).",
    hints: ["Sort intervals by start time ascending first."],
    isCodingProblem: true,
    testCases: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", expectedOutput: "[[1,6],[8,10],[15,18]]", isHidden: false },
      { input: "intervals = [[1,4],[4,5]]", expectedOutput: "[[1,5]]", isHidden: false }
    ]
  }
];

// Helper to update all questions in database
export async function seedAllLeetCodeQuestions() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI missing');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('[Seed] Connected to MongoDB Atlas. Upgrading questions to LeetCode-standard format...');

    let updated = 0;
    for (const q of leetcodeQuestions) {
      await Question.findOneAndUpdate(
        { title: q.title },
        { 
          $set: {
            category: q.category,
            difficulty: q.difficulty,
            tags: q.tags,
            companyTags: q.companyTags,
            description: q.description,
            starterCode: q.starterCode,
            sampleAnswer: q.sampleAnswer,
            hints: q.hints,
            testCases: q.testCases,
            isCodingProblem: true
          }
        },
        { upsert: true }
      );
      updated++;
    }

    console.log(`[Seed Complete] Successfully updated ${updated} core DSA questions to LeetCode specifications.`);
    await mongoose.disconnect();
    return true;
  } catch (err) {
    console.error('[Seed Error]', err);
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].includes('seedLeetCodeQuestions')) {
  seedAllLeetCodeQuestions();
}
