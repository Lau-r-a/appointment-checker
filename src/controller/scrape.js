import axios from "axios";

function setDate(multiplicator) {

  let date = new Date(process.env.START_DATE)
  date.setHours(24 * multiplicator * 15);

  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  let month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(date);
  let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);


  return {params: {start_date:`${year}-${month}-${day}`}}
}

export async function doOnAppointmentAvailable(url, callback) {
  for (let i = 0; i < process.env.LOOKAHEAD; i++) {
    let option = setDate(i);
    
    axios
    .get(url, option)
    .then(function (response) {
      if (response.data.total != undefined && response.data.total == 0) {
        if (
          response.data.reason != undefined &&
          response.data.message != undefined
        ) {
          console.log(
            "No appointment available with option " + JSON.stringify(option) + " with reason " +
              response.data.reason +
              " and message: " +
              response.data.message
          );
          callback(false);
        }
      } else {
        callback(true);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }
}
