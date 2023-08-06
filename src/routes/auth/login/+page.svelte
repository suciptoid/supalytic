<script lang="ts">
  import { Auth } from '@supabase/auth-ui-svelte';
  import { ThemeSupa } from '@supabase/auth-ui-shared';

  export let data;
</script>

<svelte:head>
  <title>Supalytic | Login</title>
</svelte:head>

<div class="flex min-h-screen w-full items-center justify-center">
  <div class="flex-center flex w-full max-w-lg">
    <!-- <form action="">

			<fieldset>
				<input type="email" class="px-3 py-2 rounded-md" placeholder="Your email">
			</fieldset>
		</form> -->
    <div class="login mx-auto">
      <!-- <Auth
				additionalData={data}
				supabaseClient={data.supabase}
				view="magic_link"
				redirectTo={`${data.url}/auth/redirect`}
				showLinks={false}
				appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
			/> -->
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
