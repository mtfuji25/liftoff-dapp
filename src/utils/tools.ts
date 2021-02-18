import { getAddress } from 'ethers/lib/utils';

export const isAddress = (address: string): boolean => {
  try {
    getAddress(address);
  } catch (e) {
    return false;
  }
  return true;
};

export const isContract = async (
  provider: any,
  address: string
): Promise<boolean> => {
  const code = await provider.getCode(address);
  return code && code !== '0x';
};

export const isObjectEqual = (obj1?: any, obj2?: any): boolean => {
  if (!obj1 && obj2) return false;
  if (!obj2 && obj1) return false;
  if (!obj1 && !obj2) return true;
  if (typeof obj1 !== typeof obj2) return false;

  if (typeof obj1 !== 'object' && !Array.isArray(obj1)) {
    return obj1 === obj2;
  }

  if (Array.isArray(obj1)) {
    for (let index = 0; index < obj1.length; index += 1) {
      if (!isObjectEqual(obj1[index], obj2[index])) return false;
    }
    return true;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let keyIndex = 0; keyIndex < keys1.length; keyIndex += 1) {
    const key = keys1[keyIndex];
    if (typeof obj1[key] !== typeof obj2[key]) return false;
    if (!isObjectEqual(obj1[key], obj2[key])) return false;
  }

  return true;
};

export const waitABit = (milli = 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, milli);
  });
