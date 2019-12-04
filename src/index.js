import StreamConsummer from './components/StreamConsummer.vue'

// function to be called when service loaded into web app:
// naming rule: iios_<service_unique_name>
//
global.iios_streamconsummer = function(Vue) {
  // Warning: component name must be globally unique in your host app
  Vue.component('streamconsummer', StreamConsummer)

  let register = () => {
    // EXEAMPLE
    Vue.prototype.$services.emit('app:menu:add', [
      {
        path: '/service-streamconsummer',
        title: 'StreamConsummer Service view',
        svgIcon: '$$service(streamconsummer)/assets/streamconsummer.svg',
        section: 'Services',
        anonymousAccess: true,
        hideIfLogged: false,
        route: {
          name: 'StreamConsummer',
          path: '/service-streamconsummer',
          component: StreamConsummer
        }
      }
    ])

    let onServiceDestroy = () => {
      Vue.prototype.$services.emit('app:menu:remove', [{
        path: '/service-streamconsummer'
      }])

      Vue.prototype.$services.emit('service:destroy:streamconsummer:done')
    }

    Vue.prototype.$services.once('service:destroy:streamconsummer', onServiceDestroy)
  }

  if (Vue.prototype.$services.appReady) {
    register()
  } else {
    Vue.prototype.$services.once('app:ready', register)
  }
}
