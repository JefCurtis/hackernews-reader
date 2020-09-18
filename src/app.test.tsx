import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./app";
import * as serviceWorker from "./serviceWorker";
import * as HackNewsAPI from "./common/api/hacker-news.api";
import * as hooks from "./common/hooks";
import { makeStory } from "./common/__mocks__/make-mock-story";

jest.mock("./common/hooks/use-infinite-scrolling", () => ({
  useInfiniteScrolling: jest.fn().mockReturnValue((node: any) => undefined),
}));

jest.mock("./common/hooks/use-register-service-workers", () => ({
  useRegisterServiceWorkers: jest.fn().mockReturnValue(true),
}));

describe("App", () => {
  beforeAll(() => {
    jest.spyOn(serviceWorker, "register");
  });

  test("renders a title link", () => {
    render(<App />);
    const titleLink = screen.getByText("Hacker News");
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute("href", "https://news.ycombinator.com/news");
  });

  test("renders an icon", () => {
    render(<App />);
    expect(screen.getByAltText("Hacker News icon")).toBeInTheDocument();
  });

  test("it registers a service worker", () => {
    render(<App />);
    expect(hooks.useRegisterServiceWorkers).toHaveBeenCalled();
  });

  test("shows a list of 25 stories", async () => {
    const stories = [];

    for (let i = 0; i < 25; i++) {
      const story = makeStory();
      stories.push(story);
      jest.spyOn(HackNewsAPI, "fetchNewStory").mockResolvedValueOnce(story);
    }

    const storyIds = stories.map((story) => story.id);
    jest.spyOn(HackNewsAPI, "fetchNewStoryIds").mockResolvedValue(storyIds);

    render(<App />);

    const storyListItems = await screen.findAllByRole("listitem");
    expect(storyListItems.length).toEqual(25);

    stories.forEach((story) => {
      expect(screen.getByText(story.title)).toBeInTheDocument();
    });
  });
});
