// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import HttpServer from '@/plugins/http.js'
import CusBreadCrumb from '@/components/common/cusBreadcrumb'
Vue.config.productionTip = false
import moment from 'moment'

Vue.use(ElementUI)
Vue.use(HttpServer)

Vue.component(CusBreadCrumb.name,CusBreadCrumb)

//全局过滤器
//格式化日期
Vue.filter('fmtDate', (value, fmtString) => {
  return moment(value).format(fmtString)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
