import { useCallback, useRef } from "react";

const useInfiniteScrolling = (loading: boolean, callback: Function) => {
  const observer = useRef<IntersectionObserver>(null);

  const loadingRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      } else {
        // @ts-ignore: readonly
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            callback();
          }
        });
      }

      if (node) {
        (observer.current as IntersectionObserver).observe(node);
      }
    },
    [loading, callback]
  );

  return loadingRef;
};

export { useInfiniteScrolling };
