let id = 0;
export function useId(prefix = null) {
  return [prefix, ++id].filter(Boolean).join('-');
}
