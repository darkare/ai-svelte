<script>
  let { slug } = $props();
  
  // Video data would typically come from an API based on the slug
  let video = $state({
    title: "EXCLUSIVE: No Filter professional bridesmaid, anyone?",
    duration: "05:34",
    views: "1.2M views",
    description: "Watch this exclusive interview about being a professional bridesmaid"
  });
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
  <div class="aspect-video bg-gray-200 rounded-lg mb-4">
    <!-- Video player would go here -->
    <div class="w-full h-full flex items-center justify-center">
      <button class="bg-yellow-300 text-black px-6 py-2 rounded-full font-medium">
        Watch now
      </button>
    </div>
  </div>

  <h1 class="text-2xl font-bold mb-2">{video.title}</h1>
  <div class="flex gap-2 text-gray-600 mb-4">
    <span>{video.duration}</span>
    <span>•</span>
    <span>{video.views}</span>
  </div>

  <p class="text-gray-700">{video.description}</p>
</div>
