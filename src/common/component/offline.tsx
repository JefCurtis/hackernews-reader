import React from "react";

const Offline = () => {
  return (
    <div className="text-centered">
      <p>**No internet connection found. App is running in offline mode.**</p>
      <p>Please reconnect to see more stories...</p>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
};

export { Offline };
