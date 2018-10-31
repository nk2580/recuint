const { recuint, recuintSync } = require('./')

/**
 * Install any dependencies on
 * current directory
 */
recuintSync()

/**
 * Install any dependencies only
 * on example directory
 */
recuintSync({
  root: './example'
})

/**
 * Install any dependencies only
 * on app-1 folder inside example
 * directory with npm
 * 
 * And recuint will be return as
 * promise
 */
recuintSync({
  root: './example'
})
recuint({
  root: './example/app-1',
  manager: 'npm'
})
.then(() => {
  console.log('done')
})