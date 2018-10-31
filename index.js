const path = require('path')
const exec = require('child_process').exec
const shell = require('shelljs')

const package = (opts) => {
  const directory = path.resolve(
    __dirname,
    (opts && opts.root || __dirname)
  )

  return shell.find(directory)
    .filter(item => !item.includes('node_modules'))
    .filter(item => item.includes('package.json'))
    .map(item => item.replace('package.json', ''))
}

const install = (manager, path) => {
  return new Promise((resolve, reject) => {
    const command = (
      manager === 'npm' ? 'npm install' : 'yarn'
    )

    shell.cd(path)

    exec(command, (err, out) => {
      if (err) reject(err)
      resolve(out)
    })
  })
}

const manager = (opts) => {
  return opts && opts.manager || (
    shell.which('yarn') ? 'yarn' :
    shell.which('npm') ? 'npm' :
    false
  )
}

const recuint = (opts) => {
  return new Promise(resolve => {
    Promise.all(package(opts).map(item => {
      return install(manager(opts), item)
    })).then(() => {
      resolve('All dependencies already installed')
    })
  })
}

const recuintSync = (opts) => {
  Promise.all(package(opts).map(item => {
    return install(manager(opts), item)
  }))
}

module.exports = {
  recuint,
  recuintSync
}