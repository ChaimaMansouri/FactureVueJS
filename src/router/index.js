import Vue from 'vue'
import Router from 'vue-router'
import Facture from '@/components/Facture'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Facture',
      component: Facture
    }
  ]
})
