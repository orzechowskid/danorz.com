import {
  useEffect,
  useState
} from 'preact/hooks';
import createStore from 'unistore';

import {
  mapObjectValues
} from '../utils/helpers';

import * as types from '../types';

let store;

function selectPartialState(state, selectors) {
  return mapObjectValues(selectors, (sel) => sel(state));
}

function createGlobalState(initialState) {
  store = createStore(initialState);
}

/** @typedef {function(...):any} BoundActionCreator */

/**
 * @param {Object.<string,types.Selector<any>>} [selectors]
 * @param {Object.<string,types.ActionCreator<any>>} [actionCreators]
 * @return {[Object.<string,any>, Object.<string,BoundActionCreator>]} selected values, and bound action creators
 */
function useGlobalState(selectors = {}, actionCreators = {}) {
  const [ selectedState, setSelectedState ] = useState(selectPartialState(store.getState(), selectors));
  const boundActions = mapObjectValues(actionCreators, (a) => store.action(a));

  useEffect(() => {
    function listener(newState) {
      setSelectedState(selectPartialState(newState, selectors));
    }

    store.subscribe(listener);

    return () => store.unsubscribe(listener);
  }, []);

  return [ selectedState, boundActions ];
}

export {
  createGlobalState,
  useGlobalState
};
