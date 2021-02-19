/* 插件 让用户使用 */
import  Toast from '../notify/toast/toast'

let currentToast

export default {
  install (Vue, options) {
    Vue.prototype.$toast = function(message, toastOptions) {
      if (currentToast) {
        currentToast.close()
      }
      currentToast = createToast({
        Vue,
        message,
        propsData: toastOptions,
        onClose: () => {
          currentToast = null
        }
      }) //新建一个函数
    }
  }
}



/* helpers */
function createToast({ Vue, message, propsData, onClose }) {
  let Constructor = Vue.extend(Toast)
  let toast = new Constructor({ propsData })

  // 给 toast 传递默认插槽内容
  toast.$slots.default = [message]

  // mount
  toast.$mount()
  toast.$on('close', onClose )

  // 将元素放置到 body
  document.body.appendChild(toast.$el)

  return toast
}