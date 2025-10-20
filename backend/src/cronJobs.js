import cron from "node-cron";

cron.schedule("*/5 * * * *", async () => {
  try {
    const res = await fetch("https://mind-scape.onrender.com");
  } catch (error) {
    console.log(error.message);
  }
});
