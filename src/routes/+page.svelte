<script lang="ts">
	import Icon from '@iconify/svelte';
	let navMenu = [
		{ label: 'Features', path: '/' },
		{ label: 'Docs', path: '/' },
		{ label: 'Community', path: '/' },
		{ label: 'Pricing', path: '/' }
	];
</script>

<div class="bg-black/95 min-h-screen text-gray-400">
	<div class="container">
		<nav class="flex items-center py-8">
			<p class="text-xl font-semibold text-primary-500">Supalytic</p>

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

		<main>
			<div class="py-20 flex">
				<div class="basis-1/2 space-y-8">
					<h1 class="text-6xl font-semibold text-white">Unlock the Power of Your Data</h1>
					<p class="text-lg">
						Supalytic is the ultimate web analytics tool designed to empower businesses of all
						sizes. Dive deep into your website's performance, uncover valuable insights, and make
						data-driven decisions like never before.
					</p>
					<div>
						<a
							href="/"
							class="inline-block py-3 px-6 rounded-global border-2 hover:bg-primary-500 text-white border-primary-500 transition"
							>Get started</a
						>
					</div>
				</div>
			</div>

			<div class="py-20 flex">
				<div class="basis-2/3 space-y-8">
					<h2 class="text-4xl font-semibold text-white">Real-Time Tracking and Reporting</h2>
					<p class="text-lg">
						Stay ahead of the game with real-time tracking and reporting. Instantly monitor visitor
						behavior, traffic sources, conversion rates, and more, all at your fingertips. With
						Supalytic, you'll never miss a beat.
					</p>
				</div>
			</div>

			<div class="py-20 flex">
				<div class="basis-2/3 space-y-8">
					<h2 class="text-4xl font-semibold text-white">User-Friendly Interface</h2>
					<p class="text-lg">
						No technical expertise required! Our user-friendly interface makes it easy for anyone to
						navigate and understand complex data. Effortlessly create custom reports and dashboards
						tailored to your unique needs.
					</p>
				</div>
			</div>
		</main>
	</div>
</div>
