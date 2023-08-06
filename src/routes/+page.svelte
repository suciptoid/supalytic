<script lang="ts">
  import MobileDrawer from '$lib/components/MobileDrawer.svelte';
  import Button from '$lib/components/button/Button.svelte';
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

<div class="min-h-screen bg-black/95 font-landingsans text-gray-400">
  <div class="container">
    <nav class="flex items-center justify-between py-8">
      <MobileDrawer>
        <div class="flex flex-1 flex-col">
          {#each navMenu as m}
            <a href={m.path} class="p-4 transition hover:text-primary-500">{m.label}</a>
          {/each}
          <a href="/dashboard" class="p-4 transition hover:text-primary-500">Dashboard</a>
        </div>
      </MobileDrawer>

      <p class="text-xl font-semibold text-primary-500">Supalytic</p>

      <div class="hidden flex-1 justify-center space-x-9 md:flex">
        {#each navMenu as m}
          <a href={m.path} class="font-semibold transition hover:text-primary-500">{m.label}</a>
        {/each}
      </div>

      <div class="flex items-center space-x-4">
        <div class="hidden lg:block">
          <Button size="sm" href="/dashboard">Dashboard</Button>
        </div>
        <a href="https://github.com/suciptoid/supalytic" class="transition hover:text-white">
          <Icon icon="akar-icons:github-fill" width={20} height={20} />
        </a>
      </div>
    </nav>

    <main>
      <div class="flex py-20">
        <div class="space-y-8 lg:basis-1/2">
          <h1 class="text-6xl font-semibold text-white">Unlock the Power of Your Data</h1>
          <p class="text-lg">
            Supalytic is the ultimate web analytics tool designed to empower businesses of all
            sizes. Dive deep into your website's performance, uncover valuable insights, and make
            data-driven decisions like never before.
          </p>
          <div>
            <Button primary href="/dashboard">Get started</Button>
          </div>
        </div>
      </div>

      <div class="flex py-20">
        <div class="space-y-8 lg:basis-2/3">
          <h2 class="text-4xl font-semibold text-white">Real-Time Tracking and Reporting</h2>
          <p class="text-lg">
            Stay ahead of the game with real-time tracking and reporting. Instantly monitor visitor
            behavior, traffic sources, conversion rates, and more, all at your fingertips. With
            Supalytic, you'll never miss a beat.
          </p>
        </div>
      </div>

      <div class="flex py-20">
        <div class="space-y-8 lg:basis-2/3">
          <h2 class="text-4xl font-semibold text-white">User-Friendly Interface</h2>
          <p class="text-lg">
            No technical expertise required! Our user-friendly interface makes it easy for anyone to
            navigate and understand complex data. Effortlessly create custom reports and dashboards
            tailored to your unique needs.
          </p>
        </div>
      </div>

      <div class="flex py-20">
        <div class="space-y-8 lg:basis-2/3">
          <h2 class="text-4xl font-semibold text-white">Comprehensive Data Visualization</h2>
          <p class="text-lg">
            Data should be more than just numbers - it should tell a story. Supalytic's intuitive
            data visualization tools transform raw data into beautiful charts and graphs, making it
            simple to grasp trends and patterns at a glance.
          </p>
        </div>
      </div>

      <div class="flex py-20">
        <div class="space-y-8 lg:basis-2/3">
          <h2 class="text-4xl font-semibold text-white">Actionable Insights, Always</h2>
          <p class="text-lg">
            Supalytic doesn't just provide data; it delivers actionable insights. Identify
            strengths, pinpoint weaknesses, and seize new opportunities to optimize your website's
            performance and drive growth.
          </p>
        </div>
      </div>

      <div class="flex py-20">
        <div class="space-y-8 lg:basis-2/3">
          <h2 class="text-4xl font-semibold text-white">
            Protecting Your Data, Securing Your Trust
          </h2>
          <p class="text-lg">
            We take data security seriously. Supalytic implements state-of-the-art security measures
            to safeguard your data, ensuring your trust and confidence in our platform.
          </p>
        </div>
      </div>

      <div class="flex py-20">
        <div class="space-y-8 lg:basis-2/3">
          <h2 class="text-4xl font-semibold text-white">Unleash the Potential of Your Website</h2>
          <p class="text-lg">
            Are you ready to unleash the true potential of your website? Join thousands of
            businesses already harnessing the power of Supalytic and take your web analytics to a
            whole new level.
          </p>
        </div>
      </div>

      <div class="flex flex-col items-center space-y-4 py-10">
        <p>Get the latest releases and news about Supalytic with our newsletter.</p>
        <form>
          <div class="flex justify-center space-x-2">
            <input
              type="text"
              placeholder="email"
              class="rounded-global border border-gray-500/30 bg-gray-500/10 px-4 py-2"
            />
            <Button primary>Subscribe</Button>
          </div>
        </form>
      </div>

      <div class="flex flex-col justify-between space-y-4 py-20 lg:flex-row">
        <div class="space-y-4 lg:basis-2/3">
          <h2 class="text-lg font-semibold uppercase text-white">Getting Started</h2>
          <p class="text-lg">
            Sign up now for a FREE and experience the difference firsthand. Let Supalytic be your
            trusted companion on the journey to online success.
          </p>
        </div>
        <div class="flex items-center justify-center space-x-4">
          <Button primary href="/dashboard">Get started</Button>
          <Button href="/dashboard">Learn more</Button>
        </div>
      </div>
    </main>
  </div>

  <footer>
    <div class="h-[1px] bg-gradient-to-r from-transparent via-gray-500/30 to-transparent" />
    <div
      class="container flex flex-col items-center justify-between space-y-4 py-4 text-sm lg:flex-row lg:space-y-0 lg:py-8"
    >
      <div>© 2023 Supalytic</div>
      <div class="flex flex-1 justify-center space-x-4">
        {#each navMenu as m}
          <a href={m.path} class="transition hover:text-primary-500">{m.label}</a>
        {/each}
      </div>
      <div>
        <a href="https://github.com/suciptoid/supalytic" class="transition hover:text-white">
          <Icon icon="akar-icons:github-fill" width={20} height={20} />
        </a>
      </div>
    </div>
  </footer>
</div>
