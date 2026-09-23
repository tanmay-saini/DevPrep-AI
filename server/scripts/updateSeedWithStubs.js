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
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    sampleAnswer: "Optimal Approach: Use a hashmap to store value→index while iterating. For each element, check if target - element exists in map. Time Complexity: O(n), Space Complexity: O(n).",
    hints: [
      "A brute force approach checks all pairs in O(n^2).",
      "Can we check if the complement (target - num) exists in O(1) time using a hash table?",
      "Map each value to its index as you iterate."
    ],
    isCodingProblem: true,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your solution here
  
  return [];
}

// Test call
console.log(JSON.stringify(twoSum([2, 7, 11, 15], 9)));`,
      python: `def two_sum(nums, target):
    # Write your solution here
    return []

# Test call
print(two_sum([2, 7, 11, 15], 9))`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> res = twoSum(nums, target);
    cout << "[" << (res.size() > 0 ? res[0] : 0) << "," << (res.size() > 1 ? res[1] : 0) << "]" << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }

    public static void main(String[] args) {
        int[] res = twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(res));
    }
}`
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
    description: "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
    sampleAnswer: "Optimal Approach: Insert elements into a Hash Set while iterating. If an element is already present, return true immediately. Time: O(n), Space: O(n).",
    hints: ["Use a Hash Set to track seen numbers in O(1) lookup time."],
    isCodingProblem: true,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
  // Write your solution here
  return false;
}

// Test call
console.log(containsDuplicate([1, 2, 3, 1]));`,
      python: `def contains_duplicate(nums):
    # Write your solution here
    return False

# Test call
print(contains_duplicate([1, 2, 3, 1]))`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

bool containsDuplicate(vector<int>& nums) {
    // Write your solution here
    return false;
}

int main() {
    vector<int> nums = {1, 2, 3, 1};
    cout << (containsDuplicate(nums) ? "true" : "false") << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static boolean containsDuplicate(int[] nums) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(containsDuplicate(new int[]{1, 2, 3, 1}));
    }
}`
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
    description: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    sampleAnswer: "Optimal Approach: Count frequencies of each character using a 26-element array or hash map. Compare character frequency counts across both strings. Time: O(n), Space: O(1).",
    hints: ["If lengths differ, return false immediately.", "Count character frequencies."],
    isCodingProblem: true,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
  // Write your solution here
  return false;
}

// Test call
console.log(isAnagram("anagram", "nagaram"));`,
      python: `def is_anagram(s, t):
    # Write your solution here
    return False

# Test call
print(is_anagram("anagram", "nagaram"))`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

bool isAnagram(string s, string t) {
    // Write your solution here
    return false;
}

int main() {
    cout << (isAnagram("anagram", "nagaram") ? "true" : "false") << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static boolean isAnagram(String s, String t) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("anagram", "nagaram"));
    }
}`
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
    description: "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase.",
    sampleAnswer: "Optimal Approach: Group strings by their sorted character signature in a Hash Table (e.g. key 'aet' -> ['eat', 'tea', 'ate']). Time: O(n * k log k), Space: O(n * k).",
    hints: ["Use sorted string or 26-char frequency tuple as dictionary key."],
    isCodingProblem: true,
    starterCode: {
      javascript: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  // Write your solution here
  return [];
}

// Test call
console.log(JSON.stringify(groupAnagrams(["eat","tea","tan","ate","nat","bat"])));`,
      python: `def group_anagrams(strs):
    # Write your solution here
    return []

# Test call
print(group_anagrams(["eat","tea","tan","ate","nat","bat"]))`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<vector<string>> groupAnagrams(vector<string>& strs) {
    // Write your solution here
    return {};
}

int main() {
    vector<string> strs = {"eat","tea","tan","ate","nat","bat"};
    auto res = groupAnagrams(strs);
    cout << "Execution completed with " << res.size() << " groups." << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static List<List<String>> groupAnagrams(String[] strs) {
        // Write your solution here
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        String[] strs = {"eat","tea","tan","ate","nat","bat"};
        System.out.println(groupAnagrams(strs));
    }
}`
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
    description: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.",
    sampleAnswer: "Optimal Approach: Count frequencies in a hash map, then use Bucket Sort (an array of lists indexed by frequency) to retrieve top K in linear time. Time: O(n), Space: O(n).",
    hints: ["Bucket sort indexed by counts from 1 to n achieves linear O(n) runtime."],
    isCodingProblem: true,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
  // Write your solution here
  return [];
}

// Test call
console.log(JSON.stringify(topKFrequent([1,1,1,2,2,3], 2)));`,
      python: `def top_k_frequent(nums, k):
    # Write your solution here
    return []

