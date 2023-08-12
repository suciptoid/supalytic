<script lang="ts">
  type Tab = {
    label: string;
    path: string;
  };
  const tabs: Tab[] = [
    { label: 'Statistics', path: '/' },
    { label: 'Setup', path: '/setup' },
    { label: 'Settings', path: '/settings' }
  ];
</script>

<div class="my-4 flex space-x-2 text-sm">
  {#each tabs as tab}
    <a
      href={tab.path}
      class="rounded bg-gray-500/10 px-4 py-2 hover:bg-gray-500/30 {tab.path === '/'
        ? 'bg-gray-500/30'
        : 'text-gray-500'}">{tab.label}</a
    >
  {/each}
</div>
