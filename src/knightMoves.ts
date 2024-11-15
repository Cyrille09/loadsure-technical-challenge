type Keypad = string[][];

// Keypad structure
const keypad: Keypad = [
  ["A", "B", "C", "D", "E"],
  ["F", "G", "H", "I", "J"],
  ["K", "L", "M", "N", "O"],
  ["1", "2", "3", ""],
];

// Knight moves: two steps in one direction and one step in another
const knightMoves = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

// Set of vowels
const vowels = new Set(["A", "E", "I", "O"]);

// Helper function to check if a position is valid on the keypad
function isValidPosition(x: number, y: number): boolean {
  return (
    x >= 0 &&
    x < keypad.length &&
    y >= 0 &&
    y < keypad[x].length &&
    keypad[x][y] !== ""
  );
}

// Cache results for memoization to optimize performance.
const memo: Map<string, number> = new Map();

// Recursive function to count valid sequences.
function countSequences(
  x: number,
  y: number,
  length: number,
  vowelCount: number
): number {
  if (length === 10) return 1; // Base case: reached 10 keys, count as a valid sequence.

  const key = `${x},${y},${length},${vowelCount}`;
  if (memo.has(key)) return memo.get(key)!;

  let count = 0;
  for (const [dx, dy] of knightMoves) {
    const nx = x + dx;
    const ny = y + dy;

    if (isValidPosition(nx, ny)) {
      const nextKey = keypad[nx][ny];
      const isVowel = vowels.has(nextKey);
      const newVowelCount = vowelCount + (isVowel ? 1 : 0);

      if (newVowelCount <= 2) {
        count += countSequences(nx, ny, length + 1, newVowelCount);
      }
    }
  }

  memo.set(key, count);
  return count;
}

// Main function to calculate the total number of valid 10-key sequences.
export function calculateTotalSequences(): number {
  let total = 0;

  // Start from each key on the keypad.
  for (let i = 0; i < keypad.length; i++) {
    for (let j = 0; j < keypad[i].length; j++) {
      if (keypad[i][j] !== "") {
        const initialVowelCount = vowels.has(keypad[i][j]) ? 1 : 0;
        total += countSequences(i, j, 1, initialVowelCount);
      }
    }
  }

  return total;
}
