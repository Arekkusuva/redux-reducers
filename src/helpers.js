/**
 * redux-reducers helpers.js
 * @author Arekkusuva <vuraddo@yahoo.com>
 * @flow
 */


/**
 * Get action creator from name
 * @description Get actionCreator name.
 * @param actionType {string} - Action type.
 * @returns {string}
 */
export const getActionCreatorName = (actionType: string) => {
  let actionCreatorName: string = '';
  const tmpArray: Array<string> = `${actionType}`.split('_');
  tmpArray.forEach((word, index) => {
    if (index === 0) actionCreatorName += word.toLowerCase();
    else actionCreatorName += `${word.charAt(0)}${word.slice(1).toLowerCase()}`;
  });
  return actionCreatorName;
};

/**
 * Action creator
 * @param actionTypeName {string}
 * @param payload {Object}
 */
export const actionCreator = (actionTypeName: string, payload: Object) => ({ type: actionTypeName, payload });
