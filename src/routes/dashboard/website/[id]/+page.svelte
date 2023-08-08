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
    const chartData = data.browsers || [];
    const ctx = document.getElementById('chart') as HTMLCanvasElement | null;

    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.map((row) => formatTimeFrame(row.timeframe)),
        datasets: [
          {
            label: 'Page views',
            data: chartData.map((row) => row.count)
          }
        ]
      },
      options: {
        scales: {
          x: {
            grid: { display: false }
          }
        }
      }
    });
  });
</script>

<p class="mb-4 text-lg font-semibold">Domain name</p>

<div class="">
  <select name="" id="" class="rounded-global border border-gray-300 px-4 py-2">
    <option value="">Today</option>
    <option value="">Yesterday</option>
  </select>
</div>

<canvas id="chart" />

<div>hello page</div>
<code>{JSON.stringify(data.browsers)}</code>
