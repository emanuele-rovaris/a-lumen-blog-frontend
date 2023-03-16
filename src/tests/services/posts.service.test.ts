import {describe, vi} from 'vitest';
import {postsStub} from "@/tests/stubs/post.stub";
import {getPostDetails, getPosts} from "@/services";
import axios from "axios";

describe("posts service", () => {
    it('should retrieve posts list', async () => {
        const fakeData = postsStub();
        vi.spyOn(axios, "get").mockImplementation(() =>
            Promise.resolve({data: fakeData}),
        );
        const posts = await getPosts();
        expect(posts).toEqual(fakeData);
    });

    it('should retrieve post-detail details', async () => {
        const fakeData = postsStub()[0];
        vi.spyOn(axios, "get").mockImplementation(() =>
            Promise.resolve({data: fakeData}),
        );
        const postDetails = await getPostDetails('1');
        expect(postDetails).toEqual(fakeData);
    });
});