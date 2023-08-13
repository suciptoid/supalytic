<script lang="ts">
  import { page } from '$app/stores';
  console.log('page', page);

  let code = `<script defer data-endpoint="${$page.url.origin}/track/${$page.params.id}" src="${$page.url.origin}/sdk.js"></`;
  code += 'script>';
</script>

<div class="min-h-[calc(100vh-200px)] rounded-md bg-white px-4 py-8 dark:bg-gray-500/10">
  <h1 class="my-4 text-lg font-medium">Add Script</h1>
  <div class="flex flex-wrap items-center text-sm">
    <div
      class="full mr-2 flex h-6 w-6 items-center justify-center rounded-full border bg-gray-100 text-xs font-bold dark:bg-gray-400/10"
    >
      1
    </div>
    Add this script to your website in the
    <div class="text-mono mx-1 rounded-md border bg-gray-100 px-1 dark:bg-gray-400/10">
      &lt;head&gt;....&lt;/head&gt;
    </div>
    section of your website.
  </div>
  <div class="my-3 overflow-auto rounded-md border p-3 font-mono text-xs">
    {code}
  </div>
  <div class="my-2 flex flex-wrap items-center text-sm">
    <div
      class="full mr-2 flex h-6 w-6 items-center justify-center rounded-full border bg-gray-100 text-xs font-bold dark:bg-gray-400/10"
    >
      2
    </div>
    Wait events data send to your dashboard.
  </div>
  <div class="my-2 flex flex-wrap items-center text-sm">
    <div
      class="full mr-2 flex h-6 w-6 items-center justify-center rounded-full border bg-gray-100 text-xs font-bold dark:bg-gray-400/10"
    >
      3
    </div>
    <a href={`/dashboard/website/{$page.params.id}`}>Go to dashboard.</a>
  </div>
</div>
