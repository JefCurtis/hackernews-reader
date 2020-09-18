import React from "react";
import { formatDate, handleStoryUrl } from "../utilities";
import "./story-item.scss";

const StoryItem = ({ story }: { story: HackerNewsAPI.Story }) => {
  return (
    <li className="story-item" key={story.id}>
      <a href={handleStoryUrl(story)}>{story.title}</a>
      <div className="subtext">
        <span>by {story.by}</span>
        <span>{formatDate(story.time)}</span>
      </div>
    </li>
  );
};

export { StoryItem };
