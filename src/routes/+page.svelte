<script lang="ts">
	import Icon from '@iconify/svelte';
	let navMenu = [
		{ label: 'Features', path: '/' },
		{ label: 'Docs', path: '/' },
		{ label: 'Community', path: '/' },
		{ label: 'Pricing', path: '/' }
	];
</script>

<div class="bg-black/95 min-h-screen text-gray-300">
	<div class="container">
		<nav class="flex items-center py-8">
			<p class="text-xl font-bold text-primary-500">Supalytic</p>

			<div class="flex-1 flex justify-center space-x-9">
				{#each navMenu as m}
					<a href={m.path} class="hover:text-primary-500 transition">{m.label}</a>
				{/each}
			</div>

			<div class="flex items-center space-x-4">
				<a href="/" class="hover:text-white transition">
					<Icon icon="akar-icons:twitter-fill" width={20} height={20} />
				</a>
				<a href="/" class="hover:text-white transition">
					<Icon icon="akar-icons:github-fill" width={20} height={20} />
				</a>
			</div>
		</nav>
	</div>

	<main class="" />
</div>
