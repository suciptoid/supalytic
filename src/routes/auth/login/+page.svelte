<script lang="ts">
  import { Auth } from '@supabase/auth-ui-svelte';
  import { ThemeSupa } from '@supabase/auth-ui-shared';

  export let data;
</script>

<svelte:head>
  <title>Supalytic | Login</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-black/90 font-dashsans text-gray-400">
  <div class="flex w-full max-w-md flex-col">
    <p class="text-center text-2xl font-semibold text-primary-500 mb-4">Supalytic</p>
    <!-- <form action="">

			<fieldset>
				<input type="email" class="px-3 py-2 rounded-md" placeholder="Your email">
			</fieldset>
		</form> -->
    <!-- <Auth
				additionalData={data}
				supabaseClient={data.supabase}
				view="magic_link"
				redirectTo={`${data.url}/auth/redirect`}
				showLinks={false}
				appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
			/> -->
    <div class="flex-1">
      <Auth
        additionalData={data}
        supabaseClient={data.supabase}
        view="magic_link"
        providers={['github']}
        redirectTo={`${data.url}/auth/redirect`}
        showLinks={false}
        appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
      />
    </div>
  </div>
</div>
