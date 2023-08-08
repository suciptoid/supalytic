<script lang="ts">
  import { enhance } from '$app/forms';
</script>

<h2 class="py-4 text-lg font-medium">Add Website</h2>
<form method="POST" class="flex flex-col gap-5 text-sm" use:enhance>
  <fieldset class="flex flex-col space-y-2">
    <label for="name" class="font-medium">Name</label>
    <input
      type="text"
      autocomplete="off"
      name="name"
      id="name"
      class="rounded-md border placeholder:text-gray-500/50 border-gray-500/20 dark:bg-gray-500/10 px-3 py-2"
      placeholder="Cool Website"
    />
  </fieldset>
  <fieldset class="flex flex-col space-y-2">
    <label for="domain" class="font-medium">Domain</label>
    <input
      type="text"
      name="domain"
      id="domain"
      class="rounded-md border placeholder:text-gray-500/50 border-gray-500/20 dark:bg-gray-500/10 px-3 py-2"
      placeholder="yourdomain.com"
    />
  </fieldset>
  <fieldset>
    <button class="rounded-md bg-green-500 px-3 py-2 font-medium text-white">Create Website</button>
  </fieldset>
</form>
