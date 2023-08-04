<script lang="ts">
	import { onMount } from 'svelte';

	let isDarkTheme = false;

	onMount(() => {
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			isDarkTheme = true;
			document.documentElement.classList.add('dark');
		} else {
			isDarkTheme = false;
			document.documentElement.classList.remove('dark');
		}
	});

	const toggleTheme = () => {
		isDarkTheme = !isDarkTheme;
    if(isDarkTheme){
			document.documentElement.classList.add('dark');
    }else{
			document.documentElement.classList.remove('dark');
    }
		localStorage.theme = isDarkTheme ? 'dark' : 'light';
	};

	const preferOsTheme = () => {
		// Whenever the user explicitly chooses to respect the OS preference
		localStorage.removeItem('theme');
	};
</script>

<button on:click={toggleTheme}>
	{#if isDarkTheme}
		dark
	{:else}
		light
	{/if}
</button>
