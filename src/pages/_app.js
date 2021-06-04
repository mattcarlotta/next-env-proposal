import React from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <h1 className="title">Loading Envs by JSON Config</h1>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
