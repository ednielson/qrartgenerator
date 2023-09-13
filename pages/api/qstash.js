import { Nextjs } from "@upstash/qstash";

async function handler(req, res) {
  console.log("If this is printed, the signature has already been verified");

  // do stuff
  res.status(200).end();
}

export default Nextjs.verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};