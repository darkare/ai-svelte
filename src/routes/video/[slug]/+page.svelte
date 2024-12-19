<script>
	import VideoStore from '$lib/components/video/VideoStore.svelte.js';
	import { page } from '$app/state';
	let slug = page.params.slug;

	let video = VideoStore.getAllVideos().find((v) => v.slug === slug);
</script>

<div class="mx-auto max-w-4xl px-4 py-8">
	<div class="mb-4 aspect-video rounded-lg bg-gray-200">
		<!-- Video player would go here -->
		<div class="flex h-full w-full items-center justify-center">
			<button
				class="rounded-full bg-yellow-300 px-6 py-2 font-medium text-black"
				aria-label="Watch video"
			>
				Watch now
			</button>
		</div>
	</div>

	{#if video}
		<h1 class="mb-2 text-2xl font-bold">{video?.title}</h1>
		<div class="mb-4 flex gap-2 text-gray-600">
			<span>{video?.duration}</span>
			<span>•</span>
		</div>
		<p class="text-gray-700">{video?.description}</p>
	{:else}
		<p>Video not found.</p>
	{/if}
</div>
