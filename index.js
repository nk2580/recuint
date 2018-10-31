const exec = require('child_process').exec
const shell = require('shelljs')
const current = __dirname
const package = shell.find(__dirname)
  .filter(item => !item.includes('node_modules'))
  .filter(item => item.includes('package.json'))
  .map(item => item.replace('package.json', ''))

const cmd = 'yarn'

const install = (path) => {
  return new Promise((resolve, reject) => {
    shell.cd(path)

    exec(cmd, (err, out) => {
      if (err) reject(err)
      else resolve(out)
    })
  })
}

Promise.all(package.map(item => {
  return install(item)
})).then(res => {
  shell.cd(current)
  console.log('All dependencies already installed')
})
