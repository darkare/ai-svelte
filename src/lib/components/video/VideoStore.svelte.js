import videos from './videosMock.js';

class VideoStore {
	constructor() {
		if (!VideoStore.instance) {
			this.videos = videos;
			VideoStore.instance = this;
		}
		return VideoStore.instance;
	}

	getAllVideos() {
		console.log('videos', this.videos);
		return this.videos;
	}

	getTopics() {
		const topics = this.videos.map((video) => video.topic);
		return Array.from(new Set(topics));
	}

	getVideosByTopics(topicString) {
		return this.videos.filter((video) => video.topic === topicString);
	}

	getHeroVideo() {
		return this.videos.find((video) => video.isHero);
	}
}

const instance = new VideoStore();

export default instance;
