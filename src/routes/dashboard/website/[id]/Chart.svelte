<script lang="ts">
  import { browser } from '$app/environment';
  import { Chart, registerables } from 'chart.js';
  import dayjs from '$lib/day';
  Chart.register(...registerables);

  type Metrics = {
    metrics: string;
    name: string;
    unique_visitor: number;
    page_view: number;
    time_interval: string;
  };

  export let data: Metrics[];
  export let start: string;
  export let end: string;
  export let group: 'hourly' | 'daily' | 'monthly' | 'yearly' | undefined | string = 'hourly';

  let canvas: HTMLCanvasElement | null;
  let chart: Chart | null = null;

  const createChart = () => {
    if (chart) chart.destroy();
    const chartData = data || [];
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    let diffGroup: 'year' | 'month' | 'day' | 'hour' | 'minute' =
      group == 'yearly'
        ? 'year'
        : group == 'monthly'
        ? 'month'
        : group == 'daily'
        ? 'day'
        : group == 'hourly'
        ? 'hour'
        : 'minute';

    let diff = endDate.diff(startDate, diffGroup);

    if (group == 'hourly') {
      diff = diff + 1;
    }

    const labelFormat =
      group == 'yearly'
        ? 'YYYY'
        : group == 'monthly'
        ? 'MMM YYYY'
        : group == 'daily'
        ? 'DD MMM YYYY'
        : 'DD MMM YYYY HH:mm';
    // labels is start from end
    const base = Array.from({ length: diff }, (_, index) => index);
    const labels = base.map((_, index) => {
      const date = startDate.clone().add(index, diffGroup);
      return date.format(labelFormat);
    });
    const groupedData = base.map((_, index) => {
      const date = startDate.clone().add(index, diffGroup);
      const dateEnd = date.clone().add(1, diffGroup);

      // get data matched wit label date
      const d = chartData.find((row) => {
        const matched = dayjs(row.time_interval).isBetween(date, dateEnd, diffGroup, '[]');

        return matched;
      });

      return {
        pv: d?.page_view ?? 0,
        uv: d?.unique_visitor ?? 0
      };
    });

    if (!canvas) return;

    chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Unique visitors',
            type: 'line',
            data: groupedData.map((r) => r.uv),
            backgroundColor: '#22C55E55',
            borderColor: '#22C55EAA',
            tension: 0.15,
            borderWidth: 2
          },
          {
            label: 'Page views',
            type: 'bar',
            data: groupedData.map((r) => r.pv),
            backgroundColor: '#1CA5F544',
            borderColor: '#1CA5F5AA',
            borderRadius: 4,
            borderWidth: 1
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

  $: if (browser && data && canvas && group) createChart();
</script>

<div class="relative mb-4 h-[300px] w-full">
  <canvas bind:this={canvas} class="w-full" />
</div>
