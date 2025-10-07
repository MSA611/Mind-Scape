import aj from "./arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 5 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ message: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ message: "Bot Detected" });
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    } else if (decision.ip.isHosting()) {
      res.status(403).json({ message: "Hosting Error Found" });
    } else if (decision.results.some(isSpoofedBot)) {
      res.status(403).json({ message: "SpoofedBot found" });
    }
    next();
  } catch (error) {
    console.error(error);
    next();
  }
};
