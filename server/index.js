const Service = require('@ignitial/iio-services').Service
const config = require('./config')

class StreamConsummer extends Service {
  constructor(options) {
    super(options)

    // creates automatically the stream
    // options.autocreate needs to be a stream name within the app namespace
    if (options.autocreate) {
      this.create(options.autocreate).catch(err => {
        this._dying(err)
      })
    }
  }

  // creates output stream
  // ***************************************************************************
  create(source) {
    /* @_PUT_ */
    return new Promise((resolve, reject) => {
      try {
        if (!this._stream) {
          // that's an input stream
          this._streamName = 'stream:' + this._name + ':input'
          this._stream = this._addStream(name, source)
          resolve(this._streamName)
        } else {
          reject(new Error('stream already exist'))
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  // destroys output stream
  // ***************************************************************************
  destroy() {
    /* @_DELETE_ */
    return new Promise((resolve, reject) => {
      try {
        if (this._stream) {
          this._removeStream(this._streamName)
          this._streamName = undefined
          this._stream = undefined
          resolve(name)
        } else {
          reject(new Error('no stream instance'))
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  _destroy() {
    if (this._stream) {
      this._removeStream(this._streamName)
    }

    super.destroy()
  }
}

// instantiate service with its configuration
const streamconsummer = new StreamConsummer(config)

streamconsummer._init().then(() => {
  console.log('service [' + streamconsummer.name + '] initialization done with options ',
    streamconsummer._options)
}).catch(err => {
  console.error('initialization failed', err)
  process.exit(1)
})
