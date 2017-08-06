/**
 * redux-reducers
 * @author Arekkusuva <arekkusuchar@gmail.com>
 * @flow
 */

import { getActionCreatorName } from './helpers';


/**
 * createReducer
 * @description Create reducer, actionTypes and actionCreators.
 * @example
 *  export default createReducer(
 *    'user',
 *    { email: '' },
 *    {
 *      'SET_EMAIL': (state, payload) => {
 *         // Your logic here...
 *         return { ...state, email: payload.email }
 *       },
 *       'SAVE': null,
 *       ...etc.
 *    }
 *  );
 * @param reducerName - Must begin with a lowercase character.
 * @param initialState {Object}
 * @param configData {Object} - { 'ACTION_TYPE_NAME': Function or null }
 * @returns {{ actionTypes: Object, actionCreators: Object, reducer: Function }}
 */
export const createReducer = (reducerName: string, initialState?: Object = {}, configData?: Object = {}) => {
  const actionTypes: Object = {};
  const actionCreator = (actionTypeName, payload) => ({ type: actionTypeName, payload });
  const setterActionName: string = `set${reducerName.charAt(0).toUpperCase()}${reducerName.slice(1)}`;
  const setterActionCreatorName = `${reducerName}/${setterActionName}`;
  const actionCreators: Object = {
    [setterActionName]: payload => actionCreator(setterActionCreatorName, payload),
  };
  const tmpActionTypesHandlers: Object = {};


  Object.keys(configData).forEach((actionType) => {
    const actionCreatorName: string = getActionCreatorName(actionType);
    if (setterActionName !== actionCreatorName) {
      const actionTypeName = `${reducerName}/${actionCreatorName}`;
      if (typeof configData[actionType] === 'function') {
        tmpActionTypesHandlers[actionTypeName] = configData[actionType];
      }
      actionTypes[actionType] = actionTypeName;
      actionCreators[actionCreatorName] =
        payload => actionCreator(actionTypeName, payload);
    }
  });
  const reducer: Function = (state?: Object = initialState, action: Object) => {
    const tmpActionTypeHandler = tmpActionTypesHandlers[action.type];
    if (typeof tmpActionTypeHandler === 'function') {
      return () => tmpActionTypeHandler(state, action.payload);
    }
    if (action.type === setterActionCreatorName) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  };

  return {
    reducerName,
    actionTypes,
    actionCreators,
    reducer,
  };
};

/**
 * combine
 * @description Combine reducers created by this library.
 * @param combiner {Function}
 * @param reducers {Array}
 * @returns {*}
 */
export const combine = (combiner: Function, reducersList: ?Array<Object>) => {
  const reducers: Object = {};
  reducersList.forEach((item) => {
    if (item.reducer) reducers[item.reducerName] = item.reducer;
  });
  return combiner(reducers);
};
