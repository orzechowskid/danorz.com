import {
  useEffect,
  useState
} from 'preact/hooks';
import createStore from 'unistore';

import * as types from '~/types.js';

import {
  mapObjectValues
} from '~/utils/helpers.js';

let store;

function selectPartialState(state, selectors) {
  return mapObjectValues(selectors, (sel) => sel(state));
}

function createGlobalState(initialState) {
  window.store = store = createStore(initialState);
}

/** @typedef {function(...):any} BoundActionCreator */

/**
 * @param {Object.<string,types.Selector<any>>} selectors
 * @return {Object}
 */
function useSelectors(selectors = {}) {
  const [ state, setState ] = useState(selectPartialState(store.getState(), selectors));

  useEffect(function onMount() {
    function listener(newState) {
      setState(selectPartialState(newState, selectors));
    }

    store.subscribe(listener);

    return function cleanup() {
      store.unsubscribe(listener);
    };
  }, []);

  return state;
}

/**
 * @param {Object.<string,types.ActionCreator<any>>} actionCreators
 */
function useActionCreators(actionCreators = {}) {
  return mapObjectValues(actionCreators, (a) => store.action(a));
}

export {
  createGlobalState,
  useActionCreators,
  useSelectors
};
