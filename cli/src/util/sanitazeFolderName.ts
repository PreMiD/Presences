export function sanitazeFolderName(name: string) {
  return name
    //* Remove ! and replace with space
    .replace('!', ' ')
    //* Remove double spaces
    .replace(/\s+/g, ' ')
    //* Trim
    .trim()
}
