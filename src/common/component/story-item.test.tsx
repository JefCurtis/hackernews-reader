import { render, screen } from "@testing-library/react";
import React from "react";
import { StoryItem } from "./story-item";
import * as utilites from "../utilities";
import { makeStory } from "../__mocks__/make-mock-story";

describe("StoryItem", () => {
  test("renders a list item", () => {
    const story = makeStory();

    render(<StoryItem story={story}></StoryItem>);

    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  test("a link to the story is rendered", () => {
    const story = makeStory();

    render(<StoryItem story={story}></StoryItem>);

    expect(screen.getByRole("link").innerHTML).toEqual(story.title);
    expect(screen.getByRole("link")).toHaveAttribute("href", story.url);
  });

  describe("when the story doesn't contain a story url", () => {
    test("the ycombinator.com url is used with the story id", () => {
      const story = makeStory();
      story.url = "";

      render(<StoryItem story={story}></StoryItem>);

      expect(screen.getByRole("link").innerHTML).toEqual(story.title);
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        `https://news.ycombinator.com/item?id=${story.id}`
      );
    });
  });

  test("the story date is formatted and rendered", () => {
    jest.spyOn(utilites, "formatDate").mockReturnValue("10 mins ago");
    const story = makeStory();

    render(<StoryItem story={story}></StoryItem>);

    expect(utilites.formatDate).toHaveBeenCalledWith(story.time);
    expect(screen.getByText("10 mins ago")).toBeInTheDocument();
  });
});
