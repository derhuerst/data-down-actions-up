# data-down-actions-up

**Enforce the *Data Down, Actions Up™* paradigm.**

[![npm version](https://img.shields.io/npm/v/data-down-actions-up.svg)](https://www.npmjs.com/package/data-down-actions-up)
[![build status](https://img.shields.io/travis/derhuerst/data-down-actions-up.svg)](https://travis-ci.org/derhuerst/data-down-actions-up)
[![dependency status](https://img.shields.io/david/derhuerst/data-down-actions-up.svg)](https://david-dm.org/derhuerst/data-down-actions-up)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/data-down-actions-up.svg)](https://david-dm.org/derhuerst/data-down-actions-up#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/data-down-actions-up.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)

@maxogden, @yoshuawuyts and other great people have shaped this notion of **[*Data Down, Actions Up™*](https://github.com/maxogden/yo-yo#yo-yojs), a paradigm to organize your frontend components**. In order to keep code maintainable, it encourages you to follow the following principles:

- Make your components pure. They receive arguments and return a tree of DOM or [`virtual-dom`](https://github.com/Matt-Esch/virtual-dom#virtual-dom) nodes.
- Pass all data (often called "state") necessary to render the component as the first argument.
- Pass all functions that mutate this data (often called "actions"), as the second argument, grouped in an object.

This module enforces this pattern. **During development, it makes `data` immutable and asserts that every item in `actions` is a function.** In the production build, it will simply return the component, leading to no runtime overhead.


## Installing

```shell
npm install data-down-actions-up
```


## Usage

Consider this simplify user account component:

```js
const yo = require('yo-yo')

const account = (data, actions) => {
	return yo `
		<div>
			<span>${data.name}</span>
			<img src="${data.img}" />
			<button onclick=${actions.delete} />
		</div>
	`
}
```

Your components won't stay that beautiful however. Your codebase will become more chaotic as soon as you have tight deadlines or many developers.

Wrap the component to enforce *Data Down, Actions Up™*:

```js
const dataDownActionsUp = require('data-down-actions-up')

module.exports = dataDownActionsUp(account)
```

**If you bundle this, use [envify](https://github.com/hughsk/envify#readme) to get the production version of `dataDownActionsUp`**, which simply returns your `account` component directly.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/location/issues).
