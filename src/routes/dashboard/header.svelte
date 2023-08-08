<script lang="ts">
  import ThemeToggler from '$lib/components/ThemeToggler.svelte';
  import Icon from '@iconify/svelte';
</script>

<header class="">
  <div class="container flex items-center justify-between py-8">
    <a href="/dashboard" class="flex items-center space-x-2 text-xl font-semibold text-primary-500">
      <span>Supalytic</span>
      <span class="text-base font-normal text-gray-400">Dashboard</span>
    </a>
    <div id="header-nav" class="flex flex-shrink-0 items-center gap-4 text-sm font-medium">
      <ThemeToggler />
      <a href="/dashboard/settings">
        <Icon icon="akar-icons:gear" width={20} height={20} />
      </a>
    </div>
  </div>
</header>
