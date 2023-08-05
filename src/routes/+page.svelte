<script lang="ts">
	import MobileDrawer from '$lib/components/MobileDrawer.svelte';
	import Icon from '@iconify/svelte';
	let navMenu = [
		{ label: 'Features', path: '/' },
		{ label: 'Docs', path: '/' },
		{ label: 'Community', path: '/' },
		{ label: 'Pricing', path: '/' }
	];
</script>

<svelte:head>
	<title>Supalytic - Your Complete Web Analytics Solution!</title>
</svelte:head>

<div class="bg-black/95 min-h-screen text-gray-400">
	<div class="container">
		<nav class="flex items-center justify-between py-8">
			<MobileDrawer />
			<p class="text-xl font-semibold text-primary-500">Supalytic</p>

			<div class="hidden flex-1 md:flex justify-center space-x-9">
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
				<div class="lg:basis-1/2 space-y-8">
					<h1 class="text-6xl font-semibold text-white">Unlock the Power of Your Data</h1>
					<p class="text-lg">
						Supalytic is the ultimate web analytics tool designed to empower businesses of all
						sizes. Dive deep into your website's performance, uncover valuable insights, and make
						data-driven decisions like never before.
					</p>
					<div>
						<a
							href="/dashboard"
							class="inline-block py-3 px-6 rounded-global border-[3px] hover:bg-primary-500 text-white border-primary-500 transition"
							>Get started</a
						>
					</div>
				</div>
			</div>

			<div class="py-20 flex">
				<div class="lg:basis-2/3 space-y-8">
					<h2 class="text-4xl font-semibold text-white">Real-Time Tracking and Reporting</h2>
					<p class="text-lg">
						Stay ahead of the game with real-time tracking and reporting. Instantly monitor visitor
						behavior, traffic sources, conversion rates, and more, all at your fingertips. With
						Supalytic, you'll never miss a beat.
					</p>
				</div>
			</div>

			<div class="py-20 flex">
				<div class="lg:basis-2/3 space-y-8">
					<h2 class="text-4xl font-semibold text-white">User-Friendly Interface</h2>
					<p class="text-lg">
						No technical expertise required! Our user-friendly interface makes it easy for anyone to
						navigate and understand complex data. Effortlessly create custom reports and dashboards
						tailored to your unique needs.
					</p>
				</div>
			</div>

			<div class="py-20 flex">
				<div class="lg:basis-2/3 space-y-8">
					<h2 class="text-4xl font-semibold text-white">Comprehensive Data Visualization</h2>
					<p class="text-lg">
						Data should be more than just numbers - it should tell a story. Supalytic's intuitive
						data visualization tools transform raw data into beautiful charts and graphs, making it
						simple to grasp trends and patterns at a glance.
					</p>
				</div>
			</div>

			<div class="py-20 flex">
				<div class="lg:basis-2/3 space-y-8">
					<h2 class="text-4xl font-semibold text-white">Actionable Insights, Always</h2>
					<p class="text-lg">
						Supalytic doesn't just provide data; it delivers actionable insights. Identify
						strengths, pinpoint weaknesses, and seize new opportunities to optimize your website's
						performance and drive growth.
					</p>
				</div>
			</div>

			<div class="py-20 flex">
				<div class="lg:basis-2/3 space-y-8">
					<h2 class="text-4xl font-semibold text-white">
						Protecting Your Data, Securing Your Trust
					</h2>
					<p class="text-lg">
						We take data security seriously. Supalytic implements state-of-the-art security measures
						to safeguard your data, ensuring your trust and confidence in our platform.
					</p>
				</div>
			</div>

			<div class="py-20 flex">
				<div class="lg:basis-2/3 space-y-8">
					<h2 class="text-4xl font-semibold text-white">Unleash the Potential of Your Website</h2>
					<p class="text-lg">
						Are you ready to unleash the true potential of your website? Join thousands of
						businesses already harnessing the power of Supalytic and take your web analytics to a
						whole new level.
					</p>
				</div>
			</div>

			<div class="py-20 flex">
				<div class="lg:basis-2/3 space-y-8">
					<p class="text-lg">
						Sign up now for a FREE trial and experience the difference firsthand. Let Supalytic be
						your trusted companion on the journey to online success.
					</p>
				</div>
			</div>
		</main>
	</div>
</div>
