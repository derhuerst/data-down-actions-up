'use strict'

const Benchmark = require('benchmark')

const memoize = require('./memoize')
const suite = new Benchmark.Suite()



const memoizedById = memoize(function (x, actions) {
	return x
})

const data1 = {x: 1}
const data2 = {x: -1}

const memoizedByFn = memoize(function (data, actions) {
	return data.x
}, function (dataA, dataB) {
	return dataA.x === dataB.x
})



suite
.add('memoization by ===', function () {
	const x = Math.random() < .5 ? 1 : -1
	memoizedById(x, {})
})

.add('memoization by compare fn', () => {
	const data = Math.random() < .5 ? data1 : data2
	memoizedByFn(data, {})
})



.on('cycle', (e) => console.log(e.target.toString()))
.run({async: true})
