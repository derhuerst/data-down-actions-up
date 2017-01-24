'use strict'

const test = require('tape')

const wrap = require('.')

const tree = {}
const component = (data, actions) => tree



test('returns a function', (t) => {
	t.plan(1)

	t.equal(typeof wrap(component), 'function')
})

test('passes valid args through', (t) => {
	t.plan(2)
	const state = {foo: 'bar'}
	const actions = {foo: () => {}}

	const stub = (_state, _actions) => {
		t.deepEqual(_state, state)
		t.equal(_actions, actions)
	}
	wrap(stub)(state, actions)
})

test('returns what the component returns', (t) => {
	t.plan(1)
	const wrapped = wrap(component)

	t.equal(wrapped({}, {}), tree)
})

test('makes the state immutable', (t) => {
	t.plan(1)
	const wrapped = wrap((state, actions) => {
		state.foo = 'bar'
	})
	const state = {}

	t.throws(() => wrapped(state, {}))
})

test('enforces 2-arg components', (t) => {
	t.plan(2)

	t.throws(() => wrap((foo) => {}))
	t.throws(() => wrap((foo, bar, baz) => {}))
})

test('enforces functions as actions', (t) => {
	t.plan(6)
	const wrapped = wrap(component)

	t.throws(() => wrapped({}, {foo: null}))
	t.throws(() => wrapped({}, {foo: 1}))
	t.throws(() => wrapped({}, {foo: 'bar'}))
	t.throws(() => wrapped({}, {foo: {}}))
	t.throws(() => wrapped({}, {foo: []}))
	t.doesNotThrow(() => wrapped({}, {foo: () => {}}))
})
