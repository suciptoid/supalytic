<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { LayoutData } from './$types';
  import Tabs from './Tabs.svelte';

  export let data: LayoutData;
</script>

<div class="mb-6">
  <p class="text-lg font-semibold">{data.website.name}</p>
  <div class="flex space-x-1 items-center text-gray-500">
    <Icon icon="akar-icons:globe" width={10} height={10} />
    <p class="">{data.website.domain}</p>
  </div>
</div>

<Tabs />

<slot />
