const baseAPI = "https://hacker-news.firebaseio.com/v0";

const fetchNewStoryIds = async (): Promise<number[]> => {
  const url = `${baseAPI}/newstories.json`;
  return fetchResource(url);
};

const fetchNewStory = async (id: number): Promise<HackerNewsAPI.Story> => {
  const url = `${baseAPI}/item/${id}.json`;
  return fetchResource(url);
};

const fetchResource = async (url: string) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    return fetchFromCache(url);
  }
};

const fetchFromCache = async (url: string) => {
  const cachedResponse = await caches.match(url);

  if (!cachedResponse) {
    throw Error("noCache");
  }
  return cachedResponse.json();
};

export { fetchNewStoryIds, fetchNewStory, fetchFromCache };
