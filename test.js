const test = require('tape')
var stream = require('.')()
var somePkg = null
var i = 0

test('packageStream', function (t) {
  stream
    .on('package', function (pkg, seq) {
      t.equal(typeof seq, 'number', 'has a sequence number')
    
      t.comment(pkg.name)
      if (!pkg.valid) {
        console.log(pkg.validationErrors)
      }
      t.ok(pkg.valid, 'is valid')

      // bail after a while
      if (++i > 10 * 1000) done(t)
    })
})

function done (t) {
  t.end()
  process.exit()
}
