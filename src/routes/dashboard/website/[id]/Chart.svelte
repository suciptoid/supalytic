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

  let chart: Chart | null = null

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

  const createChart = () => {
    if(chart) chart.destroy();
    const chartData = data || [];
    const ctx = document.getElementById('chart') as HTMLCanvasElement | null;
    if (!ctx) return;

    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.map((row) => formatTimeFrame(row.time_interval)),
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
  };

  $: if (browser && data) createChart();
</script>

<div class="relative mb-4 h-[400px] w-full">
  <canvas id="chart" class="w-full" />
</div>
