import React from "react";

const Loader = ({ reference }: { reference: React.RefCallback<HTMLElement> }) => {
  return (
    <div className="text-centered" ref={reference}>
      loading...
    </div>
  );
};

export { Loader };
