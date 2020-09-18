import * as faker from "faker";

const makeStory = () => {
  return {
    id: faker.random.number(),
    title: faker.random.words(5),
    by: faker.name.lastName(),
    time: faker.date.recent().getTime(),
    url: faker.internet.domainName(),
  } as HackerNewsAPI.Story;
};

export { makeStory };
