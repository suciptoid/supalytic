<script lang="ts">
  import { page } from '$app/stores';
  console.log('page', page);

  let code = `<script defer data-endpoint="${$page.url.origin}/track/${$page.params.id}" src="${$page.url.origin}/sdk.js"></`;
  code += 'script>';
</script>

<div>
  <h1 class="my-4 text-lg font-medium">Add Script</h1>
  <div class="flex flex-wrap items-center text-sm">
    <div
      class="full mr-2 flex h-6 w-6 items-center justify-center rounded-full border bg-gray-100 text-xs font-bold"
    >
      1
    </div>
    Add this script to your website in the
    <code class="text-mono mx-1 rounded-md border bg-gray-100 px-1"
      >&lt;head&gt;....&lt;/head&gt;</code
    > section of your website.
  </div>
  <div class="my-3 rounded-md border p-3 font-mono text-xs">
    {code}
  </div>
  <div class="flex flex-wrap items-center text-sm">
    <div
      class="full mr-2 flex h-6 w-6 items-center justify-center rounded-full border bg-gray-100 text-xs font-bold"
    >
      2
    </div>
    Wait events data send to your dashboard.
  </div>
  <div class="flex flex-wrap items-center text-sm">
    <div
      class="full mr-2 flex h-6 w-6 items-center justify-center rounded-full border bg-gray-100 text-xs font-bold"
    >
      3
    </div>
    <a href={`/dashboard/website/{$page.params.id}`}>Go to dashboard.</a>
  </div>
</div>
