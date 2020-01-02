export const isArray = x => Object.prototype.toString.call(x) === '[object Array]'
export const isObject = x => Object.prototype.toString.call(value) === '[object Object]'
export const getType = x => Object.prototype.toString.call(x).slice(8, -1).toLowerCase()
export const isEqual = (x, y) => {
  if (isArray(x)) {
    return isArray(y)
  }
  return Object.keys(x).sort((a,b) => a - b).join('-') === Object.keys(y).sort((a,b) => a - b).join('-')
}
export const findSub = (x, y) => x.filter(z => z.value === y && z.subList)[0]
