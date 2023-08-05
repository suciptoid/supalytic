<script lang="ts">
	import Icon from '@iconify/svelte';

	let isShow = false;

	$: className = isShow ? 'translate-x-0' : '-translate-x-full';
</script>

<a href="#" on:click={() => (isShow = true)} class="md:hidden hover:text-white transition">
	<Icon icon="akar-icons:three-line-horizontal" width={20} height={20} />
</a>

<div class="{className} transition fixed top-0 left-0 bottom-0 right-0 bg-black">
	<div class="px-4 py-4">
		<a href="#" on:click={() => (isShow = false)} class="md:hidden hover:text-white transition">
			<Icon icon="akar-icons:three-line-horizontal" width={20} height={20} />
		</a>
	</div>
  menu goes here
</div>

