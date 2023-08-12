<script lang="ts">
  import { browser } from '$app/environment';
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);

  type Metrics = {
    metrics: string;
    name: string;
    unique_visitor: number;
    page_view: number;
    time_interval: string;
  };

  export let data: Metrics[];

  let canvas: HTMLCanvasElement | null;
  let chart: Chart | null = null;

  const formatTimeFrame = (v: string) => {
    const d = new Date(Date.parse(v));
    const options: Intl.DateTimeFormatOptions = {
      // year: 'numeric',
      month: 'short',
      day: '2-digit',
      hourCycle: 'h24',
      hour: '2-digit',
      minute: '2-digit'
    };
    const formatted = new Intl.DateTimeFormat('en', options).format(d);
    return formatted;
  };

  const createChart = () => {
    if (chart) chart.destroy();
    const chartData = data || [];
    // console.log({ canvas });
    if (!canvas) return;

    chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: chartData.map((row) => formatTimeFrame(row.time_interval)),
        datasets: [
          {
            label: 'Unique visitors',
            type: 'line',
            data: chartData.map((row) => row.unique_visitor),
            backgroundColor: '#22C55E55',
            borderColor: '#22C55EAA',
            tension: 0.2,
            // borderRadius: 4,
            borderWidth: 2
            // fill: true
          },
          {
            label: 'Page views',
            type: 'bar',
            data: chartData.map((row) => row.page_view),
            backgroundColor: '#1CA5F544',
            borderColor: '#1CA5F5AA',
            // tension: 0.2,
            borderRadius: 4,
            borderWidth: 1
            // fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { display: false }
            // stacked: true
          },
          y: {
            beginAtZero: true,
            grid: { display: false, drawTicks: false },
            border: { display: false },
            ticks: { display: false }
          }
        }
      }
    });
  };

  $: if (browser && data && canvas) createChart();
</script>

<div class="relative mb-4 h-[400px] w-full">
  <canvas bind:this={canvas} class="w-full" />
</div>
