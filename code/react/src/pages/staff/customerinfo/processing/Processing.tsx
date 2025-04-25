import React from "react";

type Props = {
  hide: boolean;
};

const Processing = (props: Props) => {
  return <div className={`${props.hide ? "hidden" : ""}`}>ProcessingPage</div>;
};

export default Processing;
