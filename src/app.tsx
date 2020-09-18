import React from "react";
import { useInfiniteScrolling, useStories, useRegisterServiceWorkers } from "./common/hooks";
import { StoryList, Loader, EndOfList, Header, Offline } from "./common/component";
import "./app.scss";

const App = () => {
  const serviceWorkersReady = useRegisterServiceWorkers();
  const { loading, hasMoreStories, stories, setCurrentPage, isOffline } = useStories(serviceWorkersReady);

  const setNextPage = () => {
    setCurrentPage((prevPageNumber) => prevPageNumber + 1);
  };

  const loadingRef = useInfiniteScrolling(loading, setNextPage);

  return (
    <div className="app">
      <Header></Header>
      {stories.length > 0 && (
        <>
          <StoryList stories={stories}></StoryList>
          {!loading && hasMoreStories && <Loader reference={loadingRef}></Loader>}
          {!hasMoreStories && <EndOfList></EndOfList>}
        </>
      )}
      {isOffline && <Offline></Offline>}
    </div>
  );
};

export { App };
