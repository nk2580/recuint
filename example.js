const { recuint, recuintSync } = require('./')

/**
 * Sync
 */
recuintSync({
  root: './example'
})

/**
 * Promise
 */
recuint({
  root: './example/app-1',
  manager: 'npm'
})
.then(() => {
  console.log('done')
})