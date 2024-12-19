<script>
  import { page } from '$app/stores';
</script>

<div class="min-h-screen bg-white">
  <!-- Header -->
  <header class="border-b">
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button onclick={() => window.history.back()} class="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="text-xl font-semibold">Mamamia</h1>
      </div>
    </div>
  </header>

  <!-- Main content -->
  <main>
    <slot />
  </main>
</div>
