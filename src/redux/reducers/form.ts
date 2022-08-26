import * as dot from 'dot-wild';

export const PATCH_FORM = 'PATCH_FORM';
export const INIT_FORM = 'INIT_FORM';
export const TRASH_FORM = 'TRASH_FORM';
export function formReducer(state = {}, action) {
  switch (action.type) {
    case PATCH_FORM:
      return patchForm(action);
    case INIT_FORM:
      return initForm(action);
    case TRASH_FORM:
      return trashForm(action);
    default:
      return state;
  }
  function patchForm({ formId, key, value, _keys }) {
    let _s = {
      ...(state[formId] ?? {}),
    };
    return {
      ...state,
      [formId]: {
        ...dot.set(_s, key, value),
        _keys: _keys ?? _s._keys,
      },
    };
  }
  function initForm({ formId, type, ..._default }) {
    return {
      ...state,
      [formId]: state[formId] ?? _default ?? {},
    };
  }
  function trashForm({ formId }) {
    let _s = {
      ...(state ?? {}),
    };
    delete _s[formId];
    return _s;
  }
}
