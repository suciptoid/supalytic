<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import type { PageData } from './$types';
  import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

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
    const urlparams = new URLSearchParams({ start, end });
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
    const chartData = data.stats || [];
    const ctx = document.getElementById('chart') as HTMLCanvasElement | null;

    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.map((row) => formatTimeFrame(row.hour!)),
        datasets: [
          {
            label: 'Page views',
            data: chartData.map((row) => row.page_views)
          },
          {
            label: 'Unique visitors',
            data: chartData.map((row) => row.unique_visitors)
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: { display: false }
          }
        }
      }
    });
  });
</script>

<p class="mb-4 text-lg font-semibold">{data.website.domain}</p>

<div class="flex justify-between">
  <div class="mb-4 flex space-x-8">
    <div class="p-2">
      <p class="text-3xl font-semibold text-black dark:text-white">3281</p>
      <p class="font-medium">Views</p>
    </div>
    <div class="p-2">
      <p class="text-3xl font-semibold text-black dark:text-white">500</p>
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
    <div class="flex py-1">
      <div class="flex-1">/</div>
      <div class="basis-1/5 text-right">300</div>
    </div>
    <div class="flex py-1">
      <div class="flex-1">/dashboard</div>
      <div class="basis-1/5 text-right">200</div>
    </div>
    <div class="flex py-1">
      <div class="flex-1">/docs</div>
      <div class="basis-1/5 text-right">100</div>
    </div>
    <div class="flex py-1">
      <div class="flex-1">/pricing</div>
      <div class="basis-1/5 text-right">50</div>
    </div>
    <div class="flex py-1">
      <div class="flex-1">/help</div>
      <div class="basis-1/5 text-right">10</div>
    </div>
    <div class="flex py-1">
      <div class="flex-1">/foo/bar</div>
      <div class="basis-1/5 text-right">10</div>
    </div>
  </div>

  <div class="flex flex-col p-2">
    <div class="flex py-1 font-semibold dark:text-white">
      <div class="flex-1">Referrers</div>
      <div class="basis-1/5 text-right">Views</div>
    </div>
    <div class="flex py-1">
      <div class="flex-1">None</div>
      <div class="basis-1/5 text-right">300</div>
    </div>
    <div class="flex py-1">
      <div class="flex-1">google.com</div>
      <div class="basis-1/5 text-right">200</div>
    </div>
    <div class="flex py-1">
      <div class="flex-1">github.com</div>
      <div class="basis-1/5 text-right">100</div>
    </div>
    <div class="flex py-1">
      <div class="flex-1">twitter.com</div>
      <div class="basis-1/5 text-right">50</div>
    </div>
    <div class="flex py-1">
      <div class="flex-1">reddit.com</div>
      <div class="basis-1/5 text-right">10</div>
    </div>
  </div>
</div>

<div class="mb-6 grid grid-cols-1 gap-8 text-sm md:grid-cols-3">
  <div class="flex flex-col p-2">
    <div class="flex py-1 font-semibold dark:text-white">
      <div class="flex-1">Browsers</div>
      <div class="basis-1/5 text-right">Visitors</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="logos:chrome" />
        <p>Chrome</p>
      </div>
      <div class="basis-1/5 text-right">300</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="logos:firefox" />
        <p>Firefox</p>
      </div>
      <div class="basis-1/5 text-right">200</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="logos:safari" />
        <p>Safari</p>
      </div>
      <div class="basis-1/5 text-right">100</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="logos:opera" />
        <p>Opera</p>
      </div>
      <div class="basis-1/5 text-right">50</div>
    </div>
  </div>

  <div class="flex flex-col p-2">
    <div class="flex py-1 font-semibold dark:text-white">
      <div class="flex-1">Operating System</div>
      <div class="basis-1/5 text-right">Visitors</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="logos:microsoft-windows-icon" />
        <p>Windows</p>
      </div>
      <div class="basis-1/5 text-right">300</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="logos:apple" />
        <p>Mac OS</p>
      </div>
      <div class="basis-1/5 text-right">200</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="logos:linux-tux" />
        <p>Linux</p>
      </div>
      <div class="basis-1/5 text-right">100</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="logos:android-icon" />
        <p>Android</p>
      </div>
      <div class="basis-1/5 text-right">50</div>
    </div>
  </div>

  <div class="flex flex-col p-2">
    <div class="flex py-1 font-semibold dark:text-white">
      <div class="flex-1">Devices</div>
      <div class="basis-1/5 text-right">Visitors</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="twemoji:desktop-computer" />
        <p>Desktop</p>
      </div>
      <div class="basis-1/5 text-right">300</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="twemoji:laptop" />
        <p>Laptop</p>
      </div>
      <div class="basis-1/5 text-right">200</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="twemoji:mobile-phone" />
        <p>Mobile</p>
      </div>
      <div class="basis-1/5 text-right">100</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="twemoji:mobile-phone" />
        <p>Tablet</p>
      </div>
      <div class="basis-1/5 text-right">50</div>
    </div>
  </div>
</div>

<div class="mb-6 grid grid-cols-1 gap-8 text-sm md:grid-cols-2">
  <div class="flex flex-col p-2">
    <div class="flex py-1 font-semibold dark:text-white">
      <div class="flex-1">Countries</div>
      <div class="basis-1/5 text-right">Visitors</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="twemoji:flag-united-states" />
        <p>United States</p>
      </div>
      <div class="basis-1/5 text-right">300</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="twemoji:flag-germany" />
        <p>Germany</p>
      </div>
      <div class="basis-1/5 text-right">200</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="twemoji:flag-netherlands" />
        <p>Netherlands</p>
      </div>
      <div class="basis-1/5 text-right">100</div>
    </div>
    <div class="flex py-1">
      <div class="flex flex-1 items-center space-x-2">
        <Icon icon="twemoji:flag-china" />
        <p>China</p>
      </div>
      <div class="basis-1/5 text-right">50</div>
    </div>
  </div>
</div>

<!-- <div>hello page</div> -->
<!-- <code class="text-sm">{JSON.stringify(data.stats)}</code> -->
