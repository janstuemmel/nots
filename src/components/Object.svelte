<script lang="ts">
  import JSONFormatter, { type JSONFormatterConfiguration } from 'json-formatter-js'
  import { theme } from '../common/stores/theme';

  export let data: ObjectResult
  let elem: HTMLDivElement
  let objElem: HTMLElement
  $: if (data && elem) {

    const opts: JSONFormatterConfiguration = {
      theme: $theme,
      hoverPreviewEnabled: true,
      hoverPreviewArrayCount: 100,
      hoverPreviewFieldCount: 5,
    }

    const formatter = new JSONFormatter(data.value, 2, opts)

    if (objElem) {
      elem.removeChild(objElem)
    }

    objElem = formatter.render()
    elem.appendChild(objElem)
  }
</script>

<div bind:this={elem}>
</div>