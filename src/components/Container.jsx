import React from "react";

const Container = ({ children }) => {
  return <section className="md:w-[70vw] w-[95vw] mx-auto">{children}</section>;
};

export default Container;
