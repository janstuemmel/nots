export const usageText = `/**
  * Usage
  * 
  * Import a module via:
  *  import 'https://cdn.jsdelivr.net/npm/lodash@4.17.21';
  * 
  * Import esm module via:
  *  import * as Marked from 'https://cdn.jsdelivr.net/npm/marked@9.1.2/+esm';
  * 
  * Use modules:
  *  const arr = _.map([1, 2, 4], v => v ** 2);
  *  const html = Marked.parse('# Hello World');
  * 
  * Use vm to print output:
  *  vm.log({ arr, html });
  *  vm.markdown('# markdown string');
  *  vm.bar(['1', '2'], [['3', '4'], ['5', '6']]);
  * 
  * Hit \`ctrl-Enter\` to execute the code
  */

vm.bar(['1', '2'], [['3', '4'], ['5', '6']]);
`;