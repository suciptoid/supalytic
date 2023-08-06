<script lang="ts">
  export let href: string | undefined = undefined;
  export let onClick: (() => void) | undefined  = undefined;
  export let size: "sm" | "normal" = "normal"
  export let primary  = false

  let className =
    'inline-block cursor-pointer  transition ';

  if(primary){
    className += " text-white border-2 border-primary-500 bg-gray-500/10 hover:bg-primary-500 "
  }else{
    className += " text-gray-400 hover:text-white border-2 border-gray-500/30 hover:bg-gray-500/10  "
  }

  if(size=="sm") {
    className += " px-2 py-1 text-sm rounded-lg"
  }else{
    className += " px-4 py-2 rounded-global"
  }
</script>

{#if onClick != undefined}
  <button on:click={onClick} class={className}><slot/></button>
{:else}
  <a {href} class={className}><slot/></a>
{/if}
