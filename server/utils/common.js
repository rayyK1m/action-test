/**
 * key값이 매핑된 변수를 활용해  "inputObject" 에서 "outputObject"로 변환하는 함수
 *
 * @param {Object} inputObject 변환할 입력 객체입니다.
 * @param {Object} keyMap 키 매핑 객체로, 입력 키를 출력 키로 변환하는 데 사용됩니다.
 * @returns {Object} 변환된 출력 객체입니다.
 *
 * @example
 * const input = {
 *   inputKeyA: 'Value for A' || { ... },
 *   inputKeyB: 'Value for B' || { ... },
 *   // ...
 * };
 * const keyMap = {
 *   inputKeyA: 'outputKeyX',
 *   inputKeyB: 'outputKeyY',
 *   // ...
 * };
 * const output = transformWithKeyMap(input, keyMap);
 * // { outputKeyX: 'Value for A', outputKeyY: 'Value for B', ... }
 */
export const transformWithKeyMap = (inputObject, keyMap) => {
    const outputObject = {};

    for (const key in inputObject) {
        if (Object.prototype.hasOwnProperty.call(inputObject, key)) {
            const outputObjectKey = keyMap[key];
            outputObject[outputObjectKey] = inputObject[key];
        }
    }

    return outputObject;
};
