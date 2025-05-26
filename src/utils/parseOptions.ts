export function extractUniqueOptions<T>(data: T[], key: keyof T): string[] {
  return Array.from(new Set(data.map((item) => item[key]) as string[]));
}
