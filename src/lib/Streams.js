import axios from "axios"
import TranstportSecurity from "./TranstportSecurity";

const BASE_URL = "http://api.thesquare.me/v1";
let data = {};

class Streams {

  constructor() {

  }

  static all(callback) {


    let config = {
        headers: {
          'X-PublicKey': btoa(localStorage.getItem("publicKey")),
          'Content-Type': "application/json; charset=utf-8"
        },
      };

      let request = axios.get(`${BASE_URL}/streams`, config);

      request.then(function(response) {
        let payload = TranstportSecurity.verifyMessage(response.data);
        if(payload) {
          if(payload.success) {
            return callback(payload)
          }
        }
      });

      request.catch(function(error) {
        throw error;
      });

      return data;
  }

  static get() {

  }
}

module.exports = Streams;
