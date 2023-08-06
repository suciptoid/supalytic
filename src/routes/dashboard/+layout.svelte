<script>
	import Header from './header.svelte';
</script>

<svelte:head>
	<title>Supalytic | Dashboard</title>
</svelte:head>

<Header />

<main class="m-auto w-full max-w-6xl">
	<slot />
</main>
