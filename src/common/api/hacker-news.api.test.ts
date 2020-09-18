import * as HackerNewsAPI from "./hacker-news.api";

describe("HackerNewsAPI", () => {
  afterAll(jest.resetAllMocks);

  describe("fetchNewStoryIds", () => {
    describe("when online", () => {
      beforeEach(() => {
        jest.spyOn(HackerNewsAPI, "fetchFromCache");

        jest.spyOn(global, "fetch").mockResolvedValue({
          json: () => Promise.resolve([1, 2, 3, 4]),
        } as Response | Promise<Response>);
      });

      test("a request from the cache is not perfomed", async () => {
        await HackerNewsAPI.fetchNewStoryIds();
        expect(HackerNewsAPI.fetchFromCache).not.toHaveBeenCalled();
      });

      test("a fetch request is made", async () => {
        await HackerNewsAPI.fetchNewStoryIds();
        expect(global.fetch).toHaveBeenCalledWith("https://hacker-news.firebaseio.com/v0/newstories.json");
      });

      test("a collection of ids is returned", async () => {
        const ids = await HackerNewsAPI.fetchNewStoryIds();
        expect(ids).toEqual([1, 2, 3, 4]);
      });
    });

    describe("when offline", () => {
      beforeEach(() => {
        jest.spyOn(global, "fetch").mockRejectedValue({ error: "error" });
      });

      describe("and when the request has been cached", () => {
        beforeEach(() => {
          Object.assign(global, {
            caches: {
              match: jest.fn().mockResolvedValue({ json: () => Promise.resolve([5, 6, 7, 8]) }),
            },
          });
        });

        test("returns the cached collection of ids", async () => {
          const ids = await HackerNewsAPI.fetchNewStoryIds();
          expect(ids).toEqual([5, 6, 7, 8]);
        });
      });

      describe("and when the request has not been cached", () => {
        beforeEach(() => {
          Object.assign(global, {
            caches: {
              match: jest.fn().mockResolvedValue(undefined),
            },
          });
        });

        test("returns a new `noCache` error", async () => {
          try {
            await HackerNewsAPI.fetchNewStoryIds();
          } catch (error) {
            expect(error).toEqual(new Error("noCache"));
          }
        });
      });
    });
  });
});
