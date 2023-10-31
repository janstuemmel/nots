import { compressSync, decompressSync, strFromU8, strToU8,  } from 'fflate';

export const buildUrlCodeFragment = (code: string) => {
  const url = new URL(location.href)
  const uint = strToU8(code, true)
  const comp = compressSync(uint);
  url.hash = btoa(strFromU8(comp, true));
  return url.href
}

export const getUrlCodeFragment = () => {
  const url = new URL(location.href)
  const data = atob(url.hash.slice(1))
  const comp = strToU8(data, true)
  const result = strFromU8(decompressSync(comp))
  return result === '' ? null : result;
}
