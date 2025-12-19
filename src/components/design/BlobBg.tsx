import React from "react";

const BlobBg = () => {
  return (
    <div
      aria-hidden
      className="
        fixed inset-0 -z-10
        bg-[url('/src/assets/blobBg.svg')]
        bg-repeat
        bg-cover
        bg-top-left
      "
    />
  );
};

export default BlobBg;
