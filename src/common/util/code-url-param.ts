
export const getCodeFromParam = () => {
  const param = new URLSearchParams(window.location.search).get('code')
  if (param) {
    return decodeURI(param)
  }
  return null
}
