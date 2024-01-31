export type ChangeLogChangeType = "feature" | "fix" | "chore" | "docs" | "style" | "refactor" | "perfomance" | "test" | "revert";
export type ChangeLogChangeText = `${ChangeLogChangeType}: ${string}`;
