import { QuickJSAsyncContext, QuickJSHandle } from 'quickjs-emscripten';
import { mapResult } from './mapper.js';
import { marked } from 'marked';

export const setLoggerHandle = (vm: QuickJSAsyncContext, handle: QuickJSHandle, returnValues: Result[]) => {
  const vmFunc = vm.newFunction('log', (...args) => {
    args.forEach((a) => returnValues.push(mapResult(vm.dump(a))))
  })
  vm.setProp(handle, "log", vmFunc)
  vmFunc.dispose()
}

export const setMarkdownHandle = (vm: QuickJSAsyncContext, handle: QuickJSHandle, returnValues: Result[]) => {
  const vmFunc = vm.newFunction('markdown', (...args) => {
    args.forEach((a) => returnValues.push({
      type: 'html',
      value: marked.parse(`${vm.dump(a)}`),
    }))
  })

  vm.setProp(handle, "markdown", vmFunc)
  vmFunc.dispose()
}

export const setChartBarHandle = (vm: QuickJSAsyncContext, handle: QuickJSHandle, returnValues: Result[]) => {
  const vmFunc = vm.newFunction('bar', (labelsArg, dataArg) => {
    if (!labelsArg || !dataArg) {
      throw new TypeError('missing arguments for bar chart')
    }

    const labels = vm.dump(labelsArg)
    const data = vm.dump(dataArg)

    if (!(labels instanceof Array) || !(data instanceof Array)) {
      throw new TypeError('wrong arguments for bar chart')
    }

    returnValues.push({
      type: 'bar',
      value: { labels, data },
    })
  })

  vm.setProp(handle, "bar", vmFunc)
  vmFunc.dispose()
}
