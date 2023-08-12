<script lang="ts">
  import ThemeToggler from '$lib/components/ThemeToggler.svelte';
  import Icon from '@iconify/svelte';

  let showSettings = false;
</script>

<header class="bg-white shadow-sm dark:bg-slate-800">
  <div class="container flex items-center justify-between py-8">
    <a href="/dashboard" class="flex items-center space-x-2 text-xl font-semibold text-primary-500">
      <span>Supalytic</span>
      <span class="text-base font-normal text-gray-400">Dashboard</span>
    </a>
    <div id="header-nav" class="flex flex-shrink-0 items-center gap-4 text-sm font-medium">
      <ThemeToggler />
      <div class="relative">
        <a
          href="/dashboard/settings"
          on:click|preventDefault|stopPropagation={() => {
            showSettings = !showSettings;
            document.addEventListener('click', () => (showSettings = false));
          }}
        >
          <Icon icon="akar-icons:gear" width={20} height={20} />
        </a>
        <div
          class="absolute {showSettings
            ? 'flex'
            : 'hidden'} right-0 top-6 min-w-[100px] rounded-lg bg-gray-50 py-2 shadow-md dark:bg-[#222]"
        >
          <a href="/auth/logout" class="w-full px-4 py-2 hover:bg-gray-500/10">Logout</a>
        </div>
      </div>
    </div>
  </div>
</header>
