module.exports = (api) => {
  api.cache(() => process.env.NODE_ENV);

  return {
    presets: ["next/babel"],
  };
};
