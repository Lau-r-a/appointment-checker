import axios from "axios";

export async function doOnAppointmentAvailable(url, callback) {
  axios
    .get(url)
    .then(function (response) {
      if (response.data.total != undefined && response.data.total == 0) {
        if (
          response.data.reason != undefined &&
          response.data.message != undefined
        ) {
          console.log(
            "No appointment available with reason " +
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
