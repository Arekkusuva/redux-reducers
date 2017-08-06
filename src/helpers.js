/**
 * redux-reducers helpers.js
 * @author Arekkusuva <arekkusuchar@gmail.com>
 * @flow
 */


/**
 * getActionCreatorName
 * @description Get actionCreator name.
 * @param actionType {string} - Action type.
 * @returns {string}
 */
export const getActionCreatorName = (actionType: string) => {
  let actionCreatorName: string = '';
  const tmpArray: Array = `${actionType}`.split('_');
  tmpArray.forEach((word, index) => {
    if (index === 0) actionCreatorName += word.toLowerCase();
    else actionCreatorName += `${word.charAt(0)}${word.slice(1).toLowerCase()}`;
  });
  return actionCreatorName;
};
