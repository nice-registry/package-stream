const test = require('tape')
var stream = require('.')()
var somePkg = null
var i = 0

test('packageStream', function (t) {
  stream
    .on('package', function (pkg) {
      t.comment(pkg.name)
      if (!pkg.valid) {
        console.log(pkg.validationErrors)
      }
      t.ok(pkg.valid, 'is valid')
    })
    .on('up-to-date', function (pkg) {
      t.end()
      process.exit()
    })
})