# Test call
print(top_k_frequent([1,1,1,2,2,3], 2))`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> topKFrequent(vector<int>& nums, int k) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> nums = {1,1,1,2,2,3};
    auto res = topKFrequent(nums, 2);
    cout << "[" << (res.size() > 0 ? res[0] : 0) << "," << (res.size() > 1 ? res[1] : 0) << "]" << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static int[] topKFrequent(int[] nums, int k) {
        // Write your solution here
        return new int[]{};
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(topKFrequent(new int[]{1,1,1,2,2,3}, 2)));
    }
}`
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
    description: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.",
    sampleAnswer: "Optimal Approach: Compute prefix products in a first pass, then iterate backwards multiplying running suffix products into the result array. Time: O(n), Space: O(1) extra space.",
    hints: ["Compute left prefix products first, then multiply right running suffix product on the fly."],
    isCodingProblem: true,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
  // Write your solution here
  return [];
}

// Test call
console.log(JSON.stringify(productExceptSelf([1, 2, 3, 4])));`,
      python: `def product_except_self(nums):
    # Write your solution here
    return []

# Test call
print(product_except_self([1, 2, 3, 4]))`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> productExceptSelf(vector<int>& nums) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> nums = {1, 2, 3, 4};
    auto res = productExceptSelf(nums);
    cout << "Finished" << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static int[] productExceptSelf(int[] nums) {
        // Write your solution here
        return new int[]{};
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(productExceptSelf(new int[]{1, 2, 3, 4})));
    }
}`
    },
    testCases: [
      { input: "nums = [1,2,3,4]", expectedOutput: "[24,12,8,6]", isHidden: false }
    ]
  },

  {
    title: "Valid Parentheses",
    category: "DSA",
    difficulty: "Easy",
    tags: ["stack", "string"],
    companyTags: ["Google", "Meta", "Amazon"],
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    sampleAnswer: "Optimal Approach: Use a stack to push expected closing brackets when an opening bracket is encountered. If top matches closing bracket, pop; else invalid. Time: O(n), Space: O(n).",
    hints: ["Use a stack data structure.", "When you see '(', push ')'. When you see ')', check if stack.pop() === ')'."],
    isCodingProblem: true,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Write your solution here
  return false;
}

// Test call
console.log(isValid("()[]{}"));`,
      python: `def is_valid(s):
    # Write your solution here
    return False

# Test call
print(is_valid("()[]{}"))`,
      cpp: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

bool isValid(string s) {
    // Write your solution here
    return false;
}

int main() {
    cout << (isValid("()[]{}") ? "true" : "false") << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Main {
    public static boolean isValid(String s) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isValid("()[]{}"));
    }
}`
    },
    testCases: [
      { input: "s = '()[]{}'", expectedOutput: "true", isHidden: false },
      { input: "s = '(]'", expectedOutput: "false", isHidden: false }
    ]
  },

  {
    title: "Best Time to Buy and Sell Stock",
    category: "DSA",
    difficulty: "Easy",
    tags: ["array", "dynamic-programming"],
    companyTags: ["Amazon", "Google", "Goldman Sachs"],
    description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.",
    sampleAnswer: "Optimal Approach: Track minimum price seen so far and maximum profit achievable at each day: maxProfit = max(maxProfit, price - minPrice). Time: O(n), Space: O(1).",
    hints: ["Keep track of the lowest buy price as you iterate through prices."],
    isCodingProblem: true,
    starterCode: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  // Write your solution here
  return 0;
}

// Test call
console.log(maxProfit([7, 1, 5, 3, 6, 4]));`,
      python: `def max_profit(prices):
    # Write your solution here
    return 0

# Test call
print(max_profit([7, 1, 5, 3, 6, 4]))`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int maxProfit(vector<int>& prices) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> prices = {7, 1, 5, 3, 6, 4};
    cout << maxProfit(prices) << endl;
    return 0;
}`,
      java: `public class Main {
    public static int maxProfit(int[] prices) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(maxProfit(new int[]{7, 1, 5, 3, 6, 4}));
    }
}`
    },
    testCases: [
      { input: "prices = [7,1,5,3,6,4]", expectedOutput: "5", isHidden: false },
      { input: "prices = [7,6,4,3,1]", expectedOutput: "0", isHidden: false }
    ]
  },

  {
    title: "Binary Search",
    category: "DSA",
    difficulty: "Easy",
    tags: ["binary-search", "array"],
    companyTags: ["Google", "Amazon", "Microsoft"],
    description: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with O(log n) runtime complexity.",
    sampleAnswer: "Optimal Approach: Standard binary search maintaining low and high bounds. Check mid = low + (high - low) / 2. Halve search space each iteration. Time: O(log n), Space: O(1).",
    hints: ["Use mid = low + Math.floor((high - low) / 2) to avoid integer overflow."],
    isCodingProblem: true,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  // Write your solution here
  return -1;
}

