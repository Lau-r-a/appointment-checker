import "dotenv/config";
import { initBot, sendMessage } from "./controller/bot.js";
import { doOnAppointmentAvailable } from "./controller/scrape.js";

const client = initBot(
  process.env.MATRIX_HOMESERVER,
  process.env.MATRIX_TOKEN,
  process.env.BOT_STORAGE
);

setInterval(() => {
  doOnAppointmentAvailable(process.env.SCRAPE_SITE, (isAvailable) => {
    //write bot message
    console.log("Appointment is available: " + isAvailable);
    if (isAvailable) {
      sendMessage(client, process.env.MATRIX_ROOM, "Appointment is available");
    }
  });
}, 1000 * 60 * 5);
