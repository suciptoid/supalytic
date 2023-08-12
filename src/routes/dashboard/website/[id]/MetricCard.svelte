<script lang="ts">
  import { browserIcons, deviceIcons, osIcons } from '$lib/icons';
  import Icon from '@iconify/svelte';

  type Metric = {
    name: string;
    page_view: number;
  };

  export let title: string = 'Title';
  export let type: 'browser' | 'device' | 'os' | 'country' | 'page' | 'referer' = 'browser';
  export let data: Metric[];

  const total = data.reduce((acc, curr) => acc + curr.page_view, 0);
  const rows = data.map((row) => {
    return {
      ...row,
      // add percentage
      width: (row.page_view / total) * 100
    };
  });
</script>

<div class="flex flex-col rounded-md bg-white px-6 py-4 dark:bg-gray-500/10">
  <div class="flex py-1 font-semibold dark:text-white">
    <div class="flex-1">{title}</div>
    <div class="basis-1/5 text-right">Views</div>
  </div>
  <div class="metric-rows space-y-1">
    {#each rows as row}
      <div
        class="relative flex w-full rounded-md border border-gray-100 py-1 text-sm dark:border-slate-600"
      >
        <div
          class="bar-chart absolute left-0 top-0 h-full rounded-md bg-blue-400 opacity-20 dark:bg-slate-600"
          style="width: {row.width}%;"
        />
        <div class="metric-icon z-10 ml-2 flex items-center">
          {#if type === 'browser'}
            <Icon icon={browserIcons[row.name]} />
          {:else if type === 'device'}
            <Icon icon={deviceIcons[row.name]} />
          {:else if type === 'os'}
            <Icon icon={osIcons[row.name]} />
          {:else if type === 'country'}
            <Icon icon={`cif:${row.name?.toLowerCase()}`} />
          {/if}
        </div>
        <div class="z-10 flex w-full flex-1 items-center truncate px-2">
          <div class="truncate">
            {#if type == 'referer' && !row.name}
              None (direct)
            {:else}
              {row.name}
            {/if}
          </div>
        </div>
        <div class="z-10 flex-shrink-0 px-3 text-right font-medium text-gray-600">
          {row.page_view?.toLocaleString()}
        </div>
      </div>
    {/each}
  </div>
</div>
