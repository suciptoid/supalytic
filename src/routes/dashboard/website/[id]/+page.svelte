<script lang="ts">
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import Chart from './Chart.svelte';
  import MetricCard from './MetricCard.svelte';
  import WorldMap from './WorldMap.svelte';

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
  <MetricCard title="Pages" type="page" data={data.pages} />

  <MetricCard title="Referrers" type="referer" data={data.referer} />
</div>

<div class="mb-6 grid grid-cols-1 gap-8 text-sm md:grid-cols-3">
  <MetricCard title="Browsers" type="browser" data={data.browsers} />

  <MetricCard title="Operating System" type="os" data={data.os} />

  <MetricCard title="Devices" type="device" data={data.devices} />
</div>

<div class="mb-6 grid grid-cols-1 gap-8 text-sm md:grid-cols-2">
  <MetricCard title="Countries" type="country" data={data.countries} />
  <WorldMap />
</div>
