/**
 * redux-reducers
 * @author Arekkusuva <arekkusuchar@gmail.com>
 * powered by
 * @flow
 */

import { getActionCreatorName } from './helpers';


/**
 * createReducer
 * @description Create reducer, actionTypes and actionCreators.
 * @example
 *  const { actionTypes, actionCreators, reducer } = createReducer(
 *    'user',
 *    {
 *      'SET_EMAIL': (state, payload) => {
 *         // Your logic here...
 *         return { ...state, email: payload.email }
 *       },
 *       'SAVE': null,
 *       ...etc.
 *    }
 *  )
 * @param storeName - Must begin with a lowercase character.
 * @param configData {Object} - { 'ACTION_TYPE_NAME': Function or null }
 * @returns {{ actionTypes: Object, actionCreators: Object, reducer: Function }}
 */
export const createReducer = (storeName: string = 'state', configData?: Object = {}) => {
  const actionTypes: Object = {};
  const actionCreator = (actionTypeName, payload) => ({ type: actionTypeName, payload });
  const setterActionName: string = `set${storeName.charAt(0).toUpperCase()}${storeName.slice(1)}`;
  const setterActionCreatorName = `${storeName}/${setterActionName}`;
  const actionCreators: Object = {
    [setterActionName]: payload => actionCreator(setterActionCreatorName, payload),
  };
  const tmpActionTypesHandlers: Object = {};


  Object.keys(configData).forEach((actionType) => {
    const actionCreatorName: string = getActionCreatorName(actionType);
    if (setterActionName !== actionCreatorName) {
      const actionTypeName = `${storeName}/${actionCreatorName}`;
      if (typeof configData[actionType] === 'function') {
        tmpActionTypesHandlers[actionTypeName] = configData[actionType];
      }
      actionTypes[actionType] = actionTypeName;
      actionCreators[actionCreatorName] =
        payload => actionCreator(actionTypeName, payload);
    }
  });
  const reducer: Function = (state?: Object = {}, action: Object) => {
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
    actionTypes,
    actionCreators,
    reducer,
  };
};
