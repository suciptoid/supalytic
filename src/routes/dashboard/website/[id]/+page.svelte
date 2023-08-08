<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div>hello page</div>
<code>{JSON.stringify(data.browsers)}</code>
