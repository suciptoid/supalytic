<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data;
</script>

<svelte:head>
	<title>Auth</title>
</svelte:head>

<div class="w-full max-w-6xl m-auto flex-center flex">
	<div class="login">
		<Auth
			additionalData={data}
			supabaseClient={data.supabase}
			view="magic_link"
			redirectTo={`${data.url}/auth/redirect`}
			showLinks={false}
			appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
		/>
	</div>
</div>
