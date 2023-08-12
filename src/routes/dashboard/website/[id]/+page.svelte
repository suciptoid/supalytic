<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import type { PageData } from './$types';
  import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { browserIcons, deviceIcons, osIcons } from '$lib/icons';

  Chart.register(...registerables);

  export let data: PageData;

  let selectValue = 1; // days

  const handleSelectValueChanged = (days: number) => {
    // if (days === 1) {
    //   goto(`/dashboard/website/${$page.params.id}`);
    //   return;
    // }
    const today = new Date();
    const dateStart = new Date().setDate(today.getDate() - days);
    const start = new Date(dateStart).toISOString().split('T')[0].toString();
    const dateEnd = today;
    const end = new Date(dateEnd).toISOString().split('T')[0].toString();
    const urlparams = new URLSearchParams({ start: data.start, end: data.end });
    goto(`/dashboard/website/${$page.params.id}?${urlparams}`);
  };

  $: if (browser) handleSelectValueChanged(selectValue);

  const formatTimeFrame = (v: string) => {
    const d = new Date(Date.parse(v));
    const options: Intl.DateTimeFormatOptions = {
      hourCycle: 'h24',
      hour: '2-digit',
      minute: '2-digit'
    };
    const formatted = new Intl.DateTimeFormat('en', options).format(d);
    return formatted;
  };

  // todo:
  // - rerender chart on datachange
  // - format date x axes and tooltip
  onMount(() => {
    const chartData = data.all || [];
    const ctx = document.getElementById('chart') as HTMLCanvasElement | null;

    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.map((row) => formatTimeFrame(row.time_interval!)),
        datasets: [
          {
            label: 'Page views',
            data: chartData.map((row) => row.page_view)
          },
          {
            label: 'Unique visitors',
            data: chartData.map((row) => row.unique_visitor)
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false }
          }
        }
      }
    });
  });
</script>

<p class="mb-4 px-2 text-lg font-semibold">{data.website.domain}</p>

<div class="flex justify-between">
  <div class="mb-4 flex space-x-4">
    <div class="rounded p-2 px-6">
      <p class="text-3xl font-semibold text-black dark:text-white">{data.pageview_count ?? 0}</p>
      <p class="font-medium">Views</p>
    </div>
    <div class="p-2 px-6">
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

<div class="relative mb-4 h-[400px] w-full">
  <canvas id="chart" class="w-full" />
</div>

<div class="mb-6 grid grid-cols-1 gap-8 text-sm md:grid-cols-2">
  <div class="flex flex-col p-2">
    <div class="flex py-1 font-semibold dark:text-white">
      <div class="flex-1">Pages</div>
      <div class="basis-1/5 text-right">Views</div>
    </div>

    {#each data.url as url}
      <div class="flex py-1">
        <div class="flex-1 truncate">{url.name}</div>
        <div class="flex-shrink-0 basis-1/5 text-right">{url.page_view}</div>
      </div>
    {/each}
  </div>

  <div class="flex flex-col p-2">
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
  <div class="flex flex-col p-2">
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

  <div class="flex flex-col p-2">
    <div class="flex py-1 font-semibold dark:text-white">
      <div class="flex-1">Operating System</div>
      <div class="basis-1/5 text-right">Visitors</div>
    </div>
    {#each data.os as row}
      <div class="flex py-1">
        <div class="flex flex-1 items-center space-x-2">
          <Icon icon={osIcons[row.name]}/>
          <p>{row.name}</p>
        </div>
        <div class="basis-1/5 text-right">{row.page_view}</div>
      </div>
    {/each}
  </div>

  <div class="flex flex-col p-2">
    <div class="flex py-1 font-semibold dark:text-white">
      <div class="flex-1">Devices</div>
      <div class="basis-1/5 text-right">Visitors</div>
    </div>
    {#each data.devices as row}
      <div class="flex py-1">
        <div class="flex flex-1 items-center space-x-2">
          <Icon icon={deviceIcons[row.name]}/>
          <p>{row.name}</p>
        </div>
        <div class="basis-1/5 text-right">{row.page_view}</div>
      </div>
    {/each}
  </div>
</div>

<div class="mb-6 grid grid-cols-1 gap-8 text-sm md:grid-cols-2">
  <div class="flex flex-col p-2">
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
