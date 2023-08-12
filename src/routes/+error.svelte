<script>
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Error {$page.status} | Supalytic</title>
</svelte:head>
<div class="flex min-h-screen w-full flex-col items-center justify-center dark:bg-black/90">
  <div class="p-10 text-center">
    <h1 class="text-4xl font-extrabold text-gray-400">{$page.status}</h1>
    <p class="text-gray-500">{$page.error?.message}</p>
    <a href="/" class="py-4 text-sm font-semibold text-blue-500 hover:text-blue-600">Go Home</a>
  </div>
</div>
