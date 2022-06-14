export const titleCase = (str: string) => {
  let splitStr = str.toLowerCase().split(" ")
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(" ")
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase()
}

export const clear = (str: string) => {
  let cleared = str.replace(/\s+|_+/gm, " ").replace(/(^\s+)|(\s+$)/gm, "")
  return cleared
}
