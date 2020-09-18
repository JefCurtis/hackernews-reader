import React from "react";
import { StoryItem } from ".";
import "./story-list.scss";

const StoryList = ({ stories }: { stories: HackerNewsAPI.Story[] }) => {
  return (
    <div className="story-list">
      {stories.length > 0 && (
        <ul>
          {stories.map((story) => (
            <StoryItem key={story.id} story={story}></StoryItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export { StoryList };
