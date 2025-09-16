import axios from "axios";

export const payUClient = axios.create({
  baseURL: "https://test.payu.in",
  headers: {'content-type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
});
