const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === "[object Date]"
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === "object"
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === "[object Object]"
}

export function extend<T, U>(to: T, from: U): T & U {
  console.log(from)
  const keys = Object.getOwnPropertyNames(from)
  console.log(keys)
  const len = keys.length
  let key

  for (let i = 0; i < len; i++) {
    key = keys[i]
    console.log(key)
    // ;(to as T & U)[key] = from[key[i]] as any
  }
  return to as T & U
}
