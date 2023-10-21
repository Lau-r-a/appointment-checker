import "dotenv/config";
import { initBot } from "./controller/bot.js";

const client = initBot(
  process.env.MATRIX_HOMESERVER,
  process.env.MATRIX_TOKEN,
  process.env.BOT_STORAGE
);
