// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  return res
    .status(200)
    .json({ author: process.env.AUTHOR, quote: process.env.QUOTE });
};
