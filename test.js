'use strict'

const test = require('tape')

const wrap = require('.')
const memoize = require('./memoize')



const tree = {}
const component1 = (data, actions) => tree

test('wrap – returns a function', (t) => {
	t.plan(1)

	t.equal(typeof wrap(component1), 'function')
})

test('wrap – passes valid args through', (t) => {
	t.plan(2)
	const state = {foo: 'bar'}
	const actions = {foo: () => {}}

	const stub = (_state, _actions) => {
		t.deepEqual(_state, state)
		t.equal(_actions, actions)
	}
	wrap(stub)(state, actions)
})

test('wrap – returns what the component returns', (t) => {
	t.plan(1)
	const wrapped = wrap(component1)

	t.equal(wrapped({}, {}), tree)
})

test('wrap – makes the state immutable', (t) => {
	t.plan(1)
	const wrapped = wrap((state, actions) => {
		state.foo = 'bar'
	})
	const state = {}

	t.throws(() => wrapped(state, {}))
})

test('wrap – enforces 2-arg components', (t) => {
	t.plan(2)

	t.throws(() => wrap((foo) => {}))
	t.throws(() => wrap((foo, bar, baz) => {}))
})

test('wrap – enforces functions as actions', (t) => {
	t.plan(6)
	const wrapped = wrap(component1)

	t.throws(() => wrapped({}, {foo: null}))
	t.throws(() => wrapped({}, {foo: 1}))
	t.throws(() => wrapped({}, {foo: 'bar'}))
	t.throws(() => wrapped({}, {foo: {}}))
	t.throws(() => wrapped({}, {foo: []}))
	t.doesNotThrow(() => wrapped({}, {foo: () => {}}))
})



const fn = () => {}
const simpleComponent = (data, actions) => [data, Math.random()]
const complexComponent = (data, actions) => [data.x, actions.fn]
const complexCompare = (data1, data2) => data1.x === data2.x

test('memoize – returns a component', (t) => {
	t.plan(1)
	const memoized = memoize(complexComponent, complexCompare)

	t.deepEqual(memoized({x: 1}, {fn}), [1, fn])
})

test('memoize – works with ===', (t) => {
	t.plan(4)
	const memoized = memoize(simpleComponent)
	const tree1 = memoized(1, {})
	const tree2 = memoized(1, {})

	t.ok(Array.isArray(tree1))
	t.equal(tree1[0], 1)
	t.equal(typeof tree1[1], 'number')

	t.equal(tree1[1], tree2[1])
})

test('memoize – works with compare fn', (t) => {
	t.plan(4)
	const memoized = memoize(complexComponent, complexCompare)
	const tree1 = memoized({x: 1}, {fn})
	const tree2 = memoized({x: 1}, {fn})

	t.ok(Array.isArray(tree1))
	t.equal(tree1[0], 1)
	t.equal(tree1[1], fn)

	t.equal(tree1, tree2)
})
