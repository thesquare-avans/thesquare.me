import axios from "axios"
import TranstportSecurity from "./TranstportSecurity";

const BASE_URL = "http://api.thesquare.me/v1";
let data = {};

class Status {

  constructor() {

  }

  static all(callback) {

    let config = {
      headers: {
        'X-PublicKey': btoa(localStorage.getItem("publicKey")),
        'Content-Type': "application/json; charset=utf-8"
      },
    };

    let request = axios.get(`${BASE_URL}/status`, config);

    request.then(function(response) {
      let payload = TranstportSecurity.verifyMessage(response.data);
      if(payload) {
        if(payload.success) {
          return callback(payload);
        }
      }
    });

    request.catch(function(error) {
      throw error;
    });

    console.log(data);
    return data;
  }

  static get() {

  }
}

module.exports = Status;
