// @vitest-environment happy-dom

import { expect, it } from "vitest";
import { buildUrlCodeFragment, getUrlCodeFragment } from './url-fragment.js'

it('should compress/decrompress', () => {
  location.href = buildUrlCodeFragment('dummy')

  const data = getUrlCodeFragment()
  expect(data).toEqual('dummy')
})

it('should return empty when invalid', () => {
  location.href = 'invalid'
  const data = getUrlCodeFragment()
  expect(data).toEqual(null)
})
