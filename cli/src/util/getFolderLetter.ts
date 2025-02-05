export function getFolderLetter(activity: string) {
  const firstLetter = activity.trim().charAt(0).toUpperCase()

  if (/[A-Z]/.test(firstLetter))
    return firstLetter
  if (/\d/.test(firstLetter))
    return '0-9'
  return '#'
}
