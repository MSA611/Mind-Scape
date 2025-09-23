import cron from "node-cron";

cron.schedule("*/15 * * * *", async () => {
  try {
    const res = await fetch("https://mind-scape.onrender.com");
  } catch (error) {
    console.log(error.message);
  }
});
