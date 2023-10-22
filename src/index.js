import "dotenv/config";
import { initBot, sendMessage } from "./controller/bot.js";
import { isAvailable } from "./controller/scrape.js";

function sendMessageOnAvailability() {
  if (
    isAvailable(
      process.env.SCRAPE_SITE,
      process.env.START_DATE,
      process.env.LOOKAHEAD
    )
  ) {
    console.log("Sending message: Appointment is available");
    sendMessage(client, process.env.MATRIX_ROOM, "Appointment is available");
  }
}

const client = initBot(
  process.env.MATRIX_HOMESERVER,
  process.env.MATRIX_TOKEN,
  process.env.BOT_STORAGE
);

setInterval(sendMessageOnAvailability, 1000 * 60 * 5);
sendMessageOnAvailability();
