'use strict'

if (process.env.NODE_ENV === 'dev') {
	const immutable = require('seamless-immutable')

	const wrap = (component) => {
		if (component.length !== 2) {
			const name = component.name || 'Your component'
			throw new Error(name + ' must take exactly 2 arguments.')
		}

		const dataDownActionsUp = (data, actions) => {
			data = immutable(data)

			if ('object' !== typeof actions)
				throw new Error('actions must be an object')
			for (let name in actions) {
				// todo: nested objects
				if('function' !== typeof actions[name])
					throw new Error('actions object must only contain functions')
			}

			return component(data, actions)
		}

		return dataDownActionsUp
	}

	module.exports = wrap
} else {
	module.exports = (component) => component
}
