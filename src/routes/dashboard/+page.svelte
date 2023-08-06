<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h2>Websites</h2>
<div id="website-lists" class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
  {#if data.websites}
    {#each data.websites as website}
      <a
        href={`/dashboard/website/${website.id}`}
        class="flex flex-col items-start rounded-md border px-3 py-3 text-sm hover:bg-gray-50"
      >
        <div class="font-medium">{website.name}</div>
        <a
          class="text-sm text-gray-500 hover:text-blue-500"
          target="_blank"
          href={`//${website.domain}`}>{website.domain}</a
        >
      </a>
    {/each}
  {/if}
  <a
    id="add-website"
    href="/dashboard/add"
    class="flex items-center justify-center rounded-md border-2 border-dashed px-3 py-3 text-center text-sm font-medium text-gray-600"
    >Add Website</a
  >
</div>
