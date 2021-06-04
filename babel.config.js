const { NEXT_PUBLIC_ENV } = process.env;
const INSTAGING = NEXT_PUBLIC_ENV === "staging";

module.exports = (api) => {
  const INPRODUCTION = api.env("production");
  api.cache(() => process.env.NODE_ENV);

  return {
    presets: ["next/babel"],
    plugins: [
      INPRODUCTION &&
        !INSTAGING && [
          "react-remove-properties",
          { properties: ["data-testid"] },
        ],
    ].filter(Boolean),
  };
};
