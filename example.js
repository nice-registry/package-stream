var registry = require('.')()

registry
  .on('package', function (pkg) {
    // nice clean package object
  })
  .on('up-to-date', function (pkg) {
    // consumed all changes (for now)
    // The stream will remain open and continue receiving package
    // updates from the registry as they occur in real time.
  })
