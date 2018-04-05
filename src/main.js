// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.directive('validation-tel', { bind (el, binding, vnode) {
  console.log(el.value)
},
update (el, binding, vnode, oldvnode) {
  if (isNaN(el.value)) {
    el.value = ''
  }
}
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
