export function getFolderLetter(activity: string) {
  const firstLetter = activity.trim().charAt(0)

  if (/[a-z]/i.test(firstLetter))
    return firstLetter
  if (/\d/.test(firstLetter))
    return '0-9'
  return '#'
}
