<script lang="ts">
  import dayjs from '$lib/day';
  import { page } from '$app/stores';
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  type Preset = {
    id: string;
    label: string;
    start: string;
    end: string;
  };

  let active = 'today';
  let open = false;
  let presets: Preset[] = [];

  onMount(() => {
    // get now from browser
    const now = dayjs();

    const format = 'YYYY-MM-DD HH:mm:ss';
    presets = [
      {
        id: 'today',
        label: 'Today',
        start: now.startOf('day').format(format),
        end: now.endOf('day').format(format)
      },
      {
        id: 'yesterday',
        label: 'Yesterday',
        start: now.subtract(1, 'day').startOf('day').format(format),
        end: now.subtract(1, 'day').endOf('day').format(format)
      },
      {
        id: 'last_30d',
        label: 'Last 30 Day',
        start: now.subtract(30, 'day').startOf('day').format(format),
        end: now.subtract(1, 'day').endOf('day').format(format)
      },
      {
        id: 'this_month',
        label: 'This Month',
        start: now.startOf('month').format(format),
        end: now.endOf('month').format(format)
      }
    ];
  });

  $: activeLabel = presets.find((p) => p.id === active)?.label || 'Today';

  const onSelectPreset = (preset: Preset) => {
    open = false;
    active = preset.id;
  };
</script>

<div class="relative">
  <button
    class="rounded-md border border-gray-500/20 bg-white px-6 py-2 placeholder:text-gray-500/50 dark:bg-gray-500/10"
    on:click={() => (open = !open)}
  >
    {activeLabel}
  </button>

  {#if open}
    <div
      class="absolute right-0 top-[45px] z-50 flex max-h-[300px] min-w-[200px] flex-col justify-start overflow-y-auto rounded border bg-white text-sm shadow-sm"
    >
      {#each presets as preset}
        <a
          on:click={() => onSelectPreset(preset)}
          href={`/dashboard/website/${$page.params.id}?start=${preset.start}&end=${preset.end}`}
          class="preset cursor-pointer px-3 py-2 text-start hover:bg-gray-200"
        >
          {preset.label}
        </a>
      {/each}
    </div>
  {/if}
</div>
