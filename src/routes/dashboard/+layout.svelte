<script>
  import Header from './header.svelte';
</script>

<svelte:head>
  <title>Supalytic | Dashboard</title>
</svelte:head>

<div class="dark:bg-black/90 dark:text-gray-400 min-h-screen font-dashsans">
  <Header />

  <main class="container">
    <slot />
  </main>
</div>
