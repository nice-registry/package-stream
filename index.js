const ChangesStream = require('changes-stream')
const Package = require('nice-package')
const got = require('got')
const EventEmitter = require('events')
const util = require('util')

function Emitter () { EventEmitter.call(this) }
util.inherits(Emitter, EventEmitter)

module.exports = function (opts) {
  if (!opts) opts = {}
  var defaults = {
    db: 'https://replicate.npmjs.com',
    include_docs: true
  }
  opts = Object.assign(defaults, opts)

  var emitter = new Emitter()
  var finalUpdate
  var changes = new ChangesStream(opts)

  got(opts.db, {json: true}).then(response => {
    finalUpdate = response.body.update_seq
    changes.on('data', function (change) {
      var pkg = new Package(change.doc)
      if (!pkg.valid) return
      emitter.emit('package', pkg, change.seq)
      if (change.seq >= finalUpdate) return emitter.emit('up-to-date')
    })
  })

  return emitter
}
