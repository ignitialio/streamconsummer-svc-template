import Vue from 'vue'
import StreamConsummer from '../src/components/StreamConsummer.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(StreamConsummer),
}).$mount('#app')
