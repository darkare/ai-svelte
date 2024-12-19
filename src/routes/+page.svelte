<script>
	import VideoStore from '$lib/components/video/VideoStore.svelte.js';

	let videos = VideoStore.getAllVideos();
</script>

<h1>Video List</h1>
<ul>
	<!-- {#each videos as video}
    <li>
      <a href={`/video/${video.title.toLowerCase().replace(/\s+/g, '-')}`}>
        {video.title}
      </a>
    </li>
  {/each} -->
</ul>
