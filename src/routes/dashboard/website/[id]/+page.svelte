<script lang="ts">
  import type { PageData } from './$types';
  import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { browserIcons, deviceIcons, osIcons } from '$lib/icons';
  import Chart from './Chart.svelte';

  export let data: PageData;

  let selectValue = 1; // days

  const handleSelectValueChanged = (days: number) => {
    if (days === 1) {
      goto(`/dashboard/website/${$page.params.id}`);
      return;
    }
    const today = new Date();
    const dateStart = new Date().setDate(today.getDate() - days);
    const start = new Date(dateStart).toISOString().split('T')[0].toString();
    const dateEnd = today;
    const end = new Date(dateEnd).toISOString().split('T')[0].toString();
    const urlparams = new URLSearchParams({ start, end });
    goto(`/dashboard/website/${$page.params.id}?${urlparams}`);
  };

  $: if (browser) handleSelectValueChanged(selectValue);
</script>


<div class="flex justify-between">
  <div class="mb-4 flex space-x-4">
    <div class="rounded-md bg-white px-6 py-4 dark:bg-gray-500/10">
      <p class="text-3xl font-semibold text-black dark:text-white">{data.pageview_count ?? 0}</p>
      <p class="font-medium">Views</p>
    </div>
    <div class="rounded-md bg-white px-6 py-4 dark:bg-gray-500/10">
      <p class="text-3xl font-semibold text-black dark:text-white">{data.visitor_count ?? 0}</p>
      <p class="font-medium">Visitors</p>
    </div>
  </div>
  <div class="mb-4">
    <select
      bind:value={selectValue}
      name=""
      id=""
      class="rounded-md border border-gray-500/20 px-3 py-2 placeholder:text-gray-500/50 dark:bg-gray-500/10"
    >
      <option value={1}>Today</option>
      <option value={7}>Last 7 days</option>
      <option value={30}>Last 30 days</option>
    </select>
  </div>
</div>

<div class="my-4 rounded-md bg-white px-4 py-3 dark:bg-gray-500/10">
  <Chart data={data.all} />
</div>

<div class="mb-6 grid grid-cols-1 gap-8 text-sm md:grid-cols-2">
  <div class="flex flex-col rounded-md bg-white px-6 py-4 dark:bg-gray-500/10">
    <div class="flex py-1 font-semibold dark:text-white">
      <div class="flex-1">Pages</div>
      <div class="basis-1/5 text-right">Views</div>
    </div>

    {#each data.pages as row}
      <div class="flex py-1">
        <div class="flex-1 truncate">{row.name}</div>
        <div class="flex-shrink-0 basis-1/5 text-right">{row.page_view}</div>
      </div>
    {/each}
  </div>

  <div class="flex flex-col rounded-md bg-white px-6 py-4 dark:bg-gray-500/10">
    <div class="flex py-1 font-semibold dark:text-white">
      <div class="flex-1">Referrers</div>
      <div class="basis-1/5 text-right">Views</div>
    </div>
    {#each data.referer as row}
      <div class="flex py-1">
        <div class="flex-1 truncate">{row.name ?? 'None (Direct)'}</div>
        <div class="flex-shrink-0 basis-1/5 text-right">{row.page_view}</div>
      </div>
    {/each}
  </div>
</div>

<div class="mb-6 grid grid-cols-1 gap-8 text-sm md:grid-cols-3">
  <div class="flex flex-col rounded-md bg-white px-6 py-4 dark:bg-gray-500/10">
    <div class="flex py-1 font-semibold dark:text-white">
      <div class="flex-1">Browsers</div>
      <div class="basis-1/5 text-right">Views</div>
    </div>
    {#each data.browsers as row}
      <div class="flex py-1">
        <div class="flex flex-1 items-center space-x-2">
          <Icon icon={browserIcons[row.name]} />
          <p class="truncate">{row.name}</p>
        </div>
        <div class="flex-shrink-0 basis-1/5 text-right">{row.page_view}</div>
      </div>
    {/each}
  </div>

  <div class="flex flex-col rounded-md bg-white px-6 py-4 dark:bg-gray-500/10">
    <div class="flex py-1 font-semibold dark:text-white">
      <div class="flex-1">Operating Systems</div>
      <div class="basis-1/5 text-right">Visitors</div>
    </div>
    {#each data.os as row}
      <div class="flex py-1">
        <div class="flex flex-1 items-center space-x-2">
          <Icon icon={osIcons[row.name]} />
          <p>{row.name}</p>
        </div>
        <div class="basis-1/5 text-right">{row.page_view}</div>
      </div>
    {/each}
  </div>

  <div class="flex flex-col rounded-md bg-white px-6 py-4 dark:bg-gray-500/10">
    <div class="flex py-1 font-semibold dark:text-white">
      <div class="flex-1">Devices</div>
      <div class="basis-1/5 text-right">Visitors</div>
    </div>
    {#each data.devices as row}
      <div class="flex py-1">
        <div class="flex flex-1 items-center space-x-2">
          <Icon icon={deviceIcons[row.name]} />
          <p>{row.name}</p>
        </div>
        <div class="basis-1/5 text-right">{row.page_view}</div>
      </div>
    {/each}
  </div>
</div>

<div class="mb-6 grid grid-cols-1 gap-8 text-sm md:grid-cols-2">
  <div class="flex flex-col rounded-md bg-white px-6 py-4 dark:bg-gray-500/10">
    <div class="flex py-1 font-semibold dark:text-white">
      <div class="flex-1">Countries</div>
      <div class="basis-1/5 text-right">Visitors</div>
    </div>
    {#each data.countries as row}
      <div class="flex py-1">
        <div class="flex flex-1 items-center space-x-2">
          <Icon icon={`cif:${row.name?.toLowerCase()}`} />
          <p>{row.name ?? 'Unknown'}</p>
        </div>
        <div class="basis-1/5 text-right">{row.page_view}</div>
      </div>
    {/each}
  </div>
</div>

<!-- <div>hello page</div> -->
<!-- <code class="text-sm">{JSON.stringify(data.stats)}</code> -->
