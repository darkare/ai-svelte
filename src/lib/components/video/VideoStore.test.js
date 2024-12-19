import { describe, test, expect, beforeAll } from 'vitest';
import VideoStore from './VideoStore.svelte.js';

describe('VideoStore', () => {
    let videoStore;

    beforeAll(() => {
        videoStore = VideoStore;
    });

    test('should return all videos', () => {
        const videos = videoStore.getAllVideos();
        expect(videos).toHaveLength(10);
    });

    test('should return all unique topics', () => {
        const topics = videoStore.getTopics();
        expect(topics).toEqual(expect.arrayContaining([
            "JavaScript", "CSS", "React", "Node.js", "Python", 
            "Machine Learning", "TypeScript", "Vue.js", "APIs", "Docker"
        ]));
    });

    test('should return videos by topic', () => {
        const reactVideos = videoStore.getVideosByTopics("React");
        expect(reactVideos).toHaveLength(1);
        expect(reactVideos[0].title).toBe("React Basics");
    });

    test('should return the hero video', () => {
        const heroVideo = videoStore.getHeroVideo();
        expect(heroVideo.title).toBe("Machine Learning 101");
    });
});
