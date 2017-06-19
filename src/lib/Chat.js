import forge from "./forge.min";
import * as KJUR from "jsrsasign";
import axios from "axios";
import TransportSecurity from './TranstportSecurity';
import io from 'socket.io-client';

const publicKey = atob("LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF6NVViUDlwQ2d6QnNxU0NyT2o2NwpDaHZtSEVyNWN4QnJYQTR2QTdJOUVWdlNubWFzSVpHdUFSRDRnSlN4SWVYNTdrd0tVUmluUXEwZHhHc01Ld3FkCjBScEY1Q0pYcTlrNGQ3MTNwZEcwcEs2TUk1MklyNzhKQ3QwRHpDR2Z6OVRwZjIwQlV5TFRkREtqVkdURkpCUDUKaW1YR21wZ3Q3RVRlZ0VYVEVCZzRnSjl3czF0cEFiMjFobExUc28yVWt5UjdzNzVhQTBSUUZZcHcvY2FBM0RlRApKdm5YemExRnd5MTF0dVBNTy84SCtjV2htWEtTSTBXQjFGWFFUbnphRm9YRjVOUU1LQ1VrMCt6UUxFSC9BL2VaCk5yS3pna09YVk5NZjlWbzEvRzBaT1d2Ync0bkhRUko4akF1QXJJclgvYkxGeG9qcEpRRXVCVy9oby9JOFIxZmIKN1FJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==");

let userCache = [];
let cachedUsers = {};

class Chat {

  static verifyMessageExternal(message, key) {
    try {
      JSON.parse(message.payload);
    } catch (e) {
      console.log("Message payload not valid", message, e);
      return false;
    }

    let signature = new KJUR.crypto.Signature({"alg": "SHA256withRSA"});
    signature.init(key);
    signature.updateString(message.payload);

    if(!signature.verify(message.signature)) {
      return false;
    }

    return JSON.parse(message.payload);
  }

}
