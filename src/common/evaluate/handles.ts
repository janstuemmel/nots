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

export const setMdHandle = (vm: QuickJSAsyncContext, handle: QuickJSHandle, returnValues: Result[]) => {
  const vmFunc = vm.newFunction('md', (...args) => {
    args.forEach((a) => returnValues.push({
      type: 'html',
      value: marked.parse(`${vm.dump(a)}`),
    }))
  })

  vm.setProp(handle, "md", vmFunc)
  vmFunc.dispose()
}

export const setTableHandle = (vm: QuickJSAsyncContext, handle: QuickJSHandle, returnValues: Result[]) => {
  const vmFunc = vm.newFunction('table', (labelsArg, dataArg) => {
    if (!labelsArg || !dataArg) {
      throw new TypeError('missing arguments for table')
    }

    const labels = vm.dump(labelsArg)
    const data = vm.dump(dataArg)

    if (!(labels instanceof Array) || !(data instanceof Array)) {
      throw new TypeError('wrong arguments for table')
    }

    returnValues.push({
      type: 'table',
      value: { labels, data },
    })
  })

  vm.setProp(handle, "table", vmFunc)
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

export const setChartLineHandle = (vm: QuickJSAsyncContext, handle: QuickJSHandle, returnValues: Result[]) => {
  const vmFunc = vm.newFunction('line', (labelsArg, dataArg) => {
    if (!labelsArg || !dataArg) {
      throw new TypeError('missing arguments for line chart')
    }

    const labels = vm.dump(labelsArg)
    const data = vm.dump(dataArg)

    if (!(labels instanceof Array) || !(data instanceof Array)) {
      throw new TypeError('wrong arguments for line chart')
    }

    returnValues.push({
      type: 'line',
      value: { labels, data },
    })
  })

  vm.setProp(handle, "line", vmFunc)
  vmFunc.dispose()
}
