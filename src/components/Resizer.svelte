<script lang="ts">
  export let min = 0;
  export let max: number;
  export let width = 250;
  export let hide = false;

  let wrapperHeight: number;
  const size = 5;

  const resize = ({ x }: MouseEvent) => {
    if (x <= min || x > max) return;
    width = x;
  }

  const handleResize = () => {
    document.addEventListener('mousemove', resize, false);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', resize, false);
    });
}
</script>

<div bind:clientHeight={wrapperHeight}>
  <div
    class:hidden={hide}
    role="slider"
    aria-valuenow={width}
    tabindex="0"
    on:mousedown|preventDefault={handleResize}
    class="bg-slate-100 dark:bg-slate-900 -translate-x-1/2 absolute h-full z-50 transition cursor-col-resize ease-in-out delay-150 hover:bg-blue-500 dark:hover:bg-blue-500 flex-none"
    style:width={`${size}px`}
    style:height={`${wrapperHeight}px`} />
</div>