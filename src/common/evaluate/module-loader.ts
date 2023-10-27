
export const loadModule = async (name: string) => {
  const url = name.startsWith('https://') ? name : `https://${name}`;
  return fetch(url)
    .then(res => res.text())
}