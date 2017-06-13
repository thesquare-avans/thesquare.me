import axios from "axios"
import TranstportSecurity from "./TranstportSecurity";

const BASE_URL = "http://api.thesquare.me/v1";

class Streams {

  static all() {
    if(TranstportSecurity.checkIfKeysExists()) {
      let config = {
        headers: {
          'X-PublicKey': btoa(localStorage.getItem("publicKey")),
          'Content-Type': "application/json; charset=utf-8"
        },
      };

      let request = axios.get(`${BASE_URL}/streams`, config);

      request.then(function(response) {
        console.log(response);
        let payload = TranstportSecurity.verifyMessage(response.data);

        if(payload && payload.success) {
          return payload;
        }
      });

      request.catch(function(error) {
        throw error;
      });
    }
  }

  static get() {

  }
}

module.exports = Streams;
