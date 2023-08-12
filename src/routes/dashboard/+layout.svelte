<script>
  import Header from './header.svelte';
</script>

<svelte:head>
  <title>Supalytic | Dashboard</title>
</svelte:head>

<div
  class="min-h-screen bg-gray-100 font-dashsans text-gray-700 dark:bg-black/90 dark:text-gray-400"
>
  <Header />

  <main class="container min-h-[calc(100vh-200px)]">
    <slot />
  </main>

  <div class="container py-9">
    <p class="text-sm font-semibold">Supalytic</p>
  </div>
</div>
