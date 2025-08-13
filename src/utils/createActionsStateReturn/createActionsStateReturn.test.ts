import { createActionsStateReturn } from './createActionsStateReturn';

describe('createActionsStateReturn', () => {
  it('returns provided actions and state as-is', () => {
    const actions = { doSomething: jest.fn() };
    const state = { count: 42 };

    const result = createActionsStateReturn(actions, state);

    expect(result.actions).toBe(actions);
    expect(result.state).toBe(state);
  });

  it('returns empty object for missing actions', () => {
    const state = { ready: true };

    const result = createActionsStateReturn(undefined, state);

    expect(result.actions).toEqual({});
    expect(result.state).toBe(state);
  });

  it('returns empty object for missing state', () => {
    const actions = { toggle: jest.fn() };

    const result = createActionsStateReturn(actions, undefined);

    expect(result.actions).toBe(actions);
    expect(result.state).toEqual({});
  });

  it('returns empty objects when both are missing', () => {
    const result = createActionsStateReturn(undefined, undefined);

    expect(result.actions).toEqual({});
    expect(result.state).toEqual({});
  });

  it('preserves function references in actions', () => {
    const fn = jest.fn();
    const actions = { run: fn };

    const result = createActionsStateReturn(actions, {});

    expect(result.actions.run).toBe(fn);
  });

  it('works with nested objects', () => {
    const actions = { user: { login: jest.fn() } };
    const state = { user: { name: 'Pedro' } };

    const result = createActionsStateReturn(actions, state);

    expect(result.actions.user.login).toBe(actions.user.login);
    expect(result.state.user.name).toBe('Pedro');
  });

  it('infers correct types with generics', () => {
    type Actions = { setName: (name: string) => void };
    type State = { name: string };

    const actions: Actions = {
      setName: (_name) => {},
    };
    const state: State = { name: 'Pedro' };

    const result = createActionsStateReturn<Actions, State>(actions, state);

    expect(result.actions.setName).toBeDefined();
    expect(result.state.name).toBe('Pedro');
  });
});
