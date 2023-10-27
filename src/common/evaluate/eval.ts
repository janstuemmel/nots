import { newQuickJSAsyncWASMModule, shouldInterruptAfterDeadline } from 'quickjs-emscripten'
import { loadModule } from './module-loader.js'
import { setLoggerHandle } from './handles.js'

export const evaluate = async (code: string): Promise<SuccessResult | ErrResult> => {
  const QuickJS = await newQuickJSAsyncWASMModule()
  const runtime = QuickJS.newRuntime()

  runtime.setMemoryLimit(1024 * 1024)
  runtime.setInterruptHandler(shouldInterruptAfterDeadline(Date.now() + 1000))
  runtime.setModuleLoader(loadModule)

  const returnValues: SuccessResult['values'] = [];
    
  const vm = runtime.newContext()
  const vmHandle = vm.newObject()
  vm.setProp(vm.global, "vm", vmHandle)  
  setLoggerHandle(vm, vmHandle, returnValues);
  vmHandle.dispose()

  const res = await vm.evalCodeAsync(code)

  if (res.error) {
    const err = vm.dump(res.error);
    res.error.dispose()
    vm.dispose()
    return {
      type: 'error',
      message: err.message,
      name: err.name,
    };
  }

  vm.dispose()

  return {
    type: 'success',
    values: returnValues
  };
}