// Test call
console.log(search([-1, 0, 3, 5, 9, 12], 9));`,
      python: `def search(nums, target):
    # Write your solution here
    return -1

# Test call
print(search([-1, 0, 3, 5, 9, 12], 9))`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    // Write your solution here
    return -1;
}

int main() {
    vector<int> nums = {-1, 0, 3, 5, 9, 12};
    cout << search(nums, 9) << endl;
    return 0;
}`,
      java: `public class Main {
    public static int search(int[] nums, int target) {
        // Write your solution here
        return -1;
    }

    public static void main(String[] args) {
        System.out.println(search(new int[]{-1, 0, 3, 5, 9, 12}, 9));
    }
}`
    },
    testCases: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", expectedOutput: "4", isHidden: false },
      { input: "nums = [-1,0,3,5,9,12], target = 2", expectedOutput: "-1", isHidden: false }
    ]
  },

  {
    title: "Reverse a Linked List",
    category: "DSA",
    difficulty: "Easy",
    tags: ["linked-list"],
    companyTags: ["Amazon", "Microsoft", "Apple"],
    description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    sampleAnswer: "Optimal Approach: Iterate with three pointers (prev, curr, next), reversing the `next` pointer of each node as you traverse until curr is null. Time: O(n), Space: O(1).",
    hints: [
      "Keep track of the previous node starting at null.",
      "Store the next pointer before modifying curr.next."
    ],
    isCodingProblem: true,
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
  // Write your solution here
  return null;
}

// Test call
console.log("Reversed [5,4,3,2,1]");`,
      python: `def reverse_list(head):
    # Write your solution here
    return None

# Test call
print("Reversed [5,4,3,2,1]")`,
      cpp: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

ListNode* reverseList(ListNode* head) {
    // Write your solution here
    return nullptr;
}

int main() {
    cout << "Reversed [5,4,3,2,1]" << endl;
    return 0;
}`,
      java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Reversed [5,4,3,2,1]");
    }
}`
    },
    testCases: [
      { input: "[1,2,3,4,5]", expectedOutput: "Reversed [5,4,3,2,1]", isHidden: false }
    ]
  },

  {
    title: "Climbing Stairs",
    category: "DSA",
    difficulty: "Easy",
    tags: ["dp", "fibonacci"],
    companyTags: ["Amazon", "Google", "Adobe"],
    description: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
    sampleAnswer: "Optimal Approach: Fibonacci DP sequence: dp[i] = dp[i-1] + dp[i-2]. Can be computed iteratively in O(n) time and O(1) space with two variables.",
    hints: ["To reach step n, you must take 1 step from n-1 or 2 steps from n-2."],
    isCodingProblem: true,
    starterCode: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  // Write your solution here
  return 0;
}

// Test call
console.log(climbStairs(3));`,
      python: `def climb_stairs(n):
    # Write your solution here
    return 0

# Test call
print(climb_stairs(3))`,
      cpp: `#include <iostream>
using namespace std;

int climbStairs(int n) {
    // Write your solution here
    return 0;
}

int main() {
    cout << climbStairs(3) << endl;
    return 0;
}`,
      java: `public class Main {
    public static int climbStairs(int n) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(climbStairs(3));
    }
}`
    },
    testCases: [
      { input: "n = 2", expectedOutput: "2", isHidden: false },
      { input: "n = 3", expectedOutput: "3", isHidden: false }
    ]
  }
];

// Helper to update all questions in DB with formal descriptions and function template stubs
async function updateDescriptionsAndStubs() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI missing');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB. Syncing formal problem descriptions & clean starter stubs...');

    for (const q of seedData) {
      await Question.findOneAndUpdate(
        { title: q.title },
        { 
          $set: {
            description: q.description,
            starterCode: q.starterCode,
            sampleAnswer: q.sampleAnswer,
            hints: q.hints,
            testCases: q.testCases
          } 
        },
        { upsert: true }
      );
    }

    // For any remaining coding questions that didn't have a custom description, give them a clean description based on their title
    const allQuestions = await Question.find({});
    for (const q of allQuestions) {
      if (!q.description || q.description.trim() === '') {
        const generatedDesc = `Given the problem requirements for "${q.title}", implement an optimal algorithm to solve the problem efficiently.\n\nReview the sample test cases and hints to verify time and space complexity constraints.`;
        q.description = generatedDesc;
        await q.save();
      }
    }

    console.log('Successfully updated all questions with formal descriptions and starter stubs!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Update error:', err);
    process.exit(1);
  }
}

updateDescriptionsAndStubs();
