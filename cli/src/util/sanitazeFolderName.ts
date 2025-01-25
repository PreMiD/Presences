export function sanitazeFolderName(name: string) {
  return name.replace('!', ' ').trim()
}
