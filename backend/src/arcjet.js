import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";

const aj = arcjet({
  key: process.env.arcjet_key,

  rules: [
    shield({ mode: "LIVE" }),

    detectBot({
      mode: "LIVE",

      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

    slidingWindow({
      mode: "LIVE",
      interval: 60,
      max: 100,
    }),
  ],
});

export default aj;
