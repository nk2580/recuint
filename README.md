# ♻ RECUINT

Now you can install your dependencies on package.json recursively, without run **npm install** or **yarn** manualy on every folder on your project.

### Documentation

This library only 1KB with one dependencies ([shelljs](https://www.npmjs.com/package/shelljs)), with two option to be use. You can use this library using promise or without any callback.

|Option|Description|Default
|:-----:|-----|-----|
|root|Root of directory to install dependencies|current directory|
|manager|Manager to be use like **npm** or **yarn**|yarn|

### Usage

First, install **recuint** using **yarn** or **npm**.

```bash
$ npm i recuint

# or

$ yarn add recuint
```

Next, create configuration file and run it as usual using **Node**.

```js
/**
 * Recuint have two option to be use,
 * first using promise and second without
 * callback or promise.
 * 
 * You can use as you want.
 */
const { recuint, recuintSync } = require('./')

/**
 * Install any dependencies on
 * current directory.
 */
recuintSync()

/**
 * Install any dependencies only
 * on example directory.
 */
recuintSync({
  root: './example'
})

/**
 * Install any dependencies only
 * on app-1 folder inside example
 * directory with npm.
 * 
 * And recuint will be return as
 * promise.
 */
recuint({
  root: './example/app-1',
  manager: 'npm'
})
.then(() => {
  console.log('done')
})
```

For more info see [Example File](example.js)

### License

This project under MIT License
