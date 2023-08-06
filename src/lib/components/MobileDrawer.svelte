<script lang="ts">
  import Icon from '@iconify/svelte';

  let isShow = false;

  $: className = isShow ? 'translate-x-0' : '-translate-x-full';
</script>

<button on:click={() => (isShow = true)} class="transition hover:text-white md:hidden">
  <Icon icon="akar-icons:three-line-horizontal" width={20} height={20} />
</button>

<div class="{className} fixed bottom-0 left-0 right-0 top-0 bg-black transition md:hidden">
  <div class="px-4 py-4">
    <button on:click={() => (isShow = false)} class="transition hover:text-white md:hidden">
      <Icon icon="akar-icons:cross" width={20} height={20} />
    </button>
  </div>
  <slot/>
</div>
