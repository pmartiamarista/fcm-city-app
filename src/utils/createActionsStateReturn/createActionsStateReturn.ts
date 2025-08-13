/**
 * Creates a standardized return structure for hooks or utilities,
 * ensuring consistent shape and type safety.
 *
 * @param actions - The actions to expose from the hook.
 * @param state - The state to expose from the hook.
 * @returns An object with `actions` and `state`, defaulting to empty objects if not provided.
 */
export const createActionsStateReturn = <A extends object, S extends object>(
  actions?: A,
  state?: S,
): { actions: A; state: S } => {
  return {
    actions: (actions ?? {}) as A,
    state: (state ?? {}) as S,
  };
};
