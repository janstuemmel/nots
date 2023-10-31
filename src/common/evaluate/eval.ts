import { newQuickJSAsyncWASMModule, shouldInterruptAfterDeadline } from 'quickjs-emscripten'
import { setChartBarHandle, setChartLineHandle, setLoggerHandle, setMdHandle, setTableHandle } from './handles.js'
import { loadModule } from './module-loader.js'
import * as monaco from 'monaco-editor'

const emitTs = () => monaco.languages.typescript.getTypeScriptWorker()
  .then(async (worker) => {
    const editor = monaco.editor.getEditors()[0];
    const uri = editor?.getModel()?.uri;
    if (uri) {
      return worker(uri).then(async (proxy) => {
        return proxy.getEmitOutput(uri.toString()).then(({ outputFiles }) => {
          return outputFiles.map((of) => of.text).join('\n')
        })
      })
    } else {
      throw new Error('could not get uri from editor')
    }
  })

export const evaluate = async (memory = 1024 * 1024, timeout = 1000): Promise<SuccessResult | ErrResult> => {
  const QuickJS = await newQuickJSAsyncWASMModule()
  const runtime = QuickJS.newRuntime()

  runtime.setMemoryLimit(memory)
  runtime.setInterruptHandler(shouldInterruptAfterDeadline(Date.now() + timeout))
  runtime.setModuleLoader(loadModule)

  const returnValues: Result[] = [];

  const vm = runtime.newContext()
  const vmHandle = vm.newObject()
  vm.setProp(vm.global, "vm", vmHandle)  
  setLoggerHandle(vm, vmHandle, returnValues);
  setMdHandle(vm, vmHandle, returnValues);
  setChartBarHandle(vm, vmHandle, returnValues);
  setChartLineHandle(vm, vmHandle, returnValues);
  setTableHandle(vm, vmHandle, returnValues);
  vmHandle.dispose()
  
  const t0 = performance.now()
  
  const res = await vm.evalCodeAsync(await emitTs())
  
  const executionTime = performance.now() - t0;
  const memoryHandle = runtime.computeMemoryUsage()
  const memoryUsed = vm.dump(memoryHandle).memory_used_size;
  memoryHandle.dispose()

  if (res.error) {
    const err = vm.dump(res.error);
    res.error.dispose()
    vm.dispose()
    return {
      type: 'error',
      message: err.message,
      name: err.name,
      memoryUsed,
      executionTime,
    };
  }
  
  vm.dispose()
  runtime.dispose()
  
  return {
    type: 'success',
    values: returnValues,
    memoryUsed,
    executionTime,
  };
}
