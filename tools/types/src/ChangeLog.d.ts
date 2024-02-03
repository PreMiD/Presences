export type ChangeLogChangeType = "feat" | "fix" | "chore" | "docs" | "style" | "refactor" | "perf" | "test" | "revert";
export type ChangeLogChangeText = `${ChangeLogChangeType}: ${string}`;
