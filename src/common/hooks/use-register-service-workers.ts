import { useEffect, useState } from "react";
import * as serviceWorker from "../../serviceWorker";

const useRegisterServiceWorkers = () => {
  const [ready, setReady] = useState(false);
  serviceWorker.register();

  useEffect(() => {
    // The 500ms is necessary to allow all the service workers to install and activate.
    // A fetch event listener was attached but was always missing initial fetch requests
    // which meant that our cache was never complete. Looking for a better solution :-(
    setTimeout(() => setReady(true), 500);
  }, []);

  return ready;
};

export { useRegisterServiceWorkers };
