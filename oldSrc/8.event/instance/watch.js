import { Watcher } from '../observer/watcher'

export function initWatch(vm, watch){
    for (const key in watch) {
        const handler = watch[key]
        if (Array.isArray(handler)) {
          for (let i = 0; i < handler.length; i++) {
            createWatcher(vm, key, handler[i])
          }
        } else {
          createWatcher(vm, key, handler)
        }
      }
}

function createWatcher(vm, expOrFn, handler, options){
    if (typeof handler === 'string') {
        handler = vm[handler]
    }
    return vm.$watch(expOrFn, handler, options)
}

export function watchMixin(Vue){
    Vue.prototype.$watch = function (expOrFn, cb, options) {
        const vm = this
        if (isPlainObject(cb)) {
          return createWatcher(vm, expOrFn, cb, options)
        }
        options = options || {}
        options.user = true
        const watcher = new Watcher(vm, expOrFn, cb, options)
        if (options.immediate) {
            cb.call(vm, watcher.value)
    
        }
        return function unwatchFn () {
          watcher.teardown()
        }
    }
}
function isPlainObject(obj){
    Object.prototype.toString.call(obj) === '[object Object]'
}