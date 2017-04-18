'use strict'

const memoize = (component, compare) => {
	if ('function' !== typeof component) {
		throw new Error('component must be a function.')
	}
	if (compare && 'function' !== typeof compare) {
		throw new Error('compare must be a function or undefined.')
	}

	let lastData = {}
	let lastTree = null

	if (!compare) {
		const memoizeById = (data, actions) => {
			if (data !== lastData) {
				lastData = data
				lastTree = component(data, actions)
			}
			return lastTree
		}
		return memoizeById
	} else {
		const memoizeByFn = (data, actions) => {
			if (!compare(lastData, data)) lastTree = component(data, actions)
			lastData = data
			return lastTree
		}
		return memoizeByFn
	}
}

module.exports = memoize
