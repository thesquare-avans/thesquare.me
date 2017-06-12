import forge from "./forge.min";
import * as KJUR from "jsrsasign";
import axios from "axios";

const BASE_API_URL = "http://api.thesquare.me/v1";

let publicKey = atob("LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF6NVViUDlwQ2d6QnNxU0NyT2o2NwpDaHZtSEVyNWN4QnJYQTR2QTdJOUVWdlNubWFzSVpHdUFSRDRnSlN4SWVYNTdrd0tVUmluUXEwZHhHc01Ld3FkCjBScEY1Q0pYcTlrNGQ3MTNwZEcwcEs2TUk1MklyNzhKQ3QwRHpDR2Z6OVRwZjIwQlV5TFRkREtqVkdURkpCUDUKaW1YR21wZ3Q3RVRlZ0VYVEVCZzRnSjl3czF0cEFiMjFobExUc28yVWt5UjdzNzVhQTBSUUZZcHcvY2FBM0RlRApKdm5YemExRnd5MTF0dVBNTy84SCtjV2htWEtTSTBXQjFGWFFUbnphRm9YRjVOUU1LQ1VrMCt6UUxFSC9BL2VaCk5yS3pna09YVk5NZjlWbzEvRzBaT1d2Ync0bkhRUko4akF1QXJJclgvYkxGeG9qcEpRRXVCVy9oby9JOFIxZmIKN1FJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==");

class TranstportSecurity {

  constructor() {
    forge.options.usePureJavaScript = true;
    forge.options.workerScript = "js/forge.worker.min.js";
  }

  static verifyMessage(message) {
    try {
      JSON.parse(message.payload);
    } catch (e) {
      console.log("Message payload not valid", message, e);
      return false;
    }

    let signature = new KJUR.crypto.Signature({"alg": "SHA256withRSA"});
    signature.init(publicKey);
    signature.updateString(message.payload);

    if (!signature.verify(message.signature)) return false;

    return JSON.parse(message.payload)
  }

  static signMessage(message) {
    if (!localStorage.getItem("privateKey")) return false;
    if (!localStorage.getItem("publicKey")) return false;

    let data = {};

    data.payload = message;
    data.publicKey = btoa(localStorage.getItem("publicKey"));

    let signature = new KJUR.crypto.Signature({"alg": "SHA256withRSA"});
    signature.init(localStorage.getItem("privateKey"));
    data.signature = signature.signString(JSON.stringify(message));

    return data;
  }

  static register(callback) {
    let name = localStorage.getItem("name");
    let signedMessage = TranstportSecurity.signMessage({
      name: name
    });

    if (signedMessage !== false) {
      let config = {
        headers: {
          'X-PublicKey': btoa(localStorage.getItem("publicKey")),
          'Content-Type': "application/json; charset=utf-8"
        },
      };

      let request = axios.post(BASE_API_URL + "/register", JSON.stringify(signedMessage), config);

      request.then(function (response) {
        let payload = TranstportSecurity.verifyMessage(response.data);

        if (payload) {
          if (payload.success) {
            localStorage.setItem("user", JSON.stringify(payload.user));
            return callback();
          }
          callback(new Error("Unexpected error"));
        } else {
          callback(new Error("The received message was not valid"));
        }
      });

      request.catch(function (error) {
        let payload = TranstportSecurity.verifyMessage(error.data);

        if (payload) {
          switch (payload.error.code) {
            case "publicKeyMissing":
              callback(new Error("Public key was not sent with request"));
              break;
            default:
              callback(new Error("Unexpected error"));
          }
        } else {
          callback(new Error("The received message was not valid"));
        }
      });

    } else {
      callback(new Error("Could not sign the registration message"));
    }
  }

  static checkIfKeysExists() {
    return !localStorage.getItem("privateKey") || !localStorage.getItem("publicKey")
  }

  static checkIfUserExists(callback) {
    let config = {
      headers: {
        'X-PublicKey': btoa(localStorage.getItem("publicKey")),
        'Content-Type': "application/json; charset=utf-8"
      },
    };

    let request = axios.get(BASE_API_URL + "/me", config);

    request.then(function (response) {
      let payload = TranstportSecurity.verifyMessage(response.data);

      if (payload) {
        if (payload.success) {
          localStorage.setItem("user", JSON.stringify(payload.user));
          return callback();
        }
        callback(new Error("Unexpected error"));
      } else {
        //callback(new Error("The received message was not valid"));
      }
    });

    request.catch(function (error) {
      let payload = TranstportSecurity.verifyMessage(error.response.data);

      if(payload) {
        switch(payload.error.code) {
          case "publicKeyMissing":
            callback(new Error("Public key was not sent with request"));
            break;
          case "userNotFound":
            TranstportSecurity.register(callback);
            break;
          default:
            callback(new Error("Unexpected error"));
        }

      } else {
        //callback(new Error("The received message was not valid"));
      }
    });
  }

  static generateKeys(name ,callback) {
    forge.pki.rsa.generateKeyPair({bits: 2048, workers: -1}, function (err, keypair) {
      localStorage.setItem("publicKey", forge.pki.publicKeyToPem(keypair.publicKey));
      localStorage.setItem("privateKey", forge.pki.privateKeyToPem(keypair.privateKey));

      TranstportSecurity.register(callback);
    });
  }

  static loadConfig() {

  }
}

module.exports = TranstportSecurity;
