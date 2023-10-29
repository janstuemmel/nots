// @vitest-environment happy-dom

import {expect, it, vi} from 'vitest';
import { setUrlCodeParam } from './url-params';

it('should set code to query params', () => {
  location.href = 'https://foo.bar/dummy'

  const code = 'foo'
  const spy = vi.spyOn(history, 'pushState')
  setUrlCodeParam(code)

  expect(spy).toHaveBeenCalledWith(null, '', 'https://foo.bar/dummy?code=foo')
})

it('should decode uri components', () => {
  location.href = 'https://foo.bar/dummy'

  const code = '$%'
  const spy = vi.spyOn(history, 'pushState')
  setUrlCodeParam(code)

  expect(spy).toHaveBeenCalledWith(null, '', 'https://foo.bar/dummy?code=%24%25')
})
