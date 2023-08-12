<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h2 class="mb-4 font-medium">Websites</h2>

<div id="website-lists" class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
  {#if data.websites}
    {#each data.websites as website}
      <a
        href={`/dashboard/website/${website.id}`}
        class="flex flex-col items-start rounded-md border border-gray-500/20 dark:bg-gray-600/10 p-6 transition hover:border-gray-500/40 hover:bg-gray-400/10 dark:hover:bg-gray-400/10"
      >
        <div class="font-medium">{website.name}</div>
        <a
          class="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500"
          target="_blank"
          href={`//${website.domain}`}
        >
          <Icon icon="akar-icons:globe" width={10} height={10} />
          <p>{website.domain}</p>
        </a>
      </a>
    {/each}
  {/if}
  <a
    id="add-website"
    href="/dashboard/add"
    class="h-[90px] flex items-center justify-center rounded-md border border-dashed border-gray-500/20 dark:bg-gray-600/10 p-6 transition hover:border-gray-500/40 hover:bg-gray-400/10 dark:hover:bg-gray-400/10 text-center text-sm font-medium text-gray-600"
    >
    <Icon icon="mdi:add" width={16} height={16} />
    Add Website</a
  >
</div>
