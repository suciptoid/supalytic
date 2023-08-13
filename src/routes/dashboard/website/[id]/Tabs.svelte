<script lang="ts">
  import { page } from '$app/stores';

  type Tab = {
    label: string;
    path: string;
  };

  // const url = $page.url;
  const tabs: Tab[] = [
    { label: 'Statistics', path: `/dashboard/website/${$page.params.id}` },
    { label: 'Settings', path: `/dashboard/website/${$page.params.id}/setup` }
    // { label: 'Settings', path: `/dashboard/website/${$page.params.id}/setting` }
  ];
</script>

<div class="my-6 flex space-x-2 text-sm">
  {#each tabs as tab}
    <a
      href={tab.path}
      class="rounded bg-gray-500/10 px-4 py-2 hover:bg-gray-500/30 {tab.path === $page.url.pathname
        ? 'bg-white dark:bg-gray-500/30'
        : 'text-gray-500'}">{tab.label}</a
    >
  {/each}
</div>
