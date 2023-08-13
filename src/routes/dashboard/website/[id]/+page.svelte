<script lang="ts">
  import type { PageData } from './$types';
  import Chart from './Chart.svelte';
  import MetricCard from './MetricCard.svelte';
  import DatePreset from './DatePreset.svelte';

  export let data: PageData;
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
    <DatePreset />
  </div>
</div>

<div class="my-4 rounded-md bg-white px-4 py-3 dark:bg-gray-500/10">
  <Chart data={data.all} start={data.start} end={data.end} group={data.time_group} />
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
</div>
