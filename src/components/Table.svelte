<script lang="ts">
  import { Grid } from 'ag-grid-community';

  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  import 'ag-grid-community/styles/ag-theme-balham.css';
  import 'ag-grid-community/styles/ag-theme-material.css';
  import {theme} from '../common/stores/theme';

  let elem: HTMLDivElement;
  let grid: Grid;
  export let data: TableResult;

  $: if(elem) {
    if (grid) {
      grid.destroy()
    }

    grid = new Grid(elem, {
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: 'agTextColumnFilter',
        cellDataType: false,
      },
      columnDefs: data.value.labels.map((v, i) => ({ headerName: v, field: `${i}` })),
      rowData: data.value.data,
    });
  }
</script>

<style>
.ag-theme-alpine-dark {
  --ag-foreground-color: white;
  --ag-background-color: #434c5e;
  --ag-header-foreground-color: white;
  --ag-header-background-color: #2e3440;
  --ag-odd-row-background-color: #3b4252;
  --ag-borders: none;
  --ag-border-radius: 100px;
  --ag-input-focus-box-shadow: none;
  --ag-secondary-border-color: none;
  --ag-font-size: 14px;
  --ag-font-family: monospace;
}

.ag-theme-alpine {
  --ag-borders: none;
  --ag-border-radius: 100px;
  --ag-input-focus-box-shadow: none;
  --ag-popup-shadow: 0;
  --ag-font-size: 14px;
  --ag-font-family: monospace;
}
</style>

<div 
  class="w-full h-60" 
  class:ag-theme-alpine={$theme === 'light'} 
  class:ag-theme-alpine-dark={$theme === 'dark'} 
  bind:this={elem}></div>
