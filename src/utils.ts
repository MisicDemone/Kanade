export const capitalize = (word: string) =>
  `${word[0].toUpperCase()}${word.slice(1)}`

/**
 * @author ruanyifeng
 * http://es6.ruanyifeng.com/#docs/class-extends#Mixin-%E6%A8%A1%E5%BC%8F%E7%9A%84%E5%AE%9E%E7%8E%B0
 */

// function mix(...mixins) {
//   class Mix {}

//   for (let mixin of mixins) {
//     copyProperties(Mix.prototype, mixin) // 拷贝实例属性
//     copyProperties(Mix.prototype, Reflect.getPrototypeOf(mixin)) // 拷贝原型属性
//   }

//   return Mix
// }

// function copyProperties(target, source) {
//   for (let key of Reflect.ownKeys(source)) {
//     if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
//       let desc = Object.getOwnPropertyDescriptor(source, key)
//       Object.defineProperty(target, key, desc)
//     }
//   }
// }
