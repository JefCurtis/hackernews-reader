import { formatDistanceToNow } from "date-fns";

const formatDate = (dateInMs: number): string => {
  const date = new Date(dateInMs * 1000);
  return formatDistanceToNow(date);
};

const handleStoryUrl = (story: HackerNewsAPI.Story): string => {
  const defaultStoryUrl = "https://news.ycombinator.com/item";
  return story.url ? story.url : `${defaultStoryUrl}?id=${story.id}`;
};

export { formatDate, handleStoryUrl };
