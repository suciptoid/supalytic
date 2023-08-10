<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import type { PageData } from './$types';

  Chart.register(...registerables);

  export let data: PageData;

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

<div class="">
  <select
    name=""
    id=""
    class="rounded-md border border-gray-500/20 px-3 py-2 placeholder:text-gray-500/50 dark:bg-gray-500/10"
  >
    <option value="">Today</option>
    <option value="">Yesterday</option>
  </select>
</div>

<div class="relative h-[400px] w-full">
  <canvas id="chart" class="w-full" />
</div>

<!-- <div>hello page</div> -->
<!-- <code class="text-sm">{JSON.stringify(data.stats)}</code> -->
