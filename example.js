'use strict'

const yo = require('yo-yo')
const dataDownActionsUp = require('.')

const account = (data, actions) => {
	return yo `
		<div>
			<span>${data.name}</span>
			<img src="${data.img}" />
			<button onclick=${actions.delete} />
		</div>
	`
}

const wrapped = dataDownActionsUp(account)
