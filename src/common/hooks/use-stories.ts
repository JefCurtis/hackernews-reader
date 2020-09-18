import { useEffect, useState } from "react";
import { fetchNewStoryIds, fetchNewStory } from "../api/hacker-news.api";

enum Pagination {
  Items_Per_Page = 25,
  Maxium_Page_Requests = 20,
}

const useStories = (ready: boolean) => {
  const [stories, setStories] = useState<HackerNewsAPI.Story[]>([]);
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [hasMoreStories, setHasMoreStories] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const fetchStoryIds = async () => {
      try {
        const response = await fetchNewStoryIds();
        setStoryIds(response);
        setHasMoreStories(true);
      } catch (error) {
        if (error.message === "noCache") {
          setIsOffline(true);
        }
      }
    };
    if (ready) {
      fetchStoryIds();
    }
  }, [ready]);

  useEffect(() => {
    const fetchStories = (pageOfIds: number[]) => {
      pageOfIds.forEach(async (id, index) => {
        try {
          const story = await fetchNewStory(id);
          if (story) {
            setStories((currentStories) => [...currentStories, story]);
          }

          // this is the last requested story. Set loading to false.
          if (pageOfIds.length === index + 1) {
            setLoading(false);
          }
        } catch (error) {
          if (error.message === "noCache") {
            setIsOffline(true);
          }
        }
      });
    };

    if (hasMoreStories) {
      setLoading(true);
      const start = Pagination.Items_Per_Page * currentPage;
      const end = (currentPage + 1) * Pagination.Items_Per_Page;
      const pageOfIds = storyIds.slice(start, end);
      fetchStories(pageOfIds);

      if (end === Pagination.Items_Per_Page * Pagination.Maxium_Page_Requests) {
        setHasMoreStories(false);
      }
    }
  }, [hasMoreStories, currentPage, storyIds]);

  return { loading, hasMoreStories, stories, setCurrentPage, isOffline };
};

export { useStories };
