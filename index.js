/**
 * redux-reducers
 * @author Arekkusuva <arekkusuchar@gmail.com>
 * powered by
 * @flow
 */

import { getActionCreatorName } from './helpers';

export const createReducer = (storeName: string = 'state', configData?: Object = {}) => {
  const actionTypes: Object = {};
  const actionCreators: Object = {};
  const tmpActionTypesHandlers: Object = {};


  Object.keys(configData).forEach((actionType) => {
    const actionCreatorName: string = getActionCreatorName(actionType);
    const actionTypeName = `${storeName}/${actionCreatorName}`;
    if (typeof configData[actionType] === 'function') {
      tmpActionTypesHandlers[actionTypeName] = configData[actionType];
    }
    actionTypes[actionType] = actionTypeName;
    actionCreators[getActionCreatorName(actionType)] =
        payload => ({ type: actionTypeName, payload });
  });
  const reducer: Function = (state?: Object = {}, action: Object) => {
    const tmpActionTypeHandler = tmpActionTypesHandlers[action.type];
    if (typeof tmpActionTypeHandler === 'function') {
      return () => tmpActionTypeHandler(state, action.payload);
    }
    return {
      ...state,
      ...action.payload,
    };
  };

  return {
    actionTypes,
    actionCreators,
    reducer,
  };
};
