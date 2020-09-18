/// <reference types="react-scripts" />

declare namespace HackerNewsAPI {
  type Story = {
    descendants: number;
    id: number;
    kids: number[];
    score: number;
    time: number;
    title: string;
    type: "story";
    by: string;
    url: string;
  };
}
