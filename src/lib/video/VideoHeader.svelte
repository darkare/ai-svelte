<script>
	import VideoStore from '$lib/components/video/VideoStore.svelte.js';

	let topics = VideoStore.getTopics();
</script>

<style>
	.header {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 10px;
		background-color: white;
		font-weight: bold;
	}

	.header-item {
		padding: 0 10px;
		color: black;
	}

	.header-item.active {
		color: black;
	}
</style>

<div class="header">
	<div class="header-item active">ALL VIDEOS</div>
	{#each topics as topic}
		<div class="header-item">{topic}</div>
	{/each}
</div>
