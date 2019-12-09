<template>
  <div :id="id" class="streamconsummer-layout">
    <div class="streamconsummer-raw">
      <v-select class="streamconsummer-form--item" :label="$t('Buckets')"
        v-model="service" :items="services" item-text="name"/>

      <v-select v-if="service && streams" :disabled="!bucket"
        class="streamconsummer-form--item" :label="$t('Files')"
        v-model="object" :items="objects" item-text="name"/>

      <v-btn class="streamconsummer-form--item" color="blue lighten-2" @click="handleTest"
        outlined elevation="2" dark v-show="bucket && object"
        prepend="test">
        <v-icon left>check</v-icon>{{ $t('Test') }}</v-btn>
    </div>
  </div>
</template>

<script>
import map from 'lodash/map'

export default {
  props: [ ],
  data: () => {
    return {
      id: 'streamconsummer_' + Math.random().toString(36).slice(2),
      service: null,
      streams: null
    }
  },
  watch: {
    service: function(val) {
      this.$services[val].streaming
    }
  },
  computed: {
    services() {
      let svcs = map(this.$services.servicesDico, (s, k) => {
        return s.streaming ? k : undefined
      })

      return svcs
    }
  },
  methods: {
    
  },
  mounted() {
    // dev
    // refresh service UI on hot reload
    this.$services.once('service:up', service => {
      if (service.name === 'streamconsummer') {
        localStorage.setItem('HR_PATH', '/service-streamconsummer')
        window.location.reload()
      }
    })
  },
  beforeDestroy() {

  }
}
</script>

<style>
.streamconsummer-layout {
  width: 100%;
  height: calc(100% - 0px);
}

.streamconsummer-raw {
  width: 100%;
  display: flex;
  align-items: center;
}

.streamconsummer-form--item {
  max-width: 300px;
  margin-left: 16px;
}
</style>
