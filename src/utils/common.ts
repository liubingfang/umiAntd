/**
 * 描述: Add a delayed Function to Effects
 * @date 2022-07-11
 * @param {any} ms:number
 * @returns {any}
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
