import { QuickJSAsyncContext, QuickJSHandle } from 'quickjs-emscripten';
import { mapResult } from './mapper.js';

export const setLoggerHandle = (vm: QuickJSAsyncContext, handle: QuickJSHandle, returnValues: Result[]) => {
  const log = vm.newFunction('log', (...args) => {
    args.forEach((a) => returnValues.push(mapResult(vm.dump(a))))
  })
  vm.setProp(handle, "log", log)
  log.dispose()
}
