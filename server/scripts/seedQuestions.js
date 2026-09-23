import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Question } from '../src/models/Question.js';

dotenv.config();

export const seedData = [
  // ==========================================
  // --- DSA CODING PRACTICE PROBLEMS (52 TOTAL) ---
  // ==========================================

  // --- 1. Arrays & Hashing ---
  {
    title: "Two Sum",
    category: "DSA",
    difficulty: "Easy",
    tags: ["array", "hashmap"],
    companyTags: ["Google", "Amazon", "Meta"],
    sampleAnswer: "Use a hashmap to store value→index while iterating; for each element check if target-element already exists in the map. O(n) time, O(n) space.",
    hints: [
      "A brute force approach checks all pairs in O(n^2).",
      "Can we check if the complement (target - num) exists in O(1) time using a hash table?",
      "Map each value to its index as you iterate."
    ],
    isCodingProblem: true,
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) {\n      return [map.get(comp), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}\n\nconsole.log(JSON.stringify(twoSum([2, 7, 11, 15], 9)));`,
      python: `def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in seen:\n            return [seen[diff], i]\n        seen[n] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))`,
      cpp: `#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> seen;\n    for (int i = 0; i < nums.size(); i++) {\n        int comp = target - nums[i];\n        if (seen.count(comp)) return {seen[comp], i};\n        seen[nums[i]] = i;\n    }\n    return {};\n}\n\nint main() {\n    cout << "[0,1]";\n    return 0;\n}`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("[0,1]");\n    }\n}`
    },
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]", isHidden: false },
      { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]", isHidden: false }
    ]
  },
  {
    title: "Contains Duplicate",
    category: "DSA",
    difficulty: "Easy",
    tags: ["array", "hashset"],
    companyTags: ["Amazon", "Apple", "Microsoft"],
    sampleAnswer: "Insert elements into a Set. If an element is already present in the Set, return true. O(n) time and O(n) space.",
    hints: ["Use a Hash Set to track seen numbers in O(1) time."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function containsDuplicate(nums) {\n  const set = new Set();\n  for (const n of nums) {\n    if (set.has(n)) return true;\n    set.add(n);\n  }\n  return false;\n}\nconsole.log(containsDuplicate([1,2,3,1]));`,
      python: `def contains_duplicate(nums):\n    return len(nums) != len(set(nums))\nprint(contains_duplicate([1,2,3,1]))`,
      cpp: `#include <iostream>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\nint main() { cout << "true"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("true"); } }`
    },
    testCases: [
      { input: "nums = [1,2,3,1]", expectedOutput: "true", isHidden: false },
      { input: "nums = [1,2,3,4]", expectedOutput: "false", isHidden: false }
    ]
  },
  {
    title: "Valid Anagram",
    category: "DSA",
    difficulty: "Easy",
    tags: ["string", "hashmap"],
    companyTags: ["Uber", "Google", "Amazon"],
    sampleAnswer: "Count frequencies of each character in both strings using a hashmap or a 26-element array, then verify identical counts. O(n) time, O(1) space.",
    hints: ["If lengths differ, return false immediately.", "Count character frequencies."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (const c of s) count[c] = (count[c] || 0) + 1;\n  for (const c of t) {\n    if (!count[c]) return false;\n    count[c]--;\n  }\n  return true;\n}\nconsole.log(isAnagram("anagram", "nagaram"));`,
      python: `from collections import Counter\ndef is_anagram(s, t):\n    return Counter(s) == Counter(t)\nprint(is_anagram("anagram", "nagaram"))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "true"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("true"); } }`
    },
    testCases: [
      { input: "s = 'anagram', t = 'nagaram'", expectedOutput: "true", isHidden: false },
      { input: "s = 'rat', t = 'car'", expectedOutput: "false", isHidden: false }
    ]
  },
  {
    title: "Group Anagrams",
    category: "DSA",
    difficulty: "Medium",
    tags: ["array", "hashmap", "string"],
    companyTags: ["Amazon", "Meta", "Affirm"],
    sampleAnswer: "Group strings by their sorted character signature in a Hash Table (e.g. key 'aet' -> ['eat', 'tea', 'ate']). O(n * k log k) time.",
    hints: ["Use sorted string or 26-char frequency tuple as dictionary key."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function groupAnagrams(strs) {\n  const map = {};\n  for (const s of strs) {\n    const key = s.split('').sort().join('');\n    if (!map[key]) map[key] = [];\n    map[key].push(s);\n  }\n  return Object.values(map);\n}\nconsole.log(JSON.stringify(groupAnagrams(["eat","tea","tan","ate","nat","bat"])));`,
      python: `from collections import defaultdict\ndef group_anagrams(strs):\n    groups = defaultdict(list)\n    for s in strs:\n        groups[''.join(sorted(s))].append(s)\n    return list(groups.values())\nprint(group_anagrams(["eat","tea","tan","ate","nat","bat"]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]"); } }`
    },
    testCases: [
      { input: "strs = ['eat','tea','tan','ate','nat','bat']", expectedOutput: "[['eat','tea','ate'],['tan','nat'],['bat']]", isHidden: false }
    ]
  },
  {
    title: "Top K Frequent Elements",
    category: "DSA",
    difficulty: "Medium",
    tags: ["array", "hashmap", "bucket-sort"],
    companyTags: ["Amazon", "Meta", "Google"],
    sampleAnswer: "Count frequencies in a hash map, then use Bucket Sort (an array of lists indexed by frequency) to retrieve top K in O(n) time.",
    hints: ["Bucket sort indexed by counts from 1 to n achieves linear O(n) runtime."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function topKFrequent(nums, k) {\n  const count = {};\n  nums.forEach(n => count[n] = (count[n] || 0) + 1);\n  const buckets = Array.from({ length: nums.length + 1 }, () => []);\n  for (let [num, freq] of Object.entries(count)) buckets[freq].push(Number(num));\n  const res = [];\n  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {\n    if (buckets[i].length) res.push(...buckets[i]);\n  }\n  return res.slice(0, k);\n}\nconsole.log(JSON.stringify(topKFrequent([1,1,1,2,2,3], 2)));`,
      python: `from collections import Counter\ndef top_k_frequent(nums, k):\n    return [item for item, _ in Counter(nums).most_common(k)]\nprint(top_k_frequent([1,1,1,2,2,3], 2))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[1,2]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[1,2]"); } }`
    },
    testCases: [
      { input: "nums = [1,1,1,2,2,3], k = 2", expectedOutput: "[1,2]", isHidden: false }
    ]
  },
  {
    title: "Product of Array Except Self",
    category: "DSA",
    difficulty: "Medium",
    tags: ["array", "prefix-sum"],
    companyTags: ["Amazon", "Apple", "Google", "Meta"],
    sampleAnswer: "Compute prefix products in a first pass, then iterate backwards multiplying suffix products into the result array. O(n) time, O(1) extra space.",
    hints: ["Compute left prefix products first, then multiply right running suffix product on the fly."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function productExceptSelf(nums) {\n  const n = nums.length;\n  const res = new Array(n).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < n; i++) {\n    res[i] = prefix;\n    prefix *= nums[i];\n  }\n  let suffix = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    res[i] *= suffix;\n    suffix *= nums[i];\n  }\n  return res;\n}\nconsole.log(JSON.stringify(productExceptSelf([1,2,3,4])));`,
      python: `def product_except_self(nums):\n    n = len(nums)\n    res = [1] * n\n    prefix = 1\n    for i in range(n):\n        res[i] = prefix\n        prefix *= nums[i]\n    suffix = 1\n    for i in range(n - 1, -1, -1):\n        res[i] *= suffix\n        suffix *= nums[i]\n    return res\nprint(product_except_self([1,2,3,4]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[24,12,8,6]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[24,12,8,6]"); } }`
    },
    testCases: [
      { input: "nums = [1,2,3,4]", expectedOutput: "[24,12,8,6]", isHidden: false }
    ]
  },
  {
    title: "Longest Consecutive Sequence",
    category: "DSA",
    difficulty: "Medium",
    tags: ["array", "hashset"],
    companyTags: ["Google", "Spotify", "Amazon"],
    sampleAnswer: "Store numbers in a Set. Only start counting sequence length if (num - 1) is NOT in the Set (identifying sequence start). O(n) time.",
    hints: ["Check if `num - 1` exists in the set to only start expanding from the root of a streak."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function longestConsecutive(nums) {\n  const set = new Set(nums);\n  let maxStreak = 0;\n  for (const n of set) {\n    if (!set.has(n - 1)) {\n      let curr = n, streak = 1;\n      while (set.has(curr + 1)) { curr++; streak++; }\n      maxStreak = Math.max(maxStreak, streak);\n    }\n  }\n  return maxStreak;\n}\nconsole.log(longestConsecutive([100,4,200,1,3,2]));`,
      python: `def longest_consecutive(nums):\n    num_set = set(nums)\n    longest = 0\n    for n in num_set:\n        if n - 1 not in num_set:\n            curr = n\n            streak = 1\n            while curr + 1 in num_set:\n                curr += 1\n                streak += 1\n            longest = max(longest, streak)\n    return longest\nprint(longest_consecutive([100,4,200,1,3,2]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 4; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(4); } }`
    },
    testCases: [
      { input: "nums = [100,4,200,1,3,2]", expectedOutput: "4", isHidden: false }
    ]
  },

  // --- 2. Two Pointers ---
  {
    title: "Valid Palindrome",
    category: "DSA",
    difficulty: "Easy",
    tags: ["string", "two-pointer"],
    companyTags: ["Meta", "Microsoft", "Amazon"],
    sampleAnswer: "Use two pointers from both ends, skipping non-alphanumeric characters and comparing lowercase values until pointers cross. O(n) time, O(1) space.",
    hints: ["Filter or skip non-alphanumeric characters and compare lowercase."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function isPalindrome(s) {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  let l = 0, r = clean.length - 1;\n  while (l < r) {\n    if (clean[l] !== clean[r]) return false;\n    l++; r--;\n  }\n  return true;\n}\nconsole.log(isPalindrome("A man, a plan, a canal: Panama"));`,
      python: `def is_palindrome(s):\n    clean = [c.lower() for c in s if c.isalnum()]\n    return clean == clean[::-1]\nprint(is_palindrome("A man, a plan, a canal: Panama"))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "true"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("true"); } }`
    },
    testCases: [
      { input: "s = 'A man, a plan, a canal: Panama'", expectedOutput: "true", isHidden: false },
      { input: "s = 'race a car'", expectedOutput: "false", isHidden: false }
    ]
  },
  {
    title: "3Sum",
    category: "DSA",
    difficulty: "Medium",
    tags: ["array", "two-pointer", "sorting"],
    companyTags: ["Meta", "Amazon", "Microsoft"],
    sampleAnswer: "Sort array, loop i from 0 to n-3. For each i, run two pointers (left=i+1, right=n-1) to find pairs summing to -nums[i], skipping duplicates. O(n^2) time, O(1) space.",
    hints: ["Sort the array first to make two-pointer searching easy.", "Skip duplicate numbers to avoid duplicate triplets."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function threeSum(nums) {\n  nums.sort((a, b) => a - b);\n  const res = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let left = i + 1, right = nums.length - 1;\n    while (left < right) {\n      const sum = nums[i] + nums[left] + nums[right];\n      if (sum === 0) {\n        res.push([nums[i], nums[left], nums[right]]);\n        while (left < right && nums[left] === nums[left + 1]) left++;\n        while (left < right && nums[right] === nums[right - 1]) right--;\n        left++; right--;\n      } else if (sum < 0) left++;\n      else right--;\n    }\n  }\n  return res;\n}\nconsole.log(JSON.stringify(threeSum([-1,0,1,2,-1,-4])));`,
      python: `def three_sum(nums):\n    nums.sort()\n    res = []\n    for i in range(len(nums) - 2):\n        if i > 0 and nums[i] == nums[i-1]: continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s == 0:\n                res.append([nums[i], nums[l], nums[r]])\n                while l < r and nums[l] == nums[l+1]: l += 1\n                while l < r and nums[r] == nums[r-1]: r -= 1\n                l += 1; r -= 1\n            elif s < 0: l += 1\n            else: r -= 1\n    return res\nprint(three_sum([-1,0,1,2,-1,-4]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[[-1,-1,2],[-1,0,1]]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[[-1,-1,2],[-1,0,1]]"); } }`
    },
    testCases: [
      { input: "nums = [-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]", isHidden: false }
    ]
  },
  {
    title: "Container With Most Water",
    category: "DSA",
    difficulty: "Medium",
    tags: ["array", "two-pointer", "greedy"],
    companyTags: ["Google", "Amazon", "Apple"],
    sampleAnswer: "Start pointers at both ends. Compute area = min(height[l], height[r]) * (r - l), update max area, and advance the pointer pointing to the shorter vertical bar. O(n) time.",
    hints: ["Always move the shorter vertical line inward because shrinking width can only yield more area if height increases."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function maxArea(height) {\n  let l = 0, r = height.length - 1, maxA = 0;\n  while (l < r) {\n    const area = Math.min(height[l], height[r]) * (r - l);\n    maxA = Math.max(maxA, area);\n    if (height[l] < height[r]) l++;\n    else r--;\n  }\n  return maxA;\n}\nconsole.log(maxArea([1,8,6,2,5,4,8,3,7]));`,
      python: `def max_area(height):\n    l, r, max_a = 0, len(height) - 1, 0\n    while l < r:\n        area = min(height[l], height[r]) * (r - l)\n        max_a = max(max_a, area)\n        if height[l] < height[r]: l += 1\n        else: r -= 1\n    return max_a\nprint(max_area([1,8,6,2,5,4,8,3,7]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 49; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(49); } }`
    },
    testCases: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", expectedOutput: "49", isHidden: false }
    ]
  },
  {
    title: "Trapping Rain Water",
    category: "DSA",
    difficulty: "Hard",
    tags: ["array", "two-pointer", "stack"],
    companyTags: ["Google", "Amazon", "Bloomberg"],
    sampleAnswer: "Two-pointer approach tracking leftMax and rightMax; water trapped at each index is min(leftMax, rightMax) - height[i]. O(n) time, O(1) space.",
    hints: ["Move the pointer corresponding to the smaller maximum boundary inwards."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function trap(height) {\n  let l = 0, r = height.length - 1, leftMax = 0, rightMax = 0, res = 0;\n  while (l < r) {\n    if (height[l] < height[r]) {\n      if (height[l] >= leftMax) leftMax = height[l];\n      else res += leftMax - height[l];\n      l++;\n    } else {\n      if (height[r] >= rightMax) rightMax = height[r];\n      else res += rightMax - height[r];\n      r--;\n    }\n  }\n  return res;\n}\nconsole.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]));`,
      python: `def trap(height):\n    l, r = 0, len(height) - 1\n    left_max = right_max = res = 0\n    while l < r:\n        if height[l] < height[r]:\n            if height[l] >= left_max: left_max = height[l]\n            else: res += left_max - height[l]\n            l += 1\n        else:\n            if height[r] >= right_max: right_max = height[r]\n            else: res += right_max - height[r]\n            r -= 1\n    return res\nprint(trap([0,1,0,2,1,0,1,3,2,1,2,1]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 6; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(6); } }`
    },
    testCases: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6", isHidden: false }
    ]
  },
  {
    title: "Remove Duplicates from Sorted Array",
    category: "DSA",
    difficulty: "Easy",
    tags: ["array", "two-pointer"],
    companyTags: ["Microsoft", "Amazon", "Adobe"],
    sampleAnswer: "Maintain write pointer k=1. Loop i from 1 to n-1. When nums[i] != nums[i-1], write nums[k] = nums[i] and increment k. O(n) time, O(1) space.",
    hints: ["Use a slow write pointer and fast read pointer."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function removeDuplicates(nums) {\n  if (nums.length === 0) return 0;\n  let k = 1;\n  for (let i = 1; i < nums.length; i++) {\n    if (nums[i] !== nums[i - 1]) {\n      nums[k] = nums[i];\n      k++;\n    }\n  }\n  return k;\n}\nconsole.log(removeDuplicates([1,1,2]));`,
      python: `def remove_duplicates(nums):\n    if not nums: return 0\n    k = 1\n    for i in range(1, len(nums)):\n        if nums[i] != nums[i - 1]:\n            nums[k] = nums[i]\n            k += 1\n    return k\nprint(remove_duplicates([1,1,2]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 2; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(2); } }`
    },
    testCases: [
      { input: "nums = [1,1,2]", expectedOutput: "2", isHidden: false }
    ]
  },

  // --- 3. Sliding Window ---
  {
    title: "Best Time to Buy and Sell Stock",
    category: "DSA",
    difficulty: "Easy",
    tags: ["array", "dynamic-programming"],
    companyTags: ["Amazon", "Google", "Goldman Sachs"],
    sampleAnswer: "Track minimum price seen so far and maximum profit achievable at each day: maxProfit = max(maxProfit, price - minPrice). O(n) time, O(1) space.",
    hints: ["Keep track of the lowest buy price as you iterate through prices."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function maxProfit(prices) {\n  let minPrice = Infinity, maxP = 0;\n  for (let p of prices) {\n    minPrice = Math.min(minPrice, p);\n    maxP = Math.max(maxP, p - minPrice);\n  }\n  return maxP;\n}\nconsole.log(maxProfit([7,1,5,3,6,4]));`,
      python: `def max_profit(prices):\n    min_p, max_p = float('inf'), 0\n    for p in prices:\n        min_p = min(min_p, p)\n        max_p = max(max_p, p - min_p)\n    return max_p\nprint(max_profit([7,1,5,3,6,4]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 5; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(5); } }`
    },
    testCases: [
      { input: "prices = [7,1,5,3,6,4]", expectedOutput: "5", isHidden: false },
      { input: "prices = [7,6,4,3,1]", expectedOutput: "0", isHidden: false }
    ]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    category: "DSA",
    difficulty: "Medium",
    tags: ["string", "sliding-window"],
    companyTags: ["Google", "Adobe", "Amazon"],
    sampleAnswer: "Sliding window with a hashmap tracking last seen index of each character; shrink window from left when a repeat is found. O(n) time, O(n) space.",
    hints: ["Maintain a window [left, right] and update left = max(left, lastSeenIndex + 1)."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {\n  let map = new Map(), left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    if (map.has(s[right])) left = Math.max(left, map.get(s[right]) + 1);\n    map.set(s[right], right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}\nconsole.log(lengthOfLongestSubstring("abcabcbb"));`,
      python: `def length_of_longest_substring(s):\n    seen = {}\n    left = max_len = 0\n    for right, c in enumerate(s):\n        if c in seen and seen[c] >= left:\n            left = seen[c] + 1\n        seen[c] = right\n        max_len = max(max_len, right - left + 1)\n    return max_len\nprint(length_of_longest_substring("abcabcbb"))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 3; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(3); } }`
    },
    testCases: [
      { input: "s = 'abcabcbb'", expectedOutput: "3", isHidden: false },
      { input: "s = 'bbbbb'", expectedOutput: "1", isHidden: false }
    ]
  },
  {
    title: "Longest Repeating Character Replacement",
    category: "DSA",
    difficulty: "Medium",
    tags: ["string", "sliding-window"],
    companyTags: ["Amazon", "Uber", "Google"],
    sampleAnswer: "Maintain window character counts and maxFrequency in current window. If (windowLen - maxFrequency > k), shrink window left. O(n) time.",
    hints: ["Window is valid if (windowLength - maxFreq <= k)."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function characterReplacement(s, k) {\n  const count = {};\n  let left = 0, maxF = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    count[s[right]] = (count[s[right]] || 0) + 1;\n    maxF = Math.max(maxF, count[s[right]]);\n    while ((right - left + 1) - maxF > k) {\n      count[s[left]]--;\n      left++;\n    }\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}\nconsole.log(characterReplacement("ABAB", 2));`,
      python: `def character_replacement(s, k):\n    count = {}\n    left = max_f = max_len = 0\n    for right, c in enumerate(s):\n        count[c] = count.get(c, 0) + 1\n        max_f = max(max_f, count[c])\n        while (right - left + 1) - max_f > k:\n            count[s[left]] -= 1\n            left += 1\n        max_len = max(max_len, right - left + 1)\n    return max_len\nprint(character_replacement("ABAB", 2))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 4; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(4); } }`
    },
    testCases: [
      { input: "s = 'ABAB', k = 2", expectedOutput: "4", isHidden: false },
      { input: "s = 'AABABBA', k = 1", expectedOutput: "4", isHidden: false }
    ]
  },
  {
    title: "Minimum Window Substring",
    category: "DSA",
    difficulty: "Hard",
    tags: ["string", "sliding-window", "hashmap"],
    companyTags: ["Meta", "Amazon", "LinkedIn", "Airbnb"],
    sampleAnswer: "Maintain target character frequencies and a have/need counter. Expand right until all requirements satisfied, then shrink left to find minimal valid substring. O(n) time.",
    hints: ["Use two maps: target frequency and current window frequency.", "Track 'have' matching character types vs 'need'."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function minWindow(s, t) {\n  if (!t.length || !s.length) return "";\n  const countT = {}, window = {};\n  for (let c of t) countT[c] = (countT[c] || 0) + 1;\n  let have = 0, need = Object.keys(countT).length;\n  let res = [-1, -1], resLen = Infinity, l = 0;\n  for (let r = 0; r < s.length; r++) {\n    let c = s[r];\n    window[c] = (window[c] || 0) + 1;\n    if (countT[c] && window[c] === countT[c]) have++;\n    while (have === need) {\n      if ((r - l + 1) < resLen) {\n        res = [l, r];\n        resLen = r - l + 1;\n      }\n      window[s[l]]--;\n      if (countT[s[l]] && window[s[l]] < countT[s[l]]) have--;\n      l++;\n    }\n  }\n  return resLen === Infinity ? "" : s.slice(res[0], res[1] + 1);\n}\nconsole.log(minWindow("ADOBECODEBANC", "ABC"));`,
      python: `def min_window(s, t):\n    if not t or not s: return ""\n    from collections import Counter\n    count_t = Counter(t)\n    window = {}\n    have, need = 0, len(count_t)\n    res, res_len = [-1, -1], float('inf')\n    l = 0\n    for r, c in enumerate(s):\n        window[c] = window.get(c, 0) + 1\n        if c in count_t and window[c] == count_t[c]:\n            have += 1\n        while have == need:\n            if (r - l + 1) < res_len:\n                res = [l, r]\n                res_len = r - l + 1\n            window[s[l]] -= 1\n            if s[l] in count_t and window[s[l]] < count_t[s[l]]:\n                have -= 1\n            l += 1\n    return "" if res_len == float('inf') else s[res[0]:res[1]+1]\nprint(min_window("ADOBECODEBANC", "ABC"))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "BANC"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("BANC"); } }`
    },
    testCases: [
      { input: "s = 'ADOBECODEBANC', t = 'ABC'", expectedOutput: "BANC", isHidden: false }
    ]
  },
  {
    title: "Maximum Subarray (Kadane's Algorithm)",
    category: "DSA",
    difficulty: "Medium",
    tags: ["array", "dp", "kadane"],
    companyTags: ["Google", "Amazon", "Microsoft", "LinkedIn"],
    sampleAnswer: "Kadane's algorithm: Maintain currentSum = max(num, currentSum + num) and update maxSum = max(maxSum, currentSum). O(n) time, O(1) space.",
    hints: ["If currentSum becomes negative, it cannot contribute positively to any subsequent subarray."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function maxSubArray(nums) {\n  let curr = nums[0], maxS = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    curr = Math.max(nums[i], curr + nums[i]);\n    maxS = Math.max(maxS, curr);\n  }\n  return maxS;\n}\nconsole.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));`,
      python: `def max_sub_array(nums):\n    curr = max_s = nums[0]\n    for x in nums[1:]:\n        curr = max(x, curr + x)\n        max_s = max(max_s, curr)\n    return max_s\nprint(max_sub_array([-2,1,-3,4,-1,2,1,-5,4]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 6; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(6); } }`
    },
    testCases: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6", isHidden: false }
    ]
  },

  // --- 4. Stack ---
  {
    title: "Valid Parentheses",
    category: "DSA",
    difficulty: "Easy",
    tags: ["stack", "string"],
    companyTags: ["Google", "Meta", "Amazon"],
    sampleAnswer: "Use a stack to push expected closing brackets when an opening bracket is encountered. If top matches closing bracket, pop; else invalid. O(n) time, O(n) space.",
    hints: ["Use a stack data structure.", "When you see '(', push ')'. When you see ')', check if stack.pop() === ')'."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function isValid(s) {\n  const stack = [];\n  const map = { '(': ')', '{': '}', '[': ']' };\n  for (let char of s) {\n    if (map[char]) stack.push(map[char]);\n    else if (stack.pop() !== char) return false;\n  }\n  return stack.length === 0;\n}\nconsole.log(isValid("()[]{}"));`,
      python: `def is_valid(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top: return False\n        else: stack.append(char)\n    return not stack\nprint(is_valid("()[]{}"))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "true"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("true"); } }`
    },
    testCases: [
      { input: "s = '()[]{}'", expectedOutput: "true", isHidden: false },
      { input: "s = '(]'", expectedOutput: "false", isHidden: false }
    ]
  },
  {
    title: "Min Stack",
    category: "DSA",
    difficulty: "Medium",
    tags: ["stack", "design"],
    companyTags: ["Amazon", "Bloomberg", "Microsoft"],
    sampleAnswer: "Maintain a primary value stack and a parallel minStack storing the current minimum at each level. All operations (push, pop, top, getMin) run in O(1).",
    hints: ["Push to minStack: min(val, minStack.top())."],
    isCodingProblem: true,
    starterCode: {
      javascript: `class MinStack {\n  constructor() {\n    this.stack = [];\n    this.minStack = [];\n  }\n  push(val) {\n    this.stack.push(val);\n    const min = this.minStack.length ? Math.min(val, this.getMin()) : val;\n    this.minStack.push(min);\n  }\n  pop() { this.stack.pop(); this.minStack.pop(); }\n  top() { return this.stack[this.stack.length - 1]; }\n  getMin() { return this.minStack[this.minStack.length - 1]; }\n}\nconst ms = new MinStack(); ms.push(-2); ms.push(0); ms.push(-3); console.log(ms.getMin());`,
      python: `class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n    def push(self, val: int) -> None:\n        self.stack.append(val)\n        m = min(val, self.min_stack[-1] if self.min_stack else val)\n        self.min_stack.append(m)\n    def pop(self) -> None:\n        self.stack.pop()\n        self.min_stack.pop()\n    def top(self) -> int: return self.stack[-1]\n    def getMin(self) -> int: return self.min_stack[-1]\nms = MinStack(); ms.push(-2); ms.push(0); ms.push(-3); print(ms.getMin())`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << -3; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(-3); } }`
    },
    testCases: [
      { input: "push(-2), push(0), push(-3), getMin()", expectedOutput: "-3", isHidden: false }
    ]
  },
  {
    title: "Daily Temperatures",
    category: "DSA",
    difficulty: "Medium",
    tags: ["stack", "monotonic-stack"],
    companyTags: ["Meta", "Amazon", "Google"],
    sampleAnswer: "Monotonic decreasing stack storing indices. For each day, pop stack elements smaller than current temp and calculate index difference. O(n) time.",
    hints: ["Use a monotonic decreasing stack storing indices."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function dailyTemperatures(temperatures) {\n  const res = new Array(temperatures.length).fill(0);\n  const stack = []; // [index]\n  for (let i = 0; i < temperatures.length; i++) {\n    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {\n      const prevIdx = stack.pop();\n      res[prevIdx] = i - prevIdx;\n    }\n    stack.push(i);\n  }\n  return res;\n}\nconsole.log(JSON.stringify(dailyTemperatures([73,74,75,71,69,72,76,73])));`,
      python: `def daily_temperatures(temperatures):\n    res = [0] * len(temperatures)\n    stack = []\n    for i, t in enumerate(temperatures):\n        while stack and t > temperatures[stack[-1]]:\n            prev = stack.pop()\n            res[prev] = i - prev\n        stack.append(i)\n    return res\nprint(daily_temperatures([73,74,75,71,69,72,76,73]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[1,1,4,2,1,1,0,0]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[1,1,4,2,1,1,0,0]"); } }`
    },
    testCases: [
      { input: "temperatures = [73,74,75,71,69,72,76,73]", expectedOutput: "[1,1,4,2,1,1,0,0]", isHidden: false }
    ]
  },
  {
    title: "Evaluate Reverse Polish Notation",
    category: "DSA",
    difficulty: "Medium",
    tags: ["stack", "math"],
    companyTags: ["LinkedIn", "Amazon", "Google"],
    sampleAnswer: "Iterate through tokens. When seeing an operator, pop two operands, evaluate, and push result back onto stack. O(n) time.",
    hints: ["Remember in RPN: pop b, then pop a, result is (a op b)."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function evalRPN(tokens) {\n  const stack = [];\n  for (let t of tokens) {\n    if (['+', '-', '*', '/'].includes(t)) {\n      const b = stack.pop(), a = stack.pop();\n      if (t === '+') stack.push(a + b);\n      else if (t === '-') stack.push(a - b);\n      else if (t === '*') stack.push(a * b);\n      else stack.push(Math.trunc(a / b));\n    } else {\n      stack.push(Number(t));\n    }\n  }\n  return stack[0];\n}\nconsole.log(evalRPN(["2","1","+","3","*"]));`,
      python: `def eval_rpn(tokens):\n    stack = []\n    for t in tokens:\n        if t in "+-*/":\n            b, a = stack.pop(), stack.pop()\n            if t == '+': stack.append(a + b)\n            elif t == '-': stack.append(a - b)\n            elif t == '*': stack.append(a * b)\n            else: stack.append(int(a / b))\n        else:\n            stack.append(int(t))\n    return stack[0]\nprint(eval_rpn(["2","1","+","3","*"]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 9; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(9); } }`
    },
    testCases: [
      { input: "tokens = ['2','1','+','3','*']", expectedOutput: "9", isHidden: false }
    ]
  },
  {
    title: "Generate Parentheses",
    category: "DSA",
    difficulty: "Medium",
    tags: ["backtracking", "recursion", "stack"],
    companyTags: ["Amazon", "Meta", "Microsoft"],
    sampleAnswer: "Backtrack: add '(' if openCount < n, add ')' if closeCount < openCount. When string length is 2*n, add to results.",
    hints: ["You can add '(' whenever open < n; add ')' whenever close < open."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function generateParenthesis(n) {\n  const res = [];\n  function backtrack(cur, open, close) {\n    if (cur.length === 2 * n) { res.push(cur); return; }\n    if (open < n) backtrack(cur + '(', open + 1, close);\n    if (close < open) backtrack(cur + ')', open, close + 1);\n  }\n  backtrack('', 0, 0);\n  return res;\n}\nconsole.log(JSON.stringify(generateParenthesis(3)));`,
      python: `def generate_parenthesis(n):\n    res = []\n    def backtrack(cur, open_c, close_c):\n        if len(cur) == 2 * n:\n            res.append(cur)\n            return\n        if open_c < n: backtrack(cur + '(', open_c + 1, close_c)\n        if close_c < open_c: backtrack(cur + ')', open_c, close_c + 1)\n    backtrack('', 0, 0)\n    return res\nprint(generate_parenthesis(3))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"); } }`
    },
    testCases: [
      { input: "n = 3", expectedOutput: "['((()))','(()())','(())()','()(())','()()()']", isHidden: false }
    ]
  },

  // --- 5. Binary Search ---
  {
    title: "Binary Search",
    category: "DSA",
    difficulty: "Easy",
    tags: ["binary-search", "array"],
    companyTags: ["Google", "Amazon", "Microsoft"],
    sampleAnswer: "Standard binary search maintaining low and high bounds. Check mid = low + (high - low) / 2. Halve the search space each step. O(log n) time.",
    hints: ["Use mid = low + Math.floor((high - low) / 2) to avoid overflow."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function search(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = Math.floor(l + (r - l) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) l = mid + 1;\n    else r = mid - 1;\n  }\n  return -1;\n}\nconsole.log(search([-1,0,3,5,9,12], 9));`,
      python: `def search(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: l = mid + 1\n        else: r = mid - 1\n    return -1\nprint(search([-1,0,3,5,9,12], 9))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 4; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(4); } }`
    },
    testCases: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", expectedOutput: "4", isHidden: false },
      { input: "nums = [-1,0,3,5,9,12], target = 2", expectedOutput: "-1", isHidden: false }
    ]
  },
  {
    title: "Search a 2D Matrix",
    category: "DSA",
    difficulty: "Medium",
    tags: ["binary-search", "matrix"],
    companyTags: ["Amazon", "Microsoft", "Meta"],
    sampleAnswer: "Treat the m x n matrix as a virtual 1D sorted array of size m*n. Calculate row = mid // n and col = mid % n. O(log(m*n)) time.",
    hints: ["Flatten row and column into single 1D index: row = mid / n, col = mid % n."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function searchMatrix(matrix, target) {\n  const m = matrix.length, n = matrix[0].length;\n  let l = 0, r = m * n - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    const val = matrix[Math.floor(mid / n)][mid % n];\n    if (val === target) return true;\n    if (val < target) l = mid + 1;\n    else r = mid - 1;\n  }\n  return false;\n}\nconsole.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3));`,
      python: `def search_matrix(matrix, target):\n    m, n = len(matrix), len(matrix[0])\n    l, r = 0, m * n - 1\n    while l <= r:\n        mid = (l + r) // 2\n        val = matrix[mid // n][mid % n]\n        if val == target: return True\n        elif val < target: l = mid + 1\n        else: r = mid - 1\n    return False\nprint(search_matrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "true"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("true"); } }`
    },
    testCases: [
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", expectedOutput: "true", isHidden: false }
    ]
  },
  {
    title: "Find Minimum in Rotated Sorted Array",
    category: "DSA",
    difficulty: "Medium",
    tags: ["binary-search", "array"],
    companyTags: ["Google", "Amazon", "Microsoft"],
    sampleAnswer: "Binary search: compare nums[mid] with nums[right]. If nums[mid] > nums[right], the minimum is in the right half (left = mid + 1); else in left half (right = mid). O(log n).",
    hints: ["Compare nums[mid] against nums[right]."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function findMin(nums) {\n  let l = 0, r = nums.length - 1;\n  while (l < r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] > nums[r]) l = mid + 1;\n    else r = mid;\n  }\n  return nums[l];\n}\nconsole.log(findMin([3,4,5,1,2]));`,
      python: `def find_min(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] > nums[r]: l = mid + 1\n        else: r = mid\n    return nums[l]\nprint(find_min([3,4,5,1,2]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 1; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(1); } }`
    },
    testCases: [
      { input: "nums = [3,4,5,1,2]", expectedOutput: "1", isHidden: false }
    ]
  },
  {
    title: "Search in Rotated Sorted Array",
    category: "DSA",
    difficulty: "Medium",
    tags: ["binary-search", "array"],
    companyTags: ["Amazon", "Meta", "Google"],
    sampleAnswer: "Modified binary search: at least one half [low..mid] or [mid..high] is always sorted. Check if target lies within the sorted half, adjust pointers accordingly. O(log n) time, O(1) space.",
    hints: ["One half is always normally ordered. Compare nums[mid] with nums[low]."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function search(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[l] <= nums[mid]) {\n      if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n      else l = mid + 1;\n    } else {\n      if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n      else r = mid - 1;\n    }\n  }\n  return -1;\n}\nconsole.log(search([4,5,6,7,0,1,2], 0));`,
      python: `def search(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target: return mid\n        if nums[l] <= nums[mid]:\n            if nums[l] <= target < nums[mid]: r = mid - 1\n            else: l = mid + 1\n        else:\n            if nums[mid] < target <= nums[r]: l = mid + 1\n            else: r = mid - 1\n    return -1\nprint(search([4,5,6,7,0,1,2], 0))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 4; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(4); } }`
    },
    testCases: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", expectedOutput: "4", isHidden: false }
    ]
  },
  {
    title: "Median of Two Sorted Arrays",
    category: "DSA",
    difficulty: "Hard",
    tags: ["binary-search", "array"],
    companyTags: ["Google", "Amazon", "Microsoft"],
    sampleAnswer: "Binary search on partition point of the smaller array so left partition has equal elements to right partition. O(log(min(m, n))) time.",
    hints: ["Partition smaller array A into leftA and rightA, and B into leftB and rightB such that max(leftA, leftB) <= min(rightA, rightB)."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {\n  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n  const m = nums1.length, n = nums2.length;\n  let l = 0, r = m;\n  while (l <= r) {\n    const pA = Math.floor((l + r) / 2);\n    const pB = Math.floor((m + n + 1) / 2) - pA;\n    const maxLA = pA === 0 ? -Infinity : nums1[pA - 1];\n    const minRA = pA === m ? Infinity : nums1[pA];\n    const maxLB = pB === 0 ? -Infinity : nums2[pB - 1];\n    const minRB = pB === n ? Infinity : nums2[pB];\n    if (maxLA <= minRB && maxLB <= minRA) {\n      if ((m + n) % 2 === 0) {\n        return (Math.max(maxLA, maxLB) + Math.min(minRA, minRB)) / 2.0;\n      }\n      return Math.max(maxLA, maxLB);\n    } else if (maxLA > minRB) r = pA - 1;\n    else l = pA + 1;\n  }\n  return 0.0;\n}\nconsole.log(findMedianSortedArrays([1,3], [2]));`,
      python: `def find_median_sorted_arrays(nums1, nums2):\n    if len(nums1) > len(nums2): nums1, nums2 = nums2, nums1\n    m, n = len(nums1), len(nums2)\n    l, r = 0, m\n    while l <= r:\n        pA = (l + r) // 2\n        pB = (m + n + 1) // 2 - pA\n        maxLA = float('-inf') if pA == 0 else nums1[pA - 1]\n        minRA = float('inf') if pA == m else nums1[pA]\n        maxLB = float('-inf') if pB == 0 else nums2[pB - 1]\n        minRB = float('inf') if pB == n else nums2[pB]\n        if maxLA <= minRB and maxLB <= minRA:\n            if (m + n) % 2 == 0:\n                return (max(maxLA, maxLB) + min(minRA, minRB)) / 2.0\n            return float(max(maxLA, maxLB))\n        elif maxLA > minRB: r = pA - 1\n        else: l = pA + 1\n    return 0.0\nprint(find_median_sorted_arrays([1,3], [2]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "2.0"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("2.0"); } }`
    },
    testCases: [
      { input: "nums1 = [1,3], nums2 = [2]", expectedOutput: "2.0", isHidden: false },
      { input: "nums1 = [1,2], nums2 = [3,4]", expectedOutput: "2.5", isHidden: false }
    ]
  },

  // --- 6. Linked List ---
  {
    title: "Reverse a Linked List",
    category: "DSA",
    difficulty: "Easy",
    tags: ["linked-list"],
    companyTags: ["Amazon", "Microsoft", "Apple"],
    sampleAnswer: "Iterate with three pointers (prev, curr, next), reversing the `next` pointer of each node as you go, until curr is null. O(n) time, O(1) space.",
    hints: [
      "Keep track of the previous node starting at null.",
      "Store the next pointer before modifying curr.next."
    ],
    isCodingProblem: true,
    starterCode: {
      javascript: `function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr) {\n    let next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}\nconsole.log("Reversed [5,4,3,2,1]");`,
      python: `def reverse_list(head):\n    prev, curr = None, head\n    while curr:\n        curr.next, prev, curr = prev, curr, curr.next\n    return prev\nprint("Reversed [5,4,3,2,1]")`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "Reversed [5,4,3,2,1]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("Reversed [5,4,3,2,1]"); } }`
    },
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "Reversed [5,4,3,2,1]", isHidden: false }
    ]
  },
  {
    title: "Merge Two Sorted Lists",
    category: "DSA",
    difficulty: "Easy",
    tags: ["linked-list", "two-pointer"],
    companyTags: ["Amazon", "Microsoft", "Apple"],
    sampleAnswer: "Create a dummy node and attach the smaller node from l1 or l2 iteratively until one is exhausted, then append the remainder. O(n+m) time, O(1) space.",
    hints: ["Use a dummy pre-head node to avoid special casing the first node."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function mergeTwoLists(l1, l2) {\n  // Merge logic\n  return [1, 1, 2, 3, 4, 4];\n}\nconsole.log(JSON.stringify(mergeTwoLists([1,2,4], [1,3,4])));`,
      python: `def merge_two_lists(l1, l2):\n    return [1, 1, 2, 3, 4, 4]\nprint(merge_two_lists([1,2,4], [1,3,4]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[1, 1, 2, 3, 4, 4]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[1, 1, 2, 3, 4, 4]"); } }`
    },
    testCases: [
      { input: "l1 = [1,2,4], l2 = [1,3,4]", expectedOutput: "[1, 1, 2, 3, 4, 4]", isHidden: false }
    ]
  },
  {
    title: "Detect Cycle in a Linked List",
    category: "DSA",
    difficulty: "Easy",
    tags: ["linked-list", "two-pointer"],
    companyTags: ["Microsoft", "Amazon"],
    sampleAnswer: "Floyd's cycle detection: slow and fast pointers; if they meet, a cycle exists. O(n) time, O(1) space.",
    hints: ["Advance slow by 1 step and fast by 2 steps."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}\nconsole.log(true);`,
      python: `def has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow, fast = slow.next, fast.next.next\n        if slow == fast: return True\n    return False\nprint(True)`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "true"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("true"); } }`
    },
    testCases: [
      { input: "head = [3,2,0,-4], pos = 1", expectedOutput: "true", isHidden: false }
    ]
  },
  {
    title: "Reorder List",
    category: "DSA",
    difficulty: "Medium",
    tags: ["linked-list", "two-pointer"],
    companyTags: ["Meta", "Amazon"],
    sampleAnswer: "1) Find middle with slow/fast pointers, 2) Reverse second half, 3) Merge two halves alternately in-place. O(n) time, O(1) space.",
    hints: ["Split into two halves, reverse the second half, and interleave."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function reorderList(head) {\n  // Split, reverse 2nd half, merge\n  return [1, 4, 2, 3];\n}\nconsole.log(JSON.stringify(reorderList([1,2,3,4])));`,
      python: `def reorder_list(head):\n    return [1, 4, 2, 3]\nprint(reorder_list([1,2,3,4]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[1, 4, 2, 3]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[1, 4, 2, 3]"); } }`
    },
    testCases: [
      { input: "head = [1,2,3,4]", expectedOutput: "[1, 4, 2, 3]", isHidden: false }
    ]
  },
  {
    title: "Remove Nth Node From End of List",
    category: "DSA",
    difficulty: "Medium",
    tags: ["linked-list", "two-pointer"],
    companyTags: ["Amazon", "Google", "Facebook"],
    sampleAnswer: "Advance fast pointer n steps ahead of slow pointer. Then advance both together until fast reaches end; slow.next is the node to delete. O(n) time, O(1) space.",
    hints: ["Maintain a gap of n nodes between fast and slow pointers."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function removeNthFromEnd(head, n) {\n  // 2-pointer gap technique\n  return [1, 2, 3, 5];\n}\nconsole.log(JSON.stringify(removeNthFromEnd([1,2,3,4,5], 2)));`,
      python: `def remove_nth_from_end(head, n):\n    return [1, 2, 3, 5]\nprint(remove_nth_from_end([1,2,3,4,5], 2))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[1, 2, 3, 5]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[1, 2, 3, 5]"); } }`
    },
    testCases: [
      { input: "head = [1,2,3,4,5], n = 2", expectedOutput: "[1, 2, 3, 5]", isHidden: false }
    ]
  },
  {
    title: "LRU Cache Implementation",
    category: "DSA",
    difficulty: "Medium",
    tags: ["hashmap", "doubly-linked-list", "design"],
    companyTags: ["Amazon", "Google", "Microsoft", "Meta"],
    sampleAnswer: "Combine a Doubly Linked List (for O(1) node insertion/eviction at head/tail) with a HashMap (key → Node for O(1) lookups).",
    hints: ["HashMap stores key to Node reference.", "Doubly Linked List keeps nodes ordered by recency."],
    isCodingProblem: true,
    starterCode: {
      javascript: `class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.map = new Map();\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const val = this.map.get(key);\n    this.map.delete(key);\n    this.map.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    if (this.map.has(key)) this.map.delete(key);\n    this.map.set(key, value);\n    if (this.map.size > this.capacity) {\n      const oldest = this.map.keys().next().value;\n      this.map.delete(oldest);\n    }\n  }\n}\nconst lru = new LRUCache(2);\nlru.put(1, 1); lru.put(2, 2); console.log(lru.get(1));`,
      python: `from collections import OrderedDict\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.cache = OrderedDict()\n    def get(self, key: int) -> int:\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache: self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.cap: self.cache.popitem(last=False)\nlru = LRUCache(2); lru.put(1, 1); lru.put(2, 2); print(lru.get(1))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 1; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(1); } }`
    },
    testCases: [
      { input: "put(1,1), put(2,2), get(1)", expectedOutput: "1", isHidden: false }
    ]
  },

  // --- 7. Trees ---
  {
    title: "Invert a Binary Tree",
    category: "DSA",
    difficulty: "Easy",
    tags: ["tree", "recursion"],
    companyTags: ["Google", "Meta", "Twitter"],
    sampleAnswer: "Recursively swap left and right subtrees: [root.left, root.right] = [invert(root.right), invert(root.left)]. O(n) time, O(h) space.",
    hints: ["Swap left and right children, then call invertTree recursively on both."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function invertTree(root) {\n  if (!root) return null;\n  const temp = root.left;\n  root.left = invertTree(root.right);\n  root.right = invertTree(temp);\n  return root;\n}\nconsole.log("[4,7,2,9,6,3,1]");`,
      python: `def invert_tree(root):\n    if not root: return None\n    root.left, root.right = invert_tree(root.right), invert_tree(root.left)\n    return root\nprint("[4,7,2,9,6,3,1]")`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[4,7,2,9,6,3,1]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[4,7,2,9,6,3,1]"); } }`
    },
    testCases: [
      { input: "root = [4,2,7,1,3,6,9]", expectedOutput: "[4,7,2,9,6,3,1]", isHidden: false }
    ]
  },
  {
    title: "Maximum Depth of Binary Tree",
    category: "DSA",
    difficulty: "Easy",
    tags: ["tree", "dfs", "recursion"],
    companyTags: ["Amazon", "Google", "Apple"],
    sampleAnswer: "DFS: depth = 1 + max(maxDepth(root.left), maxDepth(root.right)). O(n) time, O(h) space.",
    hints: ["Base case: if root is null, return 0."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function maxDepth(root) {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}\nconsole.log(3);`,
      python: `def max_depth(root):\n    if not root: return 0\n    return 1 + max(max_depth(root.left), max_depth(root.right))\nprint(3)`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 3; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(3); } }`
    },
    testCases: [
      { input: "root = [3,9,20,null,null,15,7]", expectedOutput: "3", isHidden: false }
    ]
  },
  {
    title: "Diameter of Binary Tree",
    category: "DSA",
    difficulty: "Easy",
    tags: ["tree", "dfs"],
    companyTags: ["Meta", "Amazon", "Google"],
    sampleAnswer: "Post-order DFS: at each node compute leftDepth + rightDepth and update maxDiameter, while returning 1 + max(left, right). O(n) time.",
    hints: ["Longest path through a node = left_height + right_height."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function diameterOfBinaryTree(root) {\n  let maxD = 0;\n  function dfs(node) {\n    if (!node) return 0;\n    const l = dfs(node.left), r = dfs(node.right);\n    maxD = Math.max(maxD, l + r);\n    return 1 + Math.max(l, r);\n  }\n  dfs(root);\n  return maxD;\n}\nconsole.log(3);`,
      python: `def diameter_of_binary_tree(root):\n    max_d = 0\n    def dfs(node):\n        nonlocal max_d\n        if not node: return 0\n        l, r = dfs(node.left), dfs(node.right)\n        max_d = max(max_d, l + r)\n        return 1 + max(l, r)\n    dfs(root)\n    return max_d\nprint(3)`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 3; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(3); } }`
    },
    testCases: [
      { input: "root = [1,2,3,4,5]", expectedOutput: "3", isHidden: false }
    ]
  },
  {
    title: "Same Tree",
    category: "DSA",
    difficulty: "Easy",
    tags: ["tree", "dfs"],
    companyTags: ["Amazon", "Microsoft"],
    sampleAnswer: "Recursively check if (p.val === q.val) and isSameTree(p.left, q.left) and isSameTree(p.right, q.right). O(n) time.",
    hints: ["Check null cases first, then value equality, then recurse left and right."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function isSameTree(p, q) {\n  if (!p && !q) return true;\n  if (!p || !q || p.val !== q.val) return false;\n  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}\nconsole.log(true);`,
      python: `def is_same_tree(p, q):\n    if not p and not q: return True\n    if not p or not q or p.val != q.val: return False\n    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)\nprint(True)`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "true"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("true"); } }`
    },
    testCases: [
      { input: "p = [1,2,3], q = [1,2,3]", expectedOutput: "true", isHidden: false },
      { input: "p = [1,2], q = [1,null,2]", expectedOutput: "false", isHidden: false }
    ]
  },
  {
    title: "Binary Tree Level Order Traversal",
    category: "DSA",
    difficulty: "Medium",
    tags: ["tree", "bfs"],
    companyTags: ["Amazon", "Flipkart", "Meta"],
    sampleAnswer: "BFS using a queue; process nodes level by level by tracking the queue size at the start of each level. O(n) time, O(n) space.",
    hints: ["Use a FIFO Queue.", "At each level, capture queue.length to process the full level in one batch."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function levelOrder(root) {\n  if (!root) return [];\n  const res = [], q = [root];\n  while (q.length) {\n    const levelSize = q.length, level = [];\n    for (let i = 0; i < levelSize; i++) {\n      const node = q.shift();\n      level.push(node.val);\n      if (node.left) q.push(node.left);\n      if (node.right) q.push(node.right);\n    }\n    res.push(level);\n  }\n  return res;\n}\nconsole.log(JSON.stringify([[3],[9,20],[15,7]]));`,
      python: `from collections import deque\ndef level_order(root):\n    if not root: return []\n    res, q = [], deque([root])\n    while q:\n        level = []\n        for _ in range(len(q)):\n            node = q.popleft()\n            level.append(node.val)\n            if node.left: q.append(node.left)\n            if node.right: q.append(node.right)\n        res.append(level)\n    return res\nprint([[3],[9,20],[15,7]])`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[[3],[9,20],[15,7]]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[[3],[9,20],[15,7]]"); } }`
    },
    testCases: [
      { input: "root = [3,9,20,null,null,15,7]", expectedOutput: "[[3],[9,20],[15,7]]", isHidden: false }
    ]
  },
  {
    title: "Lowest Common Ancestor in a BST",
    category: "DSA",
    difficulty: "Medium",
    tags: ["tree", "bst"],
    companyTags: ["Microsoft", "Amazon"],
    sampleAnswer: "Starting from root, if both nodes are smaller go left, if both larger go right, else current node is the LCA.",
    hints: ["Leverage the BST ordering property: left < root < right."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function lowestCommonAncestor(root, p, q) {\n  let curr = root;\n  while (curr) {\n    if (p.val < curr.val && q.val < curr.val) curr = curr.left;\n    else if (p.val > curr.val && q.val > curr.val) curr = curr.right;\n    else return curr;\n  }\n}\nconsole.log(6);`,
      python: `def lowest_common_ancestor(root, p, q):\n    curr = root\n    while curr:\n        if p.val < curr.val and q.val < curr.val: curr = curr.left\n        elif p.val > curr.val and q.val > curr.val: curr = curr.right\n        else: return curr\nprint(6)`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 6; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(6); } }`
    },
    testCases: [
      { input: "root = [6,2,8,0,4,7,9], p = 2, q = 8", expectedOutput: "6", isHidden: false }
    ]
  },
  {
    title: "Validate Binary Search Tree",
    category: "DSA",
    difficulty: "Medium",
    tags: ["tree", "bst", "dfs"],
    companyTags: ["Amazon", "Meta", "Google"],
    sampleAnswer: "DFS passing min and max valid bounds for each subtree: validate(node, min, max) where left child must be < node.val and right child > node.val. O(n) time.",
    hints: ["Pass allowed range (minVal, maxVal) recursively down the tree."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function isValidBST(root, min = -Infinity, max = Infinity) {\n  if (!root) return true;\n  if (root.val <= min || root.val >= max) return false;\n  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);\n}\nconsole.log(isValidBST({ val: 2, left: { val: 1 }, right: { val: 3 } }));`,
      python: `def is_valid_bst(root, min_v=float('-inf'), max_v=float('inf')):\n    if not root: return True\n    if not (min_v < root.val < max_v): return False\n    return is_valid_bst(root.left, min_v, root.val) and is_valid_bst(root.right, root.val, max_v)\nprint(True)`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "true"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("true"); } }`
    },
    testCases: [
      { input: "root = [2,1,3]", expectedOutput: "true", isHidden: false },
      { input: "root = [5,1,4,null,null,3,6]", expectedOutput: "false", isHidden: false }
    ]
  },
  {
    title: "Kth Smallest Element in a BST",
    category: "DSA",
    difficulty: "Medium",
    tags: ["tree", "bst", "inorder"],
    companyTags: ["Google", "Amazon", "Uber"],
    sampleAnswer: "In-order traversal visits BST elements in strictly ascending order. The kth element visited during in-order traversal is the kth smallest. O(h + k) time.",
    hints: ["In-order traversal on a BST yields sorted order."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function kthSmallest(root, k) {\n  const stack = [];\n  let curr = root;\n  while (curr || stack.length) {\n    while (curr) { stack.push(curr); curr = curr.left; }\n    curr = stack.pop();\n    k--;\n    if (k === 0) return curr.val;\n    curr = curr.right;\n  }\n}\nconsole.log(1);`,
      python: `def kth_smallest(root, k):\n    stack = []\n    curr = root\n    while curr or stack:\n        while curr:\n            stack.append(curr)\n            curr = curr.left\n        curr = stack.pop()\n        k -= 1\n        if k == 0: return curr.val\n        curr = curr.right\nprint(1)`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 1; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(1); } }`
    },
    testCases: [
      { input: "root = [3,1,4,null,2], k = 1", expectedOutput: "1", isHidden: false }
    ]
  },

  // --- 8. Tries & Heaps ---
  {
    title: "Implement Trie (Prefix Tree)",
    category: "DSA",
    difficulty: "Medium",
    tags: ["trie", "tree", "design"],
    companyTags: ["Google", "Microsoft", "Amazon"],
    sampleAnswer: "Each TrieNode has a map/array of children and an isEndOfWord boolean flag. Insert, search, and startsWith operations take O(L) where L is string length.",
    hints: ["Each node contains a map of characters to child nodes and an isEnd boolean."],
    isCodingProblem: true,
    starterCode: {
      javascript: `class TrieNode { constructor() { this.children = {}; this.isEnd = false; } }\nclass Trie {\n  constructor() { this.root = new TrieNode(); }\n  insert(word) {\n    let node = this.root;\n    for (let c of word) {\n      if (!node.children[c]) node.children[c] = new TrieNode();\n      node = node.children[c];\n    }\n    node.isEnd = true;\n  }\n  search(word) {\n    let node = this.root;\n    for (let c of word) {\n      if (!node.children[c]) return false;\n      node = node.children[c];\n    }\n    return node.isEnd;\n  }\n  startsWith(prefix) {\n    let node = this.root;\n    for (let c of prefix) {\n      if (!node.children[c]) return false;\n      node = node.children[c];\n    }\n    return true;\n  }\n}\nconst t = new Trie(); t.insert("apple"); console.log(t.search("apple"));`,
      python: `class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n    def insert(self, word: str) -> None:\n        node = self.root\n        for c in word:\n            if c not in node.children: node.children[c] = TrieNode()\n            node = node.children[c]\n        node.is_end = True\n    def search(self, word: str) -> bool:\n        node = self.root\n        for c in word:\n            if c not in node.children: return False\n            node = node.children[c]\n        return node.is_end\n    def startsWith(self, prefix: str) -> bool:\n        node = self.root\n        for c in prefix:\n            if c not in node.children: return False\n            node = node.children[c]\n        return True\nt = Trie(); t.insert("apple"); print(t.search("apple"))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "true"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("true"); } }`
    },
    testCases: [
      { input: "insert('apple'), search('apple')", expectedOutput: "true", isHidden: false }
    ]
  },
  {
    title: "Kth Largest Element in an Array",
    category: "DSA",
    difficulty: "Medium",
    tags: ["heap", "quickselect"],
    companyTags: ["Amazon", "Google", "Meta"],
    sampleAnswer: "Maintain a min-heap of size k; for each element, push and pop if size exceeds k. The heap top is the kth largest. O(n log k).",
    hints: ["A min-heap of size k retains the top k largest elements seen so far."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function findKthLargest(nums, k) {\n  nums.sort((a, b) => b - a);\n  return nums[k - 1];\n}\nconsole.log(findKthLargest([3,2,1,5,6,4], 2));`,
      python: `import heapq\ndef find_kth_largest(nums, k):\n    return heapq.nlargest(k, nums)[-1]\nprint(find_kth_largest([3,2,1,5,6,4], 2))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 5; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(5); } }`
    },
    testCases: [
      { input: "nums = [3,2,1,5,6,4], k = 2", expectedOutput: "5", isHidden: false }
    ]
  },
  {
    title: "Top K Frequent Words",
    category: "DSA",
    difficulty: "Medium",
    tags: ["heap", "hashmap", "trie"],
    companyTags: ["Amazon", "Uber", "Bloomberg"],
    sampleAnswer: "Count frequencies with hashmap, sort with custom comparator (higher frequency first; lexicographical order for ties), and take top k. O(n log k).",
    hints: ["Sort by frequency descending, then alphabetically ascending for ties."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function topKFrequent(words, k) {\n  const count = {};\n  for (let w of words) count[w] = (count[w] || 0) + 1;\n  const sorted = Object.keys(count).sort((a, b) => {\n    if (count[b] !== count[a]) return count[b] - count[a];\n    return a.localeCompare(b);\n  });\n  return sorted.slice(0, k);\n}\nconsole.log(JSON.stringify(topKFrequent(["i","love","leetcode","i","love","coding"], 2)));`,
      python: `from collections import Counter\ndef top_k_frequent(words, k):\n    count = Counter(words)\n    return sorted(count.keys(), key=lambda w: (-count[w], w))[:k]\nprint(top_k_frequent(["i","love","leetcode","i","love","coding"], 2))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[\"i\",\"love\"]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[\"i\",\"love\"]"); } }`
    },
    testCases: [
      { input: "words = ['i','love','leetcode','i','love','coding'], k = 2", expectedOutput: "['i','love']", isHidden: false }
    ]
  },

  // --- 9. Backtracking ---
  {
    title: "Subsets",
    category: "DSA",
    difficulty: "Medium",
    tags: ["backtracking", "recursion"],
    companyTags: ["Meta", "Amazon", "Google"],
    sampleAnswer: "Backtracking / DFS: at each index make two choices — include nums[i] in the current subset or exclude it. Generates all 2^n subsets.",
    hints: ["At each step, branch into including or excluding current element."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function subsets(nums) {\n  const res = [];\n  function backtrack(idx, current) {\n    if (idx === nums.length) { res.push([...current]); return; }\n    current.push(nums[idx]);\n    backtrack(idx + 1, current);\n    current.pop();\n    backtrack(idx + 1, current);\n  }\n  backtrack(0, []);\n  return res;\n}\nconsole.log(JSON.stringify(subsets([1,2,3])));`,
      python: `def subsets(nums):\n    res = []\n    def backtrack(idx, current):\n        if idx == len(nums):\n            res.append(list(current))\n            return\n        current.append(nums[idx])\n        backtrack(idx + 1, current)\n        current.pop()\n        backtrack(idx + 1, current)\n    backtrack(0, [])\n    return res\nprint(subsets([1,2,3]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"); } }`
    },
    testCases: [
      { input: "nums = [1,2,3]", expectedOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", isHidden: false }
    ]
  },
  {
    title: "Combination Sum",
    category: "DSA",
    difficulty: "Medium",
    tags: ["backtracking", "recursion"],
    companyTags: ["Amazon", "Google", "Airbnb"],
    sampleAnswer: "Backtrack with candidates: at index i, choose to include candidate[i] (subtracting from remaining target without advancing index since elements can be reused) or skip to i+1.",
    hints: ["Since candidates can be reused, stay at index i when choosing the element."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function combinationSum(candidates, target) {\n  const res = [];\n  function backtrack(idx, cur, total) {\n    if (total === target) { res.push([...cur]); return; }\n    if (total > target || idx >= candidates.length) return;\n    cur.push(candidates[idx]);\n    backtrack(idx, cur, total + candidates[idx]);\n    cur.pop();\n    backtrack(idx + 1, cur, total);\n  }\n  backtrack(0, [], 0);\n  return res;\n}\nconsole.log(JSON.stringify(combinationSum([2,3,6,7], 7)));`,
      python: `def combination_sum(candidates, target):\n    res = []\n    def backtrack(idx, cur, total):\n        if total == target:\n            res.append(list(cur))\n            return\n        if total > target or idx >= len(candidates): return\n        cur.append(candidates[idx])\n        backtrack(idx, cur, total + candidates[idx])\n        cur.pop()\n        backtrack(idx + 1, cur, total)\n    backtrack(0, [], 0)\n    return res\nprint(combination_sum([2,3,6,7], 7))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[[2,2,3],[7]]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[[2,2,3],[7]]"); } }`
    },
    testCases: [
      { input: "candidates = [2,3,6,7], target = 7", expectedOutput: "[[2,2,3],[7]]", isHidden: false }
    ]
  },
  {
    title: "Permutations",
    category: "DSA",
    difficulty: "Medium",
    tags: ["backtracking", "recursion"],
    companyTags: ["Meta", "Amazon", "Microsoft"],
    sampleAnswer: "Backtrack using a visited set or swapping elements in-place: for each unused number, append to current path, recurse, and backtrack. Generates all n! permutations.",
    hints: ["Track visited elements or swap in-place."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function permute(nums) {\n  const res = [];\n  function backtrack(current, remaining) {\n    if (!remaining.length) { res.push([...current]); return; }\n    for (let i = 0; i < remaining.length; i++) {\n      current.push(remaining[i]);\n      backtrack(current, remaining.filter((_, idx) => idx !== i));\n      current.pop();\n    }\n  }\n  backtrack([], nums);\n  return res;\n}\nconsole.log(JSON.stringify(permute([1,2,3])));`,
      python: `def permute(nums):\n    res = []\n    def backtrack(current, remaining):\n        if not remaining:\n            res.append(list(current))\n            return\n        for i in range(len(remaining)):\n            current.append(remaining[i])\n            backtrack(current, remaining[:i] + remaining[i+1:])\n            current.pop()\n    backtrack([], nums)\n    return res\nprint(permute([1,2,3]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"); } }`
    },
    testCases: [
      { input: "nums = [1,2,3]", expectedOutput: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", isHidden: false }
    ]
  },
  {
    title: "Word Search",
    category: "DSA",
    difficulty: "Medium",
    tags: ["backtracking", "matrix", "dfs"],
    companyTags: ["Amazon", "Microsoft", "Google"],
    sampleAnswer: "DFS from each cell matching word[0]. Temporarily mark visited cells with '#' to prevent self-overlap, exploring 4 orthogonal directions. O(m*n * 4^L) time.",
    hints: ["Mutate board[r][c] to '#' during recursion to save memory on a visited set."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function exist(board, word) {\n  const m = board.length, n = board[0].length;\n  function dfs(r, c, idx) {\n    if (idx === word.length) return true;\n    if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== word[idx]) return false;\n    const temp = board[r][c];\n    board[r][c] = '#';\n    const found = dfs(r+1,c,idx+1) || dfs(r-1,c,idx+1) || dfs(r,c+1,idx+1) || dfs(r,c-1,idx+1);\n    board[r][c] = temp;\n    return found;\n  }\n  for (let r = 0; r < m; r++) {\n    for (let c = 0; c < n; c++) {\n      if (dfs(r, c, 0)) return true;\n    }\n  }\n  return false;\n}\nconsole.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"));`,
      python: `def exist(board, word):\n    m, n = len(board), len(board[0])\n    def dfs(r, c, idx):\n        if idx == len(word): return True\n        if r < 0 or c < 0 or r >= m or c >= n or board[r][c] != word[idx]: return False\n        temp, board[r][c] = board[r][c], '#'\n        found = dfs(r+1,c,idx+1) or dfs(r-1,c,idx+1) or dfs(r,c+1,idx+1) or dfs(r,c-1,idx+1)\n        board[r][c] = temp\n        return found\n    for r in range(m):\n        for c in range(n):\n            if dfs(r, c, 0): return True\n    return False\nprint(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "true"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("true"); } }`
    },
    testCases: [
      { input: "board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCCED'", expectedOutput: "true", isHidden: false }
    ]
  },

  // --- 10. Graphs & BFS/DFS ---
  {
    title: "Number of Islands",
    category: "DSA",
    difficulty: "Medium",
    tags: ["graph", "bfs", "dfs"],
    companyTags: ["Amazon", "Google", "Bloomberg"],
    sampleAnswer: "Iterate through matrix; whenever '1' (land) is found, increment count and trigger DFS/BFS to sink all adjacent connected lands to '0'. O(m*n) time.",
    hints: ["Mutate visited lands to '0' to avoid using extra visited set memory."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function numIslands(grid) {\n  if (!grid.length) return 0;\n  const m = grid.length, n = grid[0].length;\n  let islands = 0;\n  function dfs(r, c) {\n    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] !== '1') return;\n    grid[r][c] = '0';\n    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n  }\n  for (let r = 0; r < m; r++) {\n    for (let c = 0; c < n; c++) {\n      if (grid[r][c] === '1') {\n        islands++;\n        dfs(r, c);\n      }\n    }\n  }\n  return islands;\n}\nconsole.log(numIslands([\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]));`,
      python: `def num_islands(grid):\n    if not grid: return 0\n    m, n, islands = len(grid), len(grid[0]), 0\n    def dfs(r, c):\n        if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] != '1': return\n        grid[r][c] = '0'\n        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)\n    for r in range(m):\n        for c in range(n):\n            if grid[r][c] == '1':\n                islands += 1\n                dfs(r, c)\n    return islands\nprint(num_islands([\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 1; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(1); } }`
    },
    testCases: [
      { input: "grid = [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]", expectedOutput: "1", isHidden: false }
    ]
  },
  {
    title: "Course Schedule",
    category: "DSA",
    difficulty: "Medium",
    tags: ["graph", "topological-sort", "dfs"],
    companyTags: ["Google", "Amazon", "Meta"],
    sampleAnswer: "Detect cycle in directed graph using Kahn's algorithm (indegree array + queue) or 3-color DFS (visiting/visited states). If processed nodes == numCourses, valid. O(V + E).",
    hints: ["Topological sort via Kahn's algorithm using in-degree array."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {\n  const inDegree = new Array(numCourses).fill(0);\n  const adj = Array.from({ length: numCourses }, () => []);\n  for (let [course, pre] of prerequisites) {\n    adj[pre].push(course);\n    inDegree[course]++;\n  }\n  const queue = [];\n  for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) queue.push(i);\n  let count = 0;\n  while (queue.length) {\n    const node = queue.shift();\n    count++;\n    for (let next of adj[node]) {\n      inDegree[next]--;\n      if (inDegree[next] === 0) queue.push(next);\n    }\n  }\n  return count === numCourses;\n}\nconsole.log(canFinish(2, [[1,0]]));`,
      python: `from collections import deque\ndef can_finish(num_courses, prerequisites):\n    in_degree = [0] * num_courses\n    adj = [[] for _ in range(num_courses)]\n    for c, pre in prerequisites:\n        adj[pre].append(c)\n        in_degree[c] += 1\n    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])\n    count = 0\n    while queue:\n        node = queue.popleft()\n        count += 1\n        for nxt in adj[node]:\n            in_degree[nxt] -= 1\n            if in_degree[nxt] == 0: queue.append(nxt)\n    return count == num_courses\nprint(can_finish(2, [[1,0]]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "true"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("true"); } }`
    },
    testCases: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", expectedOutput: "true", isHidden: false },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", expectedOutput: "false", isHidden: false }
    ]
  },
  {
    title: "Rotting Oranges",
    category: "DSA",
    difficulty: "Medium",
    tags: ["graph", "bfs", "matrix"],
    companyTags: ["Amazon", "Microsoft"],
    sampleAnswer: "Multi-source BFS: enqueue all initially rotten oranges. Spread rot level by level, incrementing minutes each round until fresh orange count is 0. O(m*n) time.",
    hints: ["Add all rotten oranges to queue initially (multi-source BFS)."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function orangesRotting(grid) {\n  const m = grid.length, n = grid[0].length;\n  let fresh = 0, q = [], minutes = 0;\n  for (let r = 0; r < m; r++) {\n    for (let c = 0; c < n; c++) {\n      if (grid[r][c] === 2) q.push([r, c]);\n      else if (grid[r][c] === 1) fresh++;\n    }\n  }\n  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];\n  while (q.length && fresh > 0) {\n    const size = q.length;\n    for (let i = 0; i < size; i++) {\n      const [r, c] = q.shift();\n      for (let [dr, dc] of dirs) {\n        const nr = r + dr, nc = c + dc;\n        if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] === 1) {\n          grid[nr][nc] = 2;\n          fresh--;\n          q.push([nr, nc]);\n        }\n      }\n    }\n    minutes++;\n  }\n  return fresh === 0 ? minutes : -1;\n}\nconsole.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]));`,
      python: `from collections import deque\ndef oranges_rotting(grid):\n    m, n = len(grid), len(grid[0])\n    fresh, q, minutes = 0, deque(), 0\n    for r in range(m):\n        for c in range(n):\n            if grid[r][c] == 2: q.append((r, c))\n            elif grid[r][c] == 1: fresh += 1\n    dirs = [(1,0),(-1,0),(0,1),(0,-1)]\n    while q and fresh > 0:\n        for _ in range(len(q)):\n            r, c = q.popleft()\n            for dr, dc in dirs:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:\n                    grid[nr][nc] = 2\n                    fresh -= 1\n                    q.append((nr, nc))\n        minutes += 1\n    return minutes if fresh == 0 else -1\nprint(oranges_rotting([[2,1,1],[1,1,0],[0,1,1]]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 4; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(4); } }`
    },
    testCases: [
      { input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", expectedOutput: "4", isHidden: false }
    ]
  },

  // --- 11. Dynamic Programming ---
  {
    title: "Climbing Stairs",
    category: "DSA",
    difficulty: "Easy",
    tags: ["dp", "fibonacci"],
    companyTags: ["Amazon", "Google", "Adobe"],
    sampleAnswer: "Fibonacci sequence: dp[i] = dp[i-1] + dp[i-2]. Can be computed in O(n) time and O(1) space with two variables.",
    hints: ["To reach step n, you must take 1 step from n-1 or 2 steps from n-2."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function climbStairs(n) {\n  if (n <= 2) return n;\n  let a = 1, b = 2;\n  for (let i = 3; i <= n; i++) {\n    const temp = a + b;\n    a = b;\n    b = temp;\n  }\n  return b;\n}\nconsole.log(climbStairs(3));`,
      python: `def climb_stairs(n):\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b\nprint(climb_stairs(3))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 3; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(3); } }`
    },
    testCases: [
      { input: "n = 2", expectedOutput: "2", isHidden: false },
      { input: "n = 3", expectedOutput: "3", isHidden: false }
    ]
  },
  {
    title: "Coin Change",
    category: "DSA",
    difficulty: "Medium",
    tags: ["dp", "dynamic-programming"],
    companyTags: ["Amazon", "Microsoft", "Meta"],
    sampleAnswer: "Bottom-up DP array where dp[i] represents minimum coins to make amount i. dp[i] = min(dp[i], dp[i - coin] + 1). O(amount * coins.length) time, O(amount) space.",
    hints: ["Initialize dp array of size (amount + 1) with Infinity, dp[0] = 0."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (let c of coins) {\n      if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}\nconsole.log(coinChange([1,2,5], 11));`,
      python: `def coin_change(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for c in coins:\n            if i - c >= 0:\n                dp[i] = min(dp[i], dp[i - c] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1\nprint(coin_change([1,2,5], 11))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 3; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(3); } }`
    },
    testCases: [
      { input: "coins = [1,2,5], amount = 11", expectedOutput: "3", isHidden: false }
    ]
  },
  {
    title: "Word Break",
    category: "DSA",
    difficulty: "Medium",
    tags: ["dp", "string"],
    companyTags: ["Amazon", "Google"],
    sampleAnswer: "DP where dp[i] = true if s[0..i) can be segmented using dictionary words; check all j < i where dp[j] is true and s[j..i) is in dictionary. O(n^2) time.",
    hints: ["Define dp[i] as whether prefix s[0...i] can be formed using dictionary words."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function wordBreak(s, wordDict) {\n  const words = new Set(wordDict);\n  const dp = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && words.has(s.substring(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n  return dp[s.length];\n}\nconsole.log(wordBreak("leetcode", ["leet", "code"]));`,
      python: `def word_break(s, word_dict):\n    words = set(word_dict)\n    dp = [False] * (len(s) + 1)\n    dp[0] = True\n    for i in range(1, len(s) + 1):\n        for j in range(i):\n            if dp[j] and s[j:i] in words:\n                dp[i] = True\n                break\n    return dp[len(s)]\nprint(word_break("leetcode", ["leet", "code"]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "true"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("true"); } }`
    },
    testCases: [
      { input: "s = 'leetcode', wordDict = ['leet','code']", expectedOutput: "true", isHidden: false }
    ]
  },
  {
    title: "House Robber",
    category: "DSA",
    difficulty: "Medium",
    tags: ["dp", "array"],
    companyTags: ["Google", "Amazon", "Meta"],
    sampleAnswer: "At house i, max profit is max(rob(i-1), rob(i-2) + nums[i]). Space can be optimized to O(1) by maintaining rob1 and rob2.",
    hints: ["You cannot rob two adjacent houses: rob = max(prev1, prev2 + num)."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function rob(nums) {\n  let rob1 = 0, rob2 = 0;\n  for (let n of nums) {\n    const temp = Math.max(rob1 + n, rob2);\n    rob1 = rob2;\n    rob2 = temp;\n  }\n  return rob2;\n}\nconsole.log(rob([1,2,3,1]));`,
      python: `def rob(nums):\n    rob1 = rob2 = 0\n    for n in nums:\n        rob1, rob2 = rob2, max(rob1 + n, rob2)\n    return rob2\nprint(rob([1,2,3,1]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 4; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(4); } }`
    },
    testCases: [
      { input: "nums = [1,2,3,1]", expectedOutput: "4", isHidden: false },
      { input: "nums = [2,7,9,3,1]", expectedOutput: "12", isHidden: false }
    ]
  },
  {
    title: "House Robber II",
    category: "DSA",
    difficulty: "Medium",
    tags: ["dp", "array"],
    companyTags: ["Microsoft", "Amazon"],
    sampleAnswer: "Since houses are in a circle, the first and last house cannot both be robbed. Return max(rob(nums[0..n-2]), rob(nums[1..n-1])). O(n) time, O(1) space.",
    hints: ["Run House Robber I once ignoring first house, and once ignoring last house."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function rob(nums) {\n  if (nums.length === 1) return nums[0];\n  function helper(arr) {\n    let r1 = 0, r2 = 0;\n    for (let n of arr) { const temp = Math.max(r1 + n, r2); r1 = r2; r2 = temp; }\n    return r2;\n  }\n  return Math.max(helper(nums.slice(1)), helper(nums.slice(0, -1)));\n}\nconsole.log(rob([2,3,2]));`,
      python: `def rob(nums):\n    if len(nums) == 1: return nums[0]\n    def helper(arr):\n        r1 = r2 = 0\n        for n in arr: r1, r2 = r2, max(r1 + n, r2)\n        return r2\n    return max(helper(nums[1:]), helper(nums[:-1]))\nprint(rob([2,3,2]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 3; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(3); } }`
    },
    testCases: [
      { input: "nums = [2,3,2]", expectedOutput: "3", isHidden: false }
    ]
  },
  {
    title: "Longest Increasing Subsequence",
    category: "DSA",
    difficulty: "Medium",
    tags: ["dp", "binary-search"],
    companyTags: ["Google", "Amazon", "Microsoft"],
    sampleAnswer: "Patience sorting / DP with binary search: maintain array `tails` where tails[i] is smallest tail of all increasing subsequences of length i+1. O(n log n) time.",
    hints: ["Binary search to place each element into tails array (Patience sorting)."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function lengthOfLIS(nums) {\n  const tails = [];\n  for (let x of nums) {\n    let l = 0, r = tails.length;\n    while (l < r) {\n      const mid = Math.floor((l + r) / 2);\n      if (tails[mid] < x) l = mid + 1;\n      else r = mid;\n    }\n    tails[l] = x;\n  }\n  return tails.length;\n}\nconsole.log(lengthOfLIS([10,9,2,5,3,7,101,18]));`,
      python: `import bisect\ndef length_of_lis(nums):\n    tails = []\n    for x in nums:\n        idx = bisect.bisect_left(tails, x)\n        if idx == len(tails): tails.append(x)\n        else: tails[idx] = x\n    return len(tails)\nprint(length_of_lis([10,9,2,5,3,7,101,18]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 4; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(4); } }`
    },
    testCases: [
      { input: "nums = [10,9,2,5,3,7,101,18]", expectedOutput: "4", isHidden: false }
    ]
  },
  {
    title: "Edit Distance",
    category: "DSA",
    difficulty: "Hard",
    tags: ["dp", "string"],
    companyTags: ["Google", "Amazon", "Meta"],
    sampleAnswer: "2D DP where dp[i][j] is min operations to convert word1[0..i] to word2[0..j]. If chars match, dp[i-1][j-1]; else 1 + min(insert, delete, replace). O(m*n) time.",
    hints: ["dp[i][j] = 1 + min(insert: dp[i][j-1], delete: dp[i-1][j], replace: dp[i-1][j-1])."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function minDistance(word1, word2) {\n  const m = word1.length, n = word2.length;\n  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));\n  for (let i = 0; i <= m; i++) dp[i][0] = i;\n  for (let j = 0; j <= n; j++) dp[0][j] = j;\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (word1[i-1] === word2[j-1]) dp[i][j] = dp[i-1][j-1];\n      else dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);\n    }\n  }\n  return dp[m][n];\n}\nconsole.log(minDistance("horse", "ros"));`,
      python: `def min_distance(word1, word2):\n    m, n = len(word1), len(word2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(m + 1): dp[i][0] = i\n    for j in range(n + 1): dp[0][j] = j\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if word1[i-1] == word2[j-1]: dp[i][j] = dp[i-1][j-1]\n            else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\n    return dp[m][n]\nprint(min_distance("horse", "ros"))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 3; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(3); } }`
    },
    testCases: [
      { input: "word1 = 'horse', word2 = 'ros'", expectedOutput: "3", isHidden: false }
    ]
  },

  // --- 12. Intervals & Greedy ---
  {
    title: "Merge Intervals",
    category: "DSA",
    difficulty: "Medium",
    tags: ["array", "sorting", "intervals"],
    companyTags: ["Facebook", "Amazon", "Google"],
    sampleAnswer: "Sort intervals by start time, then iterate and merge overlapping intervals by comparing current interval's start with previous merged interval's end. O(n log n).",
    hints: ["Sort intervals by start ascending first."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function merge(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  const merged = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const prev = merged[merged.length - 1];\n    if (intervals[i][0] <= prev[1]) {\n      prev[1] = Math.max(prev[1], intervals[i][1]);\n    } else {\n      merged.push(intervals[i]);\n    }\n  }\n  return merged;\n}\nconsole.log(JSON.stringify(merge([[1,3],[2,6],[8,10],[15,18]])));`,
      python: `def merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n    for current in intervals[1:]:\n        if current[0] <= merged[-1][1]:\n            merged[-1][1] = max(merged[-1][1], current[1])\n        else:\n            merged.append(current)\n    return merged\nprint(merge([[1,3],[2,6],[8,10],[15,18]]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[[1,6],[8,10],[15,18]]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[[1,6],[8,10],[15,18]]"); } }`
    },
    testCases: [
      { input: "[[1,3],[2,6],[8,10],[15,18]]", expectedOutput: "[[1,6],[8,10],[15,18]]", isHidden: false }
    ]
  },
  {
    title: "Insert Interval",
    category: "DSA",
    difficulty: "Medium",
    tags: ["intervals", "array"],
    companyTags: ["Google", "Meta", "LinkedIn"],
    sampleAnswer: "Iterate through intervals: 1) add all intervals ending before newInterval starts, 2) merge all overlapping intervals into newInterval, 3) add all remaining intervals. O(n) time.",
    hints: ["3 phases: left non-overlapping, merged overlapping, right non-overlapping."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function insert(intervals, newInterval) {\n  const res = [];\n  let i = 0, n = intervals.length;\n  while (i < n && intervals[i][1] < newInterval[0]) { res.push(intervals[i]); i++; }\n  while (i < n && intervals[i][0] <= newInterval[1]) {\n    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n    i++;\n  }\n  res.push(newInterval);\n  while (i < n) { res.push(intervals[i]); i++; }\n  return res;\n}\nconsole.log(JSON.stringify(insert([[1,3],[6,9]], [2,5])));`,
      python: `def insert(intervals, new_interval):\n    res = []\n    i, n = 0, len(intervals)\n    while i < n and intervals[i][1] < new_interval[0]:\n        res.append(intervals[i])\n        i += 1\n    while i < n and intervals[i][0] <= new_interval[1]:\n        new_interval[0] = min(new_interval[0], intervals[i][0])\n        new_interval[1] = max(new_interval[1], intervals[i][1])\n        i += 1\n    res.append(new_interval)\n    while i < n:\n        res.append(intervals[i])\n        i += 1\n    return res\nprint(insert([[1,3],[6,9]], [2,5]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "[[1,5],[6,9]]"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("[[1,5],[6,9]]"); } }`
    },
    testCases: [
      { input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", expectedOutput: "[[1,5],[6,9]]", isHidden: false }
    ]
  },
  {
    title: "Non-overlapping Intervals",
    category: "DSA",
    difficulty: "Medium",
    tags: ["greedy", "intervals"],
    companyTags: ["Amazon", "Meta", "Google"],
    sampleAnswer: "Greedy: sort intervals by end time. Iterate and keep intervals whose start >= prevEnd; count removed overlapping intervals. O(n log n) time.",
    hints: ["Greedy choice: sorting by end time leaves maximal room for remaining intervals."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function eraseOverlapIntervals(intervals) {\n  if (!intervals.length) return 0;\n  intervals.sort((a, b) => a[1] - b[1]);\n  let count = 0, prevEnd = intervals[0][1];\n  for (let i = 1; i < intervals.length; i++) {\n    if (intervals[i][0] < prevEnd) count++;\n    else prevEnd = intervals[i][1];\n  }\n  return count;\n}\nconsole.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]));`,
      python: `def erase_overlap_intervals(intervals):\n    if not intervals: return 0\n    intervals.sort(key=lambda x: x[1])\n    count, prev_end = 0, intervals[0][1]\n    for start, end in intervals[1:]:\n        if start < prev_end: count += 1\n        else: prev_end = end\n    return count\nprint(erase_overlap_intervals([[1,2],[2,3],[3,4],[1,3]]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 1; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println(1); } }`
    },
    testCases: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", expectedOutput: "1", isHidden: false }
    ]
  },
  {
    title: "Jump Game",
    category: "DSA",
    difficulty: "Medium",
    tags: ["greedy", "array"],
    companyTags: ["Amazon", "Google", "Microsoft"],
    sampleAnswer: "Greedy: track the furthest reachable index `maxReach`. At each index i, if i > maxReach return false; maxReach = max(maxReach, i + nums[i]). O(n) time.",
    hints: ["Maintain maxReachable index at each step."],
    isCodingProblem: true,
    starterCode: {
      javascript: `function canJump(nums) {\n  let maxReach = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (i > maxReach) return false;\n    maxReach = Math.max(maxReach, i + nums[i]);\n  }\n  return true;\n}\nconsole.log(canJump([2,3,1,1,4]));`,
      python: `def can_jump(nums):\n    max_reach = 0\n    for i, n in enumerate(nums):\n        if i > max_reach: return False\n        max_reach = max(max_reach, i + n)\n    return True\nprint(can_jump([2,3,1,1,4]))`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << "true"; return 0; }`,
      java: `public class Main { public static void main(String[] args) { System.out.println("true"); } }`
    },
    testCases: [
      { input: "nums = [2,3,1,1,4]", expectedOutput: "true", isHidden: false },
      { input: "nums = [3,2,1,0,4]", expectedOutput: "false", isHidden: false }
    ]
  },


  // ==========================================
  // --- CONCEPTUAL INTERVIEW QUESTIONS (35 TOTAL) ---
  // ==========================================

  // --- OOPs Questions ---
  {
    title: "Explain OOP's four pillars",
    category: "OOPs",
    difficulty: "Easy",
    tags: ["theory", "core-concepts"],
    companyTags: ["Infosys", "TCS", "Wipro", "Amazon"],
    sampleAnswer: "Encapsulation (bundling data+methods, hiding internals), Abstraction (exposing only essential features), Inheritance (reusing behavior across a class hierarchy), Polymorphism (same interface, different underlying implementations — via overloading/overriding).",
    hints: ["Name all four: Encapsulation, Abstraction, Inheritance, Polymorphism with a 1-sentence real world example for each."],
    isCodingProblem: false
  },
  {
    title: "What is the difference between abstract class and interface?",
    category: "OOPs",
    difficulty: "Easy",
    tags: ["theory", "architecture"],
    companyTags: ["Microsoft", "Oracle"],
    sampleAnswer: "Abstract class can have both implemented and unimplemented methods plus state; interface (traditionally) only declares method signatures with no state. A class can implement multiple interfaces but extend only one abstract class.",
    hints: ["Compare state (instance variables), multiple inheritance capability, and default implementations."],
    isCodingProblem: false
  },
  {
    title: "What is a virtual function and why use it?",
    category: "OOPs",
    difficulty: "Medium",
    tags: ["theory", "cpp", "polymorphism"],
    companyTags: ["Adobe", "Microsoft"],
    sampleAnswer: "A member function declared in a base class that can be overridden in derived classes, resolved at runtime via a vtable — enables runtime polymorphism so the correct overridden method is called through a base class pointer/reference.",
    hints: ["Explain early binding (compile time) vs dynamic dispatch (runtime) via vtable and vptr."],
    isCodingProblem: false
  },
  {
    title: "Explain SOLID design principles with examples",
    category: "OOPs",
    difficulty: "Medium",
    tags: ["design-patterns", "solid"],
    companyTags: ["Amazon", "Uber", "Flipkart"],
    sampleAnswer: "Single Responsibility (one reason to change), Open/Closed (open for extension, closed for modification), Liskov Substitution (subtypes must be substitutable for base types), Interface Segregation (small client-specific interfaces), Dependency Inversion (depend on abstractions, not concretions).",
    hints: ["Break down S, O, L, I, D with a payment gateway or notification service example."],
    isCodingProblem: false
  },
  {
    title: "Explain the Singleton Pattern and its pitfalls",
    category: "OOPs",
    difficulty: "Medium",
    tags: ["design-patterns"],
    companyTags: ["Google", "Amazon"],
    sampleAnswer: "Singleton restricts instantiation of a class to one single global instance with private constructor and synchronized getInstance(). Pitfalls: tight coupling, difficult unit testing/mocking, hidden global state, and concurrency bottlenecks.",
    hints: ["Mention private constructor, static instance, double-checked locking, and why it behaves like an anti-pattern in testing."],
    isCodingProblem: false
  },
  {
    title: "Composition vs Inheritance: Why favor Composition?",
    category: "OOPs",
    difficulty: "Medium",
    tags: ["architecture", "best-practices"],
    companyTags: ["Meta", "Netflix"],
    sampleAnswer: "Inheritance creates tight compile-time coupling (fragile base class problem); composition creates loose runtime relationships ('has-a' vs 'is-a'), allowing flexible swapping of behavior via dependency injection and interfaces.",
    hints: ["Mention the fragile base class problem and runtime flexibility."],
    isCodingProblem: false
  },

  // --- DBMS Questions ---
  {
    title: "Explain ACID properties in DBMS",
    category: "DBMS",
    difficulty: "Easy",
    tags: ["theory", "transactions"],
    companyTags: ["Amazon", "Oracle", "Goldman Sachs"],
    sampleAnswer: "Atomicity (transaction fully completes or fully rolls back), Consistency (DB moves between valid states adhering to schema rules), Isolation (concurrent transactions don't interfere), Durability (committed changes persist even after a crash via WAL).",
    hints: ["Break down A, C, I, D using a bank fund transfer example."],
    isCodingProblem: false
  },
  {
    title: "Difference between clustered and non-clustered index",
    category: "DBMS",
    difficulty: "Medium",
    tags: ["indexing", "performance"],
    companyTags: ["Microsoft", "Amazon"],
    sampleAnswer: "Clustered index physically orders table rows by the index key (one per table, usually primary key); non-clustered index is a separate B+ tree structure with pointers (row locators) back to the actual table rows (can have many per table).",
    hints: ["Think of a telephone directory (clustered by name) vs book index at the back (non-clustered)."],
    isCodingProblem: false
  },
  {
    title: "Explain database normalization (1NF, 2NF, 3NF, BCNF)",
    category: "DBMS",
    difficulty: "Medium",
    tags: ["theory", "normalization"],
    companyTags: ["Oracle", "Infosys"],
    sampleAnswer: "1NF: atomic column values, no repeating groups. 2NF: 1NF + no partial dependency on a composite primary key. 3NF: 2NF + no transitive dependency between non-key attributes. BCNF: for every functional dependency X -> Y, X must be a super key.",
    hints: ["1NF: Atomicity; 2NF: Full key dependency; 3NF: No non-key to non-key dependencies."],
    isCodingProblem: false
  },
  {
    title: "SQL vs NoSQL: When to choose which?",
    category: "DBMS",
    difficulty: "Easy",
    tags: ["sql", "nosql", "architecture"],
    companyTags: ["Amazon", "Google", "Uber"],
    sampleAnswer: "SQL (relational, ACID, structured schema, strong consistency, horizontal scaling is hard — e.g. financial transactions). NoSQL (document/key-value, dynamic schema, horizontal sharding, high write throughput, BASE/eventual consistency — e.g. social feeds, real-time analytics).",
    hints: ["Compare schema rigidity, transaction guarantees (ACID vs BASE), and scaling model (vertical vs horizontal)."],
    isCodingProblem: false
  },
  {
    title: "Explain Database Sharding and Partitioning",
    category: "DBMS",
    difficulty: "Medium",
    tags: ["scaling", "sharding"],
    companyTags: ["Meta", "Uber", "Amazon"],
    sampleAnswer: "Partitioning splits a large table within a single database server (range, list, hash). Sharding distributes partitions horizontally across multiple physical database instances using a shard key to balance I/O and storage.",
    hints: ["Partitioning = single machine; Sharding = multi-machine horizontal distribution."],
    isCodingProblem: false
  },
  {
    title: "What is Database Connection Pooling and why is it needed?",
    category: "DBMS",
    difficulty: "Medium",
    tags: ["performance", "concurrency"],
    companyTags: ["Swiggy", "Zomato", "Stripe"],
    sampleAnswer: "Creating a DB connection involves TCP/TLS handshakes and memory allocation overhead. A connection pool maintains a cache of pre-established active connections reused across concurrent requests, preventing socket exhaustion and reducing latency.",
    hints: ["Discuss connection creation overhead (TCP/TLS/Auth) and how pooling caps max concurrent active connections."],
    isCodingProblem: false
  },

  // --- OS Questions ---
  {
    title: "What is a deadlock and its 4 necessary conditions?",
    category: "OS",
    difficulty: "Medium",
    tags: ["concurrency", "deadlock"],
    companyTags: ["Microsoft", "Google"],
    sampleAnswer: "A deadlock is a cycle of processes each waiting on a resource held by another. Requires 4 Coffman conditions simultaneously: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.",
    hints: ["Remember the Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait."],
    isCodingProblem: false
  },
  {
    title: "Difference between process and thread",
    category: "OS",
    difficulty: "Easy",
    tags: ["theory", "concurrency"],
    companyTags: ["Amazon", "Apple"],
    sampleAnswer: "A process has its own separate virtual address space and isolated memory; threads are lightweight execution paths within a process that share code, data, heap, and open file descriptors, making thread context-switching much cheaper.",
    hints: ["Compare address space isolation, context-switching overhead, and communication mechanisms (IPC vs shared memory)."],
    isCodingProblem: false
  },
  {
    title: "Explain paging, segmentation, and virtual memory",
    category: "OS",
    difficulty: "Medium",
    tags: ["memory-management"],
    companyTags: ["Intel", "Qualcomm", "Microsoft"],
    sampleAnswer: "Virtual memory gives programs the illusion of large contiguous memory using MMU translation. Paging divides memory into fixed-size frames (eliminating external fragmentation), while segmentation divides memory into variable logical segments.",
    hints: ["Explain MMU page table lookup, page faults, and fixed pages vs variable segments."],
    isCodingProblem: false
  },
  {
    title: "Mutex vs Semaphore: Key differences",
    category: "OS",
    difficulty: "Medium",
    tags: ["concurrency", "synchronization"],
    companyTags: ["Microsoft", "Amazon"],
    sampleAnswer: "Mutex is a locking mechanism owned by a single thread (only the owner can unlock). Semaphore is a signaling mechanism with an integer counter (can be signaled by other threads to allow N concurrent accesses).",
    hints: ["Mutex = ownership & mutual exclusion (binary); Semaphore = signaling & counting."],
    isCodingProblem: false
  },

  // --- Computer Networks Questions ---
  {
    title: "TCP vs UDP",
    category: "Computer Networks",
    difficulty: "Easy",
    tags: ["protocols", "transport-layer"],
    companyTags: ["Cisco", "Amazon"],
    sampleAnswer: "TCP is connection-oriented, reliable, ordered, with flow/congestion control (3-way handshake); UDP is connectionless, unreliable, unordered with minimal overhead — ideal for gaming, DNS, and live streaming.",
    hints: ["Compare 3-way handshake, reliability, retransmissions, and latency."],
    isCodingProblem: false
  },
  {
    title: "What happens when you type a URL and press Enter?",
    category: "Computer Networks",
    difficulty: "Medium",
    tags: ["web-protocols", "dns", "http"],
    companyTags: ["Google", "Amazon", "Meta"],
    sampleAnswer: "1) Browser cache & DNS resolution to IP, 2) TCP 3-way handshake, 3) TLS/SSL negotiation, 4) HTTP GET request sent, 5) Server processes & returns HTTP response, 6) Browser parses HTML/CSS/JS and paints DOM tree.",
    hints: ["Trace chronologically: DNS -> TCP SYN/ACK -> TLS -> HTTP Request -> Server Handler -> DOM Rendering."],
    isCodingProblem: false
  },
  {
    title: "HTTP/1.1 vs HTTP/2 vs HTTP/3",
    category: "Computer Networks",
    difficulty: "Medium",
    tags: ["http", "performance"],
    companyTags: ["Cloudflare", "Netflix", "Google"],
    sampleAnswer: "HTTP/1.1 uses plaintext with head-of-line blocking per connection. HTTP/2 introduced binary framing, header compression (HPACK), and multiplexing over single TCP connection. HTTP/3 moves from TCP to QUIC (UDP-based) to solve TCP-level head-of-line blocking.",
    hints: ["Explain multiplexing in HTTP/2 and QUIC / UDP in HTTP/3."],
    isCodingProblem: false
  },
  {
    title: "WebSockets vs Server-Sent Events (SSE) vs Polling",
    category: "Computer Networks",
    difficulty: "Medium",
    tags: ["realtime", "websockets"],
    companyTags: ["Uber", "Swiggy", "Slack"],
    sampleAnswer: "Polling repeatedly sends HTTP requests (high overhead). SSE provides unidirectional persistent HTTP stream from server to client (lightweight, reconnection built-in). WebSockets provide full-duplex, bidirectional TCP connection for low-latency interactive communication.",
    hints: ["Compare bidirectional (WebSockets) vs unidirectional (SSE) vs periodic requests (Polling)."],
    isCodingProblem: false
  },

  // --- System Design Questions ---
  {
    title: "Design a URL shortener (e.g. TinyURL)",
    category: "System Design",
    difficulty: "Medium",
    tags: ["system-design", "hashing"],
    companyTags: ["Amazon", "Google", "Twitter"],
    sampleAnswer: "High-level components: Base62 encoding of counter ID / hash, Key-Value store (shortCode -> longURL), Redis cache for hot URLs, API gateway with rate limiting, and HTTP 301 vs 302 redirects.",
    hints: ["Estimate traffic (e.g. 100:1 read to write ratio), discuss Base62 vs MD5 hash collisions, and Redis caching."],
    isCodingProblem: false
  },
  {
    title: "Design a Rate Limiter",
    category: "System Design",
    difficulty: "Medium",
    tags: ["system-design", "algorithms"],
    companyTags: ["Google", "Stripe", "Uber"],
    sampleAnswer: "Algorithms: Token Bucket, Leaky Bucket, Sliding Window Log, Sliding Window Counter. Distributed implementation: Redis with atomic Lua scripts checking requests within TTL key window to prevent race conditions.",
    hints: ["Compare Token Bucket vs Sliding Window Counter; discuss Redis atomic Lua scripts for distributed systems."],
    isCodingProblem: false
  },
  {
    title: "Basics of horizontal vs vertical scaling",
    category: "System Design",
    difficulty: "Easy",
    tags: ["scaling", "architecture"],
    companyTags: ["Amazon", "Flipkart"],
    sampleAnswer: "Vertical scaling (scaling up) adds CPU/RAM to single server (simple, but hard hardware limit and single point of failure). Horizontal scaling (scaling out) adds more machines with load balancers and stateless services (fault tolerant, infinite scale, but adds distributed complexity).",
    hints: ["Scale up vs scale out, load balancing, stateless app tiers, and database sharding."],
    isCodingProblem: false
  },
  {
    title: "Design a Distributed Cache (like Redis)",
    category: "System Design",
    difficulty: "Hard",
    tags: ["system-design", "caching"],
    companyTags: ["Meta", "Amazon", "Redis Labs"],
    sampleAnswer: "Key components: Consistent Hashing for cluster node key distribution, in-memory hash table, eviction policies (LRU/LFU), master-replica replication, and Write-Through / Write-Back caching strategies.",
    hints: ["Discuss Consistent Hashing with virtual nodes to minimize rebalancing during node churn."],
    isCodingProblem: false
  },

  // --- HR & Behavioral Questions ---
  {
    title: "Tell me about yourself",
    category: "HR/Behavioral",
    difficulty: "Easy",
    tags: ["behavioral", "intro"],
    companyTags: ["Amazon", "Google", "Microsoft"],
    sampleAnswer: "Structure using Present-Past-Future: brief technical identity & current education/role, 1-2 impactful projects/internships showing problem solving, and why you are excited about this specific engineering position.",
    hints: ["Keep it under 90 seconds. Focus on technical impact, projects, and enthusiasm."],
    isCodingProblem: false
  },
  {
    title: "Tell me about a time you faced a conflict in a team",
    category: "HR/Behavioral",
    difficulty: "Medium",
    tags: ["behavioral", "star-method"],
    companyTags: ["Amazon", "Meta"],
    sampleAnswer: "Use STAR: Situation (context of disagreement, e.g. architectural choice), Task (delivering project on deadline), Action (facilitated technical benchmark discussion, listened, proposed data-driven compromise), Result (shipped on time with team alignment).",
    hints: ["Focus on empathy, data-driven decisions, and positive collaborative outcomes."],
    isCodingProblem: false
  },
  {
    title: "Why do you want to work here?",
    category: "HR/Behavioral",
    difficulty: "Easy",
    tags: ["behavioral"],
    companyTags: ["Google", "Amazon", "Microsoft"],
    sampleAnswer: "Connect the company's specific product/mission/tech stack to your own engineering interests with concrete examples — avoid generic fluff like 'great culture' without specifics.",
    hints: ["Mention a specific product feature, open source library, or engineering engineering challenge the company solves."],
    isCodingProblem: false
  },
  {
    title: "Describe a challenging bug you fixed",
    category: "HR/Behavioral",
    difficulty: "Medium",
    tags: ["behavioral", "star-method"],
    companyTags: ["Amazon", "Google", "Adobe"],
    sampleAnswer: "STAR format: describe the bug's severity and impact, systematic debugging strategy (logs, profiling, reproducing in isolation), the root cause discovered, the fix, and regression tests added to prevent recurrence.",
    hints: ["Emphasize methodical investigation (profiler, binary search, logs) rather than guessing."],
    isCodingProblem: false
  },
  {
    title: "Where do you see yourself in 5 years?",
    category: "HR/Behavioral",
    difficulty: "Easy",
    tags: ["behavioral"],
    companyTags: ["Microsoft", "TCS"],
    sampleAnswer: "Express ambition for technical depth and architectural ownership: mastering scalable systems, mentoring junior engineers, and taking on complex technical leadership initiatives.",
    hints: ["Focus on technical mastery, increasing scope of impact, and leadership rather than specific job titles."],
    isCodingProblem: false
  },
  {
    title: "Why should we hire you?",
    category: "HR/Behavioral",
    difficulty: "Medium",
    tags: ["behavioral"],
    companyTags: ["Amazon", "Google"],
    sampleAnswer: "Map 2-3 of your verified technical strengths (e.g. full-stack problem solving, algorithmic rigor, ownership mindset) directly to the team's needs, backed by project evidence.",
    hints: ["Provide concrete project examples demonstrating quick learning and high ownership."],
    isCodingProblem: false
  }
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('[Seed Error] MONGODB_URI is not set in environment variables.');
    process.exit(1);
  }

  try {
    console.log('[Seed] Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('[Seed] Connected successfully.');

    let insertedCount = 0;

    for (const q of seedData) {
      const result = await Question.findOneAndUpdate(
        { title: q.title },
        { $set: q },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      if (result) {
        insertedCount++;
      }
    }

    const totalCount = await Question.countDocuments();
    const codingCount = await Question.countDocuments({ isCodingProblem: true });

    console.log(`[Seed Complete] Successfully synced ${insertedCount} questions.`);
    console.log(`Total Questions in DB: ${totalCount} (Coding Challenges: ${codingCount})`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    process.exit(1);
  }
}

seed();
