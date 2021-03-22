export function findNextFalsey(index: number, list: boolean[]): number {
  if (list[index]) {
    return findNextFalsey(index + 1, list);
  } else {
    return index + 1;
  }
}
