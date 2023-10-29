import axios from "axios";

function setDate(start_date, multiplicator) {
  let date = new Date(start_date);
  date.setHours(24 * multiplicator * 15);

  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  let month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(date);
  let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

  return { params: { start_date: `${year}-${month}-${day}` } };
}

async function availableWithOption(url, option) {
  let response;
  try {
    response = await axios.get(url, option);
  } catch (e) {
    console.log("Couldn't call the url: " + e);
  }

  if (response.data.total != undefined && response.data.total == 0) {
    if (
      response.data.reason != undefined &&
      response.data.message != undefined
    ) {
      console.log(
        "No appointment available with option " +
          JSON.stringify(option) +
          " with reason " +
          response.data.reason +
          " and message: " +
          response.data.message
      );
    }
    return false;
  } else {
    console.log("Appointment available with option " + JSON.stringify(option));
    return true;
  }
}

export async function isAvailable(url, start_date, lookahead) {
  let isAvailable = false;
  for (let i = 0; i < lookahead; i++) {
    let option = setDate(start_date, i);
    if (availableWithOption(url, option)) {
      isAvailable = true;
    }
  }
  return isAvailable;
}
