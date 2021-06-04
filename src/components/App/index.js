import Head from "next/head";
import React from "react";
import app from "../../utils/axiosConfig";

export default function App() {
  const [{ author, error, isLoading, quote }, setState] = React.useState({
    author: "",
    error: "",
    isLoading: true,
    quote: "",
  });

  React.useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await app.get("quote");

        setState({
          author: res.data.author,
          error: "",
          isLoading: false,
          quote: res.data.quote,
        });
      } catch (error) {
        setState({
          author: "",
          error: error.toString(),
          isLoading: false,
          quote: "",
        });
      }
    }

    fetchQuote();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="app">
        <h2>Loaded Base Environment</h2>
        <div data-testid="public-url" className="env">
          {process.env.NEXT_PUBLIC_BASEURL}
        </div>
        <h2>Loaded Specific Environment</h2>
        <div data-testid="public-env" className="env">
          {process.env.NEXT_PUBLIC_ENV}
        </div>
        <h3>Environment Specific Quote</h3>
        <div className="env">
          {isLoading ? (
            <span data-testid="loading">Loading...</span>
          ) : !error ? (
            <>
              <span data-testid="quote">{quote}</span> -{" "}
              <i data-testid="author">{author}</i>
            </>
          ) : (
            <span data-testid="error" className="error">
              {error}
            </span>
          )}
        </div>
      </main>
    </>
  );
}
